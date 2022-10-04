import typedDataExample from '../../__mocks__/typedDataExample.json';
import typedDataSessionExample from '../../__mocks__/typedDataSessionExample.json';
import typedDataStructArrayExample from '../../__mocks__/typedDataStructArrayExample.json';
import { number } from '../../src';
import { getSelectorFromName } from '../../src/utils/hash';
import { MerkleTree } from '../../src/utils/merkle';
import { BigNumberish } from '../../src/utils/number';
import {
  StarkNetDomain,
  encodeType,
  encodeValue,
  getMessageHash,
  getStructHash,
  getTypeHash,
} from '../../src/utils/typedData';

describe('typedData', () => {
  test('should get right type encoding', () => {
    const typeEncoding = encodeType(typedDataExample.types, 'Mail');
    expect(typeEncoding).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)"`
    );
    const typeEncodingStructArr = encodeType(typedDataStructArrayExample.types, 'Mail');
    expect(typeEncodingStructArr).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,posts_len:felt,posts:Post*)Person(name:felt,wallet:felt)Post(title:felt,content:felt)"`
    );
  });

  test('should get right type hash', () => {
    const typeHashDomain = getTypeHash(typedDataExample.types, 'StarkNetDomain');
    expect(typeHashDomain).toMatchInlineSnapshot(
      `"0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288"`
    );
    const typeHashPerson = getTypeHash(typedDataExample.types, 'Person');
    expect(typeHashPerson).toMatchInlineSnapshot(
      `"0x2896dbe4b96a67110f454c01e5336edc5bbc3635537efd690f122f4809cc855"`
    );
    const typeHashMail = getTypeHash(typedDataExample.types, 'Mail');
    expect(typeHashMail).toMatchInlineSnapshot(
      `"0x13d89452df9512bf750f539ba3001b945576243288137ddb6c788457d4b2f79"`
    );
    const typeHashPost = getTypeHash(typedDataStructArrayExample.types, 'Post');
    expect(typeHashPost).toMatchInlineSnapshot(
      `"0x1d71e69bf476486b43cdcfaf5a85c00bb2d954c042b281040e513080388356d"`
    );
    const typeHashMailWithStructArray = getTypeHash(typedDataStructArrayExample.types, 'Mail');
    expect(typeHashMailWithStructArray).toMatchInlineSnapshot(
      `"0x873b878e35e258fc99e3085d5aaad3a81a0c821f189c08b30def2cde55ff27"`
    );
    const selectorTypeHash = getTypeHash({}, 'selector');
    expect(selectorTypeHash).toMatchInlineSnapshot(
      `"0x1d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
    );
  });

  test('should transform type selector', () => {
    const selector = 'transfer';
    const selectorHash = getSelectorFromName(selector);
    const rawSelectorValueHash = encodeValue({}, 'felt', selectorHash);
    const selectorValueHash = encodeValue({}, 'selector', selector);
    expect(selectorValueHash).toEqual(rawSelectorValueHash);
    expect(selectorValueHash).toMatchInlineSnapshot(`
      Array [
        "felt",
        "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
      ]
    `);
  });

  test('should transform merkle tree', () => {
    const tree = new MerkleTree(['0x1', '0x2', '0x3']);
    const [, merkleTreeHash] = encodeValue({}, 'merkletree', tree.leaves);
    expect(merkleTreeHash).toBe(tree.root);
    expect(merkleTreeHash).toMatchInlineSnapshot(
      `"0x15ac9e457789ef0c56e5d559809e7336a909c14ee2511503fa7af69be1ba639"`
    );
  });

  test('should transform merkle tree with custom types', () => {
    const leaves = [
      {
        contractAddress: '0x1',
        selector: 'transfer',
      },
      {
        contractAddress: '0x2',
        selector: 'transfer',
      },
      {
        contractAddress: '0x3',
        selector: 'transfer',
      },
    ];
    const hashedLeaves = leaves.map(
      (leaf) =>
        encodeValue(
          {
            Policy: [
              { name: 'contractAddress', type: 'felt' },
              { name: 'selector', type: 'selector' },
            ],
          },
          'Policy',
          leaf
        )[1]
    );
    const tree = new MerkleTree(hashedLeaves);
    const [, merkleTreeHash] = encodeValue(
      {
        Parent: [{ name: 'root', type: 'merkletree', contains: 'Policy' }],
        Policy: [
          { name: 'contractAddress', type: 'felt' },
          { name: 'selector', type: 'selector' },
        ],
      },
      'merkletree',
      leaves,
      { key: 'root', parent: 'Parent' }
    );
    expect(merkleTreeHash).toBe(tree.root);
    expect(merkleTreeHash).toMatchInlineSnapshot(
      `"0x12354b159e3799dc0ebe86d62dde4ce7b300538d471e5a7fef23dcbac076011"`
    );
  });

  test('should get right hash for StarkNetDomain', () => {
    const hash = getStructHash(
      typedDataExample.types,
      'StarkNetDomain',
      typedDataExample.domain as StarkNetDomain
    );
    expect(hash).toMatchInlineSnapshot(
      `"0x54833b121883a3e3aebff48ec08a962f5742e5f7b973469c1f8f4f55d470b07"`
    );
  });

  test('should get right hash for entire message', () => {
    const hash = getMessageHash(typedDataExample, '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826');
    expect(hash).toMatchInlineSnapshot(
      `"0x6fcff244f63e38b9d88b9e3378d44757710d1b244282b435cb472053c8d78d0"`
    );

    const hashStructArr = getMessageHash(
      typedDataStructArrayExample,
      '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    );
    expect(hashStructArr).toMatchInlineSnapshot(
      `"0x5914ed2764eca2e6a41eb037feefd3d2e33d9af6225a9e7fe31ac943ff712c"`
    );
  });

  interface StringStruct {
    len: BigNumberish;
    data: BigNumberish[];
  }
  function stringToStringStruct(str: string): StringStruct {
    const len = str.length;
    const data = str.split('').map((char) => number.toHex(number.toBN(char.charCodeAt(0))));
    return { len, data };
  }

  const typedDataStringExample = {
    types: {
      StarkNetDomain: [
        { name: 'name', type: 'felt' },
        { name: 'version', type: 'felt' },
        { name: 'chainId', type: 'felt' },
      ],
      Person: [
        { name: 'name', type: 'felt' },
        { name: 'wallet', type: 'felt' },
      ],
      String: [
        { name: 'len', type: 'felt' },
        { name: 'data', type: 'felt*' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'String' },
      ],
    },
    primaryType: 'Mail',
    domain: {
      name: 'StarkNet Mail',
      version: '1',
      chainId: 1,
    },
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: stringToStringStruct(
        'this is way longer than just 32 characters, to test if that is possible within a typedData struct.'
      ),
    },
  };

  test('should transform strings correctly', () => {
    const hash = getMessageHash(
      typedDataStringExample,
      '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    );
    expect(hash).toMatchInlineSnapshot(
      `"0x70338fb11b8f70b68b261de8a322bcb004bd85e88ac47d9147982c7f5ac66fd"`
    );
  });

  test('should transform session message correctly', () => {
    const hash = getMessageHash(
      typedDataSessionExample,
      '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    );
    expect(hash).toMatchInlineSnapshot(
      `"0x751fb7d98545f7649d0d0eadc80d770fcd88d8cfaa55590b284f4e1b701ef0a"`
    );
  });
});
