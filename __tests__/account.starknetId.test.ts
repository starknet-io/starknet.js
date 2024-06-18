import { Provider, num, shortString } from '../src';
import {
  compiledNaming,
  compiledNamingCasm,
  compiledPricing,
  compiledPricingCasm,
  compiledSidMulticall,
  compiledSidMulticallCasm,
  compiledStarknetId,
  compiledStarknetIdCasm,
  getTestAccount,
  getTestProvider,
} from './config/fixtures';

const { hexToDecimalString } = num;

describe('deploy and test Wallet', () => {
  const provider = new Provider(getTestProvider());
  const account = getTestAccount(provider);
  let identityAddress: string;
  let namingAddress: string;
  let multicallAddress: string;
  const devnetERC20Address = '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7';

  beforeAll(async () => {
    // Deploy Starknet id contract
    const idResponse = await account.declareAndDeploy({
      contract: compiledStarknetId,
      casm: compiledStarknetIdCasm,
      constructorCalldata: [account.address, 0],
    });
    identityAddress = idResponse.deploy.contract_address;

    // Deploy pricing contract
    const pricingResponse = await account.declareAndDeploy({
      contract: compiledPricing,
      casm: compiledPricingCasm,
      constructorCalldata: [devnetERC20Address],
    });
    const pricingAddress = pricingResponse.deploy.contract_address;

    // Deploy naming contract
    const namingResponse = await account.declareAndDeploy({
      contract: compiledNaming,
      casm: compiledNamingCasm,
      constructorCalldata: [identityAddress, pricingAddress, 0, account.address],
    });
    namingAddress = namingResponse.deploy.contract_address;

    // Deploy multicall contract
    const multicallResponse = await account.declareAndDeploy({
      contract: compiledSidMulticall,
      casm: compiledSidMulticallCasm,
    });
    multicallAddress = multicallResponse.deploy.contract_address;

    const { transaction_hash } = await account.execute(
      [
        {
          contractAddress: devnetERC20Address,
          entrypoint: 'approve',
          calldata: [namingAddress, 0, 1], // Price of domain
        },
        {
          contractAddress: identityAddress,
          entrypoint: 'mint',
          calldata: ['1'], // TokenId
        },
        {
          contractAddress: namingAddress,
          entrypoint: 'buy',
          calldata: [
            '1', // Starknet id linked
            '1499554868251', // Domain encoded "fricoben"
            '62', // days
            '0', // resolver
            0, // sponsor
            0,
            0,
          ],
        },
        {
          contractAddress: identityAddress,
          entrypoint: 'set_main_id',
          calldata: ['1'],
        },
      ],
      undefined
    );

    await provider.waitForTransaction(transaction_hash);
  });

  test('Get the stark name of the account (using starknet.id)', async () => {
    const address = await account.getAddressFromStarkName('fricoben.stark', namingAddress);
    expect(hexToDecimalString(address)).toEqual(hexToDecimalString(account.address));
  });

  test('Get the account from a stark name of the account (using starknet.id)', async () => {
    const name = await account.getStarkName(undefined, namingAddress);
    expect(name).toEqual('fricoben.stark');
  });

  describe('Test getStarkProfile', () => {
    beforeAll(async () => {
      // Add verifier data
      const { transaction_hash: transaction_hash_verifier } = await account.execute(
        [
          {
            contractAddress: identityAddress,
            entrypoint: 'set_verifier_data',
            calldata: [
              '1', // token_id
              shortString.encodeShortString('discord'), // field
              123, // value
              0,
            ],
          },
        ],
        undefined
      );
      await provider.waitForTransaction(transaction_hash_verifier);
    });

    test('Get the profile data from an address (using starknet.id)', async () => {
      const profile = await account.getStarkProfile(
        account.address,
        namingAddress,
        identityAddress,
        account.address,
        account.address,
        account.address,
        multicallAddress
      );
      const expectedProfile = {
        name: 'fricoben.stark',
        twitter: undefined,
        github: undefined,
        discord: '123',
        proofOfPersonhood: false,
        profilePicture: 'https://starknet.id/api/identicons/1',
      };
      expect(profile).toStrictEqual(expectedProfile);
    });
  });
});
