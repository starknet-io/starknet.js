import typedDataExample from '../../__mocks__/typedDataExample.json';
import { encodeType, getMessageHash, getStructHash, getTypeHash } from '../../src/utils/typedData';

describe('typedData', () => {
  test('should get right type encoding', () => {
    const typeEncoding = encodeType(typedDataExample, 'Mail');
    expect(typeEncoding).toMatchInlineSnapshot(
      `"Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)"`
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
  });
});
