import * as starkCurve from '@scure/starknet';

import typedDataExample from '../../__mocks__/typedData/baseExample.json';
import exampleBaseTypes from '../../__mocks__/typedData/example_baseTypes.json';
import exampleEnum from '../../__mocks__/typedData/example_enum.json';
import examplePresetTypes from '../../__mocks__/typedData/example_presetTypes.json';
import typedDataStructArrayExample from '../../__mocks__/typedData/mail_StructArray.json';
import typedDataSessionExample from '../../__mocks__/typedData/session_MerkleTree.json';
import { BigNumberish, StarkNetDomain, num } from '../../src';
import { getSelectorFromName } from '../../src/utils/hash';
import { MerkleTree } from '../../src/utils/merkle';
import {
  TypedDataRevision,
  encodeType,
  encodeValue,
  getMessageHash,
  getStructHash,
  getTypeHash,
} from '../../src/utils/typedData';

const exampleAddress = '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826';

describe('typedData', () => {
  test('should get right type encoding', () => {
    let encoded: string;
    encoded = encodeType(typedDataExample.types, 'Mail');
    expect(encoded).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)"`
    );
    encoded = encodeType(typedDataStructArrayExample.types, 'Mail');
    expect(encoded).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,posts_len:felt,posts:Post*)Person(name:felt,wallet:felt)Post(title:felt,content:felt)"`
    );
    encoded = encodeType(typedDataExample.types, 'Mail', TypedDataRevision.Active);
    expect(encoded).toMatchInlineSnapshot(
      JSON.stringify(
        '"Mail"("from":"Person","to":"Person","contents":"felt")"Person"("name":"felt","wallet":"felt")'
      )
    );
    encoded = encodeType(typedDataStructArrayExample.types, 'Mail', TypedDataRevision.Active);
    expect(encoded).toMatchInlineSnapshot(
      `"\\"Mail\\"(\\"from\\":\\"Person\\",\\"to\\":\\"Person\\",\\"posts_len\\":\\"felt\\",\\"posts\\":\\"Post*\\")\\"Person\\"(\\"name\\":\\"felt\\",\\"wallet\\":\\"felt\\")\\"Post\\"(\\"title\\":\\"felt\\",\\"content\\":\\"felt\\")"`
    );
    encoded = encodeType(exampleBaseTypes.types, 'Example', TypedDataRevision.Active);
    expect(encoded).toMatchInlineSnapshot(
      `"\\"Example\\"(\\"n0\\":\\"felt\\",\\"n1\\":\\"bool\\",\\"n2\\":\\"string\\",\\"n3\\":\\"selector\\",\\"n4\\":\\"u128\\",\\"n5\\":\\"ContractAddress\\",\\"n6\\":\\"ClassHash\\",\\"n7\\":\\"timestamp\\",\\"n8\\":\\"shortstring\\")"`
    );
    encoded = encodeType(examplePresetTypes.types, 'Example', TypedDataRevision.Active);
    expect(encoded).toMatchInlineSnapshot(
      `"\\"Example\\"(\\"n0\\":\\"TokenAmount\\",\\"n1\\":\\"NftId\\")"`
    );
    encoded = encodeType(exampleEnum.types, 'Example', TypedDataRevision.Active);
    expect(encoded).toMatchInlineSnapshot(
      `"\\"Example\\"(\\"someEnum\\":\\"MyEnum\\")\\"MyEnum\\"(\\"Variant 1\\":(),\\"Variant 2\\":(\\"u128\\",\\"u128*\\"),\\"Variant 3\\":(\\"u128\\"))"`
    );
  });

  test('should get right type hash', () => {
    let typeHash: string;
    typeHash = getTypeHash(typedDataExample.types, 'StarkNetDomain');
    expect(typeHash).toMatchInlineSnapshot(
      `"0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288"`
    );
    typeHash = getTypeHash(typedDataExample.types, 'Person');
    expect(typeHash).toMatchInlineSnapshot(
      `"0x2896dbe4b96a67110f454c01e5336edc5bbc3635537efd690f122f4809cc855"`
    );
    typeHash = getTypeHash(typedDataExample.types, 'Mail');
    expect(typeHash).toMatchInlineSnapshot(
      `"0x13d89452df9512bf750f539ba3001b945576243288137ddb6c788457d4b2f79"`
    );
    typeHash = getTypeHash(typedDataStructArrayExample.types, 'Post');
    expect(typeHash).toMatchInlineSnapshot(
      `"0x1d71e69bf476486b43cdcfaf5a85c00bb2d954c042b281040e513080388356d"`
    );
    typeHash = getTypeHash(typedDataStructArrayExample.types, 'Mail');
    expect(typeHash).toMatchInlineSnapshot(
      `"0x873b878e35e258fc99e3085d5aaad3a81a0c821f189c08b30def2cde55ff27"`
    );
    typeHash = getTypeHash({}, 'selector');
    expect(typeHash).toMatchInlineSnapshot(
      `"0x1d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
    );
    typeHash = getTypeHash(exampleBaseTypes.types, 'Example', TypedDataRevision.Active);
    expect(typeHash).toMatchInlineSnapshot(
      `"0x2e5b7e12ca4388c49b4ceb305d853b8f7bf5f36525fea5e4255346b80153249"`
    );
    typeHash = getTypeHash(examplePresetTypes.types, 'Example', TypedDataRevision.Active);
    expect(typeHash).toMatchInlineSnapshot(
      `"0x155de33c6a0cc7f2b8926afc7a71fc2ac31ffc26726aee5da0570c5d517a763"`
    );
    typeHash = getTypeHash(exampleEnum.types, 'Example', TypedDataRevision.Active);
    expect(typeHash).toMatchInlineSnapshot(
      `"0x380a54d417fb58913b904675d94a8a62e2abc3467f4b5439de0fd65fafdd1a8"`
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

  test('should get right hash for StarknetDomain', () => {
    const hash = getStructHash(
      exampleBaseTypes.types,
      'StarknetDomain',
      exampleBaseTypes.domain as StarkNetDomain,
      TypedDataRevision.Active
    );
    expect(hash).toMatchInlineSnapshot(
      `"0x555f72e550b308e50c1a4f8611483a174026c982a9893a05c185eeb85399657"`
    );
  });

  test('should get right hash for entire message', () => {
    const hash = getMessageHash(typedDataExample, exampleAddress);
    expect(hash).toMatchInlineSnapshot(
      `"0x6fcff244f63e38b9d88b9e3378d44757710d1b244282b435cb472053c8d78d0"`
    );

    const hashStructArr = getMessageHash(typedDataStructArrayExample, exampleAddress);
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
    const data = str.split('').map((char) => num.toHex(char.charCodeAt(0)));
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
        wallet: exampleAddress,
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
    const hash = getMessageHash(typedDataStringExample, exampleAddress);
    expect(hash).toMatchInlineSnapshot(
      `"0x70338fb11b8f70b68b261de8a322bcb004bd85e88ac47d9147982c7f5ac66fd"`
    );
  });

  test('should transform session message correctly', () => {
    const hash = getMessageHash(typedDataSessionExample, exampleAddress);
    expect(hash).toMatchInlineSnapshot(
      `"0x751fb7d98545f7649d0d0eadc80d770fcd88d8cfaa55590b284f4e1b701ef0a"`
    );
  });

  test('should hash messages with revision 1 types', () => {
    // necessary to spy dependecy since function spies (hash.computePedersenHash; hash.computePoseidonHash) won't work
    const spyPedersen = jest.spyOn(starkCurve, 'pedersen');
    const spyPoseidon = jest.spyOn(starkCurve, 'poseidonHashMany');

    let messageHash: string;
    messageHash = getMessageHash(exampleBaseTypes, exampleAddress);
    expect(messageHash).toMatchInlineSnapshot(
      `"0x790d9fa99cf9ad91c515aaff9465fcb1c87784d9cfb27271ed193675cd06f9c"`
    );

    messageHash = getMessageHash(examplePresetTypes, exampleAddress);
    expect(messageHash).toMatchInlineSnapshot(
      `"0x26e7b8cedfa63cdbed14e7e51b60ee53ac82bdf26724eb1e3f0710cb8987522"`
    );

    messageHash = getMessageHash(exampleEnum, exampleAddress);
    expect(messageHash).toMatchInlineSnapshot(
      `"0x3df10475ad5a8f49db4345a04a5b09164d2e24b09f6e1e236bc1ccd87627cc"`
    );

    expect(spyPedersen).not.toHaveBeenCalled();
    expect(spyPoseidon).toHaveBeenCalled();
    spyPedersen.mockRestore();
    spyPoseidon.mockRestore();
  });
});
