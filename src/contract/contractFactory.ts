import { AccountInterface } from '../account';
import { Abi, ArgsOrCalldataWithOptions, CompiledContract } from '../types';
import assert from '../utils/assert';
import { CallData } from '../utils/calldata';
import { Contract, getCalldata, splitArgsAndOptions } from './default';

export class ContractFactory {
  abi: Abi;

  compiledContract: CompiledContract;

  classHash: string;

  account: AccountInterface;

  private CallData: CallData;

  constructor(
    compiledContract: CompiledContract,
    classHash: string,
    account: AccountInterface,
    abi: Abi = compiledContract.abi // abi can be different from the deployed contract ie for proxy contracts
  ) {
    this.abi = abi;
    this.compiledContract = compiledContract;
    this.account = account;
    this.classHash = classHash;
    this.CallData = new CallData(abi);
  }

  /**
   * Deploys contract and returns new instance of the Contract
   *
   * @param args - Array of the constructor arguments for deployment
   * @param options (optional) Object - parseRequest, parseResponse, addressSalt
   * @returns deployed Contract
   */
  public async deploy(...args: ArgsOrCalldataWithOptions): Promise<Contract> {
    const { args: param, options = { parseRequest: true } } = splitArgsAndOptions(args);

    const constructorCalldata = getCalldata(param, () => {
      if (options.parseRequest) {
        this.CallData.validate('DEPLOY', 'constructor', param);
        return this.CallData.compile('constructor', param);
      }
      // eslint-disable-next-line no-console
      console.warn('Call skipped parsing but provided rawArgs, possible malfunction request');
      return param;
    });

    const {
      deploy: { contract_address, transaction_hash },
    } = await this.account.declareAndDeploy({
      contract: this.compiledContract,
      constructorCalldata,
      salt: options.addressSalt,
    });
    assert(Boolean(contract_address), 'Deployment of the contract failed');

    const contractInstance = new Contract(
      this.compiledContract.abi,
      contract_address!,
      this.account
    );
    contractInstance.deployTransactionHash = transaction_hash;

    return contractInstance;
  }

  /**
   * Attaches to new Account
   *
   * @param account - new Provider or Account to attach to
   * @returns ContractFactory
   */
  connect(account: AccountInterface): ContractFactory {
    this.account = account;
    return this;
  }

  /**
   * Attaches current abi and account to the new address
   *
   * @param address - Contract address
   * @returns Contract
   */
  attach(address: string): Contract {
    return new Contract(this.abi, address, this.account);
  }

  // ethers.js' getDeployTransaction cant be supported as it requires the account or signer to return a signed transaction which is not possible with the current implementation
}
