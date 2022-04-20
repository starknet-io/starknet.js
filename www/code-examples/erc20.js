import * as starknet from 'starknet';

const keyPair = starknet.ec.genKeyPair();
const starkKey = starknet.ec.getStarkKey(keyPair);
const starkKeyInt = starknet.number.toBN(starknet.encode.removeHexPrefix(starkKey), 16);

const deployWalletTx = await provider.deployContract({
  contract: COMPILED_WALLET_CONTRACT_JSON,
  constructorCallData: [starkKeyInt],
  addressSalt: 0,
});

await defaultProvider.waitForTx(deployWalletTx.transaction_hash);
