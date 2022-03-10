import assert from 'minimalistic-assert';

import { Account } from '../account';
import { Provider, defaultProvider } from '../provider';
import { Abi, CompiledContract, GetTransactionResponse, RawCalldata } from '../types';
import { BigNumberish } from '../utils/number';
import { Contract } from './default';

export class ContractFactory {
  address!: string | null;

  abi!: Abi;

  transaction_hash!: string | null;

  code!: string | null;

  providerOrAccount: Provider | Account;

  compiledContract: CompiledContract;

  constructor(
    compiledContract: CompiledContract,
    providerOrAccount: Provider | Account = defaultProvider
  ) {
    this.abi = compiledContract.abi;
    this.compiledContract = compiledContract;
    this.providerOrAccount = providerOrAccount;
  }

  /**
   * Deploys contract and returns new instance of the Contract
   *
   * @param constructorCalldata - Constructor Calldata
   * @param addressSalt (optional) - Address Salt for deployment
   * @returns deployed Contract
   */
  public async deploy(
    constructorCalldata?: RawCalldata,
    addressSalt?: BigNumberish
  ): Promise<Contract> {
    const { address, code, transaction_hash } = await this.providerOrAccount.deployContract({
      contract: this.compiledContract,
      constructorCalldata,
      addressSalt,
    });
    assert(code === 'TRANSACTION_RECEIVED', 'Deployment of the contract failed');
    this.address = address as string;
    this.transaction_hash = transaction_hash;
    this.code = code;
    return new Contract(this.compiledContract.abi, address as string, this.providerOrAccount);
  }

  /**
   * Attaches current abi and provider or account to the new address
   *
   * @param address - Contract address
   * @returns Contract
   */
  attach(address: string): Contract {
    return ContractFactory.getContract(this.abi, address, this.providerOrAccount);
  }

  /**
   * Fetch the transaction of the deployment
   *
   * @returns Transaction
   */
  public async getDeployTransaction(): Promise<GetTransactionResponse> {
    if (this.transaction_hash) {
      return this.providerOrAccount.getTransaction(this.transaction_hash);
    }
    throw Error('Deployment not initialized yet');
  }

  /**
   * Instances contract
   *
   * @returns Contract
   */
  static getContract(abi: Abi, address: string, providerOrAccount?: Provider | Account): Contract {
    return new Contract(abi, address, providerOrAccount);
  }
}
