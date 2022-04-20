// Install the latest version of starknet with npm install starknet@next and import starknet
import * as starknet from 'starknet';

// Generate public and private key pair.

const keyPair = starknet.ec.genKeyPair();
const starkKey = starknet.ec.getStarkKey(keyPair);
const starkKeyInt = starknet.number.toBN(starknet.encode.removeHexPrefix(starkKey), 16);

const { address: walletAddressLocal } = await provider.deployContract({
  contract: COMPILED_WALLET_CONTRACT_JSON,
  constructorCallData: [starkKeyInt],
  addressSalt: 0,
});

walletAddress = walletAddressLocal;

const { code: codeErc20, address: erc20AddressLocal } = await defaultProvider.deployContract({
  contract: compiledErc20,
});

const erc20Address = erc20AddressLocal;
const erc20 = new Contract(compiledErc20.abi, erc20Address);

const { code: codeErc20Mint, transaction_hash: txErc20Mint } = await erc20.invoke('mint', {
  recipient: walletAddress,
  amount: '1000',
});

const balanceBeforeTransfer = await erc20.call('balance_of', {
  user: walletAddress,
}).res;

console.log(number.toBN(res).toString());

const { nonce } = await wallet.call('get_nonce');
const msgHash = encode.addHexPrefix(
  hash.hashMessage(
    wallet.connectedTo,
    erc20Address,
    stark.getSelectorFromName('transfer'),
    [erc20Address, '10'],
    nonce.toString()
  )
);

const signature = ec.sign(starkKeyPair, msgHash);
const { code, transaction_hash } = await wallet.invoke(
  'execute',
  {
    to: erc20Address,
    selector: stark.getSelectorFromName('transfer'),
    calldata: [erc20Address, '10'],
    nonce: nonce.toString(),
  },
  signature
);

await defaultProvider.waitForTx(transaction_hash);

const balanceAfterTransfer = await erc20.call('balance_of', {
  user: walletAddress,
}).res;

console.log('Balance after transfer', balanceAfterTransfer);
