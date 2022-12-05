import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { Abi, CompiledContract, RawArgs } from '../types';
import { Contract } from './default';

export class ContractFactory {
  abi: Abi;

  compiledContract: CompiledContract;

  classHash: string;

  account: AccountInterface;

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
  }

  /**
   * Deploys contract and returns new instance of the Contract
   *
   * @param constructorCalldata - Constructor Calldata
   * @param addressSalt (optional) - Address Salt for deployment
   * @returns deployed Contract
   */
  public async deploy(
    constructorCalldata?: RawArgs,
    addressSalt?: string | undefined
  ): Promise<Contract> {
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
