import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
import { Abi, CompiledContract, RawCalldata } from '../types';
import { BigNumberish } from '../utils/number';
import { Contract } from './default';

export class ContractFactory {
  abi: Abi;

  compiledContract: CompiledContract;

  providerOrAccount: ProviderInterface | AccountInterface;

  constructor(
    compiledContract: CompiledContract,
    providerOrAccount: ProviderInterface | AccountInterface = defaultProvider,
    abi: Abi = compiledContract.abi // abi can be different from the deployed contract ie for proxy contracts
  ) {
    this.abi = abi;
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
    assert(
      code === 'TRANSACTION_RECEIVED' && Boolean(address),
      'Deployment of the contract failed'
    );

    const contractInstance = new Contract(
      this.compiledContract.abi,
      address!,
      this.providerOrAccount
    );
    contractInstance.deployTransactionHash = transaction_hash;

    return contractInstance;
  }

  /**
   * Attaches to new Provider or Account
   *
   * @param providerOrAccount - new Provider or Account to attach to
   */
  connect(providerOrAccount: ProviderInterface | AccountInterface): ContractFactory {
    this.providerOrAccount = providerOrAccount;
    return this;
  }

  /**
   * Attaches current abi and provider or account to the new address
   *
   * @param address - Contract address
   * @returns Contract
   */
  attach(address: string): Contract {
    return new Contract(this.abi, address, this.providerOrAccount);
  }

  // ethers.js' getDeployTransaction cant be supported as it requires the account or signer to return a signed transaction which is not possible with the current implementation
}
