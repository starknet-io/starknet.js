import { AccountInterface } from '../account';
import { logger } from '../global/logger';
import {
  Abi,
  ArgsOrCalldata,
  CairoAssembly,
  CompiledContract,
  ExecuteOptions,
  ValidateType,
} from '../types';
import assert from '../utils/assert';
import { CallData } from '../utils/calldata';
import { Contract, getCalldata } from './default';

export type ContractFactoryParams = {
  compiledContract: CompiledContract;
  account: any;
  casm?: CairoAssembly;
  classHash?: string;
  compiledClassHash?: string;
  abi?: Abi;
  executeOptions?: ExecuteOptions;
};

export class ContractFactory {
  compiledContract: CompiledContract;

  account: AccountInterface;

  abi: Abi;

  address: string | undefined;

  classHash?: string;

  casm?: CairoAssembly;

  compiledClassHash?: string;

  private CallData: CallData;

  public executeOptions?: ExecuteOptions;

  /**
   * @param params CFParams
   *  - compiledContract: CompiledContract;
   *  - account: AccountInterface;
   *  - casm?: CairoAssembly;
   *  - classHash?: string;
   *  - compiledClassHash?: string;
   *  - abi?: Abi;
   */
  constructor(params: ContractFactoryParams) {
    this.compiledContract = params.compiledContract;
    this.account = params.account;
    this.casm = params.casm;
    this.abi = params.abi ?? params.compiledContract.abi;
    this.classHash = params.classHash;
    this.compiledClassHash = params.compiledClassHash;
    this.CallData = new CallData(this.abi);
    this.executeOptions = params.executeOptions;
  }

  /**
   * Deploys contract and returns new instance of the Contract
   *
   * If contract is not declared it will first declare it, and then deploy
   */
  public async deploy(...args: ArgsOrCalldata): Promise<Contract> {
    // const { args: param, options = { parseRequest: true } } = args; // splitArgsAndOptions(args);

    const constructorCalldata = getCalldata(args, () => {
      if (this.executeOptions?.parseRequest) {
        this.CallData.validate(ValidateType.DEPLOY, 'constructor', args);
        return this.CallData.compile('constructor', args);
      }
      logger.warn('Call skipped parsing but provided rawArgs, possible malfunction request');
      return args;
    });

    const {
      deploy: { contract_address, transaction_hash },
    } = await this.account.declareAndDeploy({
      contract: this.compiledContract,
      casm: this.casm,
      classHash: this.classHash,
      compiledClassHash: this.compiledClassHash,
      constructorCalldata,
      salt: this.executeOptions?.salt,
    });
    assert(Boolean(contract_address), 'Deployment of the contract failed');

    this.address = contract_address;

    const contractInstance = new Contract({
      abi: this.compiledContract.abi,
      address: contract_address,
      providerOrAccount: this.account,
    });
    contractInstance.deployTransactionHash = transaction_hash;

    return contractInstance;
  }

  /**
   * Attaches to new Account
   *
   * @param account - new Account to attach to
   */
  connect(account: AccountInterface): Contract {
    return new Contract({
      abi: this.abi,
      address: this.address!,
      providerOrAccount: account,
    });
  }

  /**
   * Attaches current abi and account to the new address
   */
  attach(address: string): Contract {
    return new Contract({
      abi: this.abi,
      address,
      providerOrAccount: this.account,
    });
  }

  // ethers.js' getDeployTransaction can't be supported as it requires the account or signer to return a signed transaction which is not possible with the current implementation
}
