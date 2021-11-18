import fs from 'fs';

import {
  CompiledContract,
  Contract,
  compileCalldata,
  defaultProvider,
  ec,
  encode,
  hash,
  json,
  number,
  stark,
} from '../src';

describe('getStarkAccountFromPrivateKey()', () => {
  test('it works with valid privateKey', () => {
    const privateKey = '0xb696427c0d79c5d28a1fa6f748bae1b98b3f4b86bd1a2505bab144673c856fa9';

    const starkKeyPair = ec.getKeyPair(privateKey);
    const starkKey = ec.getStarkKey(starkKeyPair);

    expect(starkKey).toBe('0x060d46f8d7ef3d83ed05f3ed9beb91e22f9529289b9d863683fd71eafaf28035');
  });
  test('it works with valid privateKey', () => {
    const privateKey = '0x5f65099e269b080000000000000000000000000000000000000000000000000';

    const starkKeyPair = ec.getKeyPair(privateKey);
    const starkKey = ec.getStarkKey(starkKeyPair);

    expect(starkKey).toBe('0xf321e59b257a577836d8313150aabd21f412491358c329966218df76bab591');
  });
});

const compiledArgentAccount: CompiledContract = json.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);
const compiledErc20: CompiledContract = json.parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('deploy and test Wallet', () => {
  const privateKey = stark.randomAddress();

  const starkKeyPair = ec.getKeyPair(privateKey);
  const starkKeyPub = ec.getStarkKey(starkKeyPair);
  let wallet: Contract;
  let walletAddress: string;
  let erc20: Contract;
  let erc20Address: string;
  beforeAll(async () => {
    const { code: codeErc20, address: erc20AddressLocal } = await defaultProvider.deployContract(
      compiledErc20,
      []
    );
    erc20Address = erc20AddressLocal;
    erc20 = new Contract(compiledErc20.abi, erc20Address);

    expect(codeErc20).toBe('TRANSACTION_RECEIVED');

    const { code, address: walletAddressLocal } = await defaultProvider.deployContract(
      compiledArgentAccount,
      compileCalldata({
        signer: starkKeyPub,
        guardian: '0',
        L1_address: '0',
      }),
      starkKeyPub
    );
    walletAddress = walletAddressLocal;
    wallet = new Contract(compiledArgentAccount.abi, walletAddress);
    expect(code).toBe('TRANSACTION_RECEIVED');

    const { code: codeErc20Mint, transaction_hash: txErc20Mint } = await erc20.invoke('mint', {
      recipient: walletAddress,
      amount: '1000',
    });

    expect(codeErc20Mint).toBe('TRANSACTION_RECEIVED');

    await defaultProvider.waitForTx(txErc20Mint);
  });
  test('read nonce', async () => {
    const { nonce } = await wallet.call('get_nonce');

    expect(number.toBN(nonce as string).toString()).toStrictEqual(number.toBN(0).toString());
  });
  test('read balance of wallet', async () => {
    const { res } = await erc20.call('balance_of', {
      user: walletAddress,
    });

    expect(number.toBN(res as string).toString()).toStrictEqual(number.toBN(1000).toString());
  });
  test('execute by wallet owner', async () => {
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

    const { r, s } = ec.sign(starkKeyPair, msgHash);
    const { code, transaction_hash } = await wallet.invoke(
      'execute',
      {
        to: erc20Address,
        selector: stark.getSelectorFromName('transfer'),
        calldata: [erc20Address, '10'],
        nonce: nonce.toString(),
      },
      [number.toHex(r), number.toHex(s)]
    );

    expect(code).toBe('TRANSACTION_RECEIVED');

    await defaultProvider.waitForTx(transaction_hash);
  });
  test('read balance of wallet after transfer', async () => {
    const { res } = await erc20.call('balance_of', {
      user: walletAddress,
    });

    expect(number.toBN(res as string).toString()).toStrictEqual(number.toBN(990).toString());
  });
});

test('build tx', async () => {
  const privateKey = '0x1B69B4BE052FAB1';
  const keyPair = ec.getKeyPair(privateKey);
  const address = ec.getStarkKey(keyPair);

  expect(address).toBe('0x04024999b9574cb7623679ce049a609db62a95098982c5b28ac61abdebd1c82b');

  const selector = stark.getSelectorFromName('transfer');

  expect(selector).toBe(
    number.toHex(
      number.toBN('232670485425082704932579856502088130646006032362877466777181098476241604910')
    )
  );

  const msgHash = hash.hashMessage(address, '1', selector, ['6', '7'], '0');
  expect(number.toBN(msgHash).toString()).toStrictEqual(
    number
      .toBN('2154230509011102177917341711834485670139815171447919056633262592518907948680')
      .toString()
  );

  const { r, s } = ec.sign(keyPair, msgHash);
  expect(r.toString()).toBe(
    '706800951915233622090196542158919402159816118214143837213294331713137614072'
  );
  expect(s.toString()).toBe(
    '1857147121895075123389037565321926580259282654271568123966453051614350474888'
  );
});
