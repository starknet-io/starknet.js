import typedDataExample from '../../__mocks__/typedDataExample.json';
import typedDataStructArrayExample from '../../__mocks__/typedDataStructArrayExample.json';
import { number } from '../../src';
import { BigNumberish } from '../../src/utils/number';
import { encodeType, getMessageHash, getStructHash, getTypeHash } from '../../src/utils/typedData';

describe('typedData', () => {
  test('should get right type encoding', () => {
    const typeEncoding = encodeType(typedDataExample, 'Mail');
    expect(typeEncoding).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)"`
    );
    const typeEncodingStructArr = encodeType(typedDataStructArrayExample, 'Mail');
    expect(typeEncodingStructArr).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,posts_len:felt,posts:Post*)Person(name:felt,wallet:felt)Post(title:felt,content:felt)"`
    );
  });

  test('should get right type hash', () => {
    const typeHashDomain = getTypeHash(typedDataExample, 'StarkNetDomain');
    expect(typeHashDomain).toMatchInlineSnapshot(
      `"0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288"`
    );
    const typeHashPerson = getTypeHash(typedDataExample, 'Person');
    expect(typeHashPerson).toMatchInlineSnapshot(
      `"0x2896dbe4b96a67110f454c01e5336edc5bbc3635537efd690f122f4809cc855"`
    );
    const typeHashMail = getTypeHash(typedDataExample, 'Mail');
    expect(typeHashMail).toMatchInlineSnapshot(
      `"0x13d89452df9512bf750f539ba3001b945576243288137ddb6c788457d4b2f79"`
    );
    const typeHashPost = getTypeHash(typedDataStructArrayExample, 'Post');
    expect(typeHashPost).toMatchInlineSnapshot(
      `"0x1d71e69bf476486b43cdcfaf5a85c00bb2d954c042b281040e513080388356d"`
    );
    const typeHashMailWithStructArray = getTypeHash(typedDataStructArrayExample, 'Mail');
    expect(typeHashMailWithStructArray).toMatchInlineSnapshot(
      `"0x873b878e35e258fc99e3085d5aaad3a81a0c821f189c08b30def2cde55ff27"`
    );
  });

  test('should get right hash for StarkNetDomain', () => {
    const hash = getStructHash(typedDataExample, 'StarkNetDomain', typedDataExample.domain as any);
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
});
