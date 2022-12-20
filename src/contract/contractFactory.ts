import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { Abi, CompiledContract, FunctionAbi } from '../types';
import { CheckCallData } from '../utils/calldata';
import { Contract } from './default';

export class ContractFactory {
  abi: Abi;

  compiledContract: CompiledContract;

  classHash: string;

  account: AccountInterface;

  private checkCalldata: CheckCallData;

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
    this.checkCalldata = new CheckCallData(abi);
  }

  /**
   * Deploys contract and returns new instance of the Contract
   *
   * @param args - Array of the constructor arguments for deployment
   * @param addressSalt (optional) - Address Salt for deployment
   * @returns deployed Contract
   */
  public async deploy(args: Array<any> = [], addressSalt?: string | undefined): Promise<Contract> {
    this.checkCalldata.validateMethodAndArgs('DEPLOY', 'constructor', args);
    const { inputs } = this.abi.find((abi) => abi.type === 'constructor') as FunctionAbi;

    // compile calldata
    const constructorCalldata = this.checkCalldata.compileCalldata(args, inputs);

    const {
      deploy: { contract_address, transaction_hash },
    } = await this.account.declareDeploy({
      contract: this.compiledContract,
      classHash: this.classHash,
      constructorCalldata,
      salt: addressSalt,
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
   * Attaches to new Provider or Account
   *
   * @param account - new Provider or Account to attach to
   * @returns ContractFactory
   */
  connect(account: AccountInterface): ContractFactory {
    this.account = account;
    return this;
  }

  /**
   * Attaches current abi and provider or account to the new address
   *
   * @param address - Contract address
   * @returns Contract
   */
  attach(address: string): Contract {
    return new Contract(this.abi, address, this.account);
  }

  // ethers.js' getDeployTransaction cant be supported as it requires the account or signer to return a signed transaction which is not possible with the current implementation
}
