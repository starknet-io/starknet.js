import ajvKeywords from 'ajv-keywords';
import { matchersWithOptions } from 'jest-json-schema';

import accountSchemas from './schemas/account.json';
import libSchemas from './schemas/lib.json';
import providerSchemas from './schemas/provider.json';
import rpcSchemas from './schemas/rpc.json';
import sequencerSchemas from './schemas/sequencer.json';

const schemas = [accountSchemas, sequencerSchemas, providerSchemas, libSchemas, rpcSchemas];
const jestJsonMatchers = matchersWithOptions({ schemas }, (ajv: any) => {
  // @ts-ignore
  ajv.addKeyword({
    keyword: 'isBigInt',
    type: 'object',
    validate: (_schema: any, data: any) => {
      return typeof data === 'bigint' && data < 2n ** 64n && data >= 0n;
    },
    errors: true,
  });
  // This uses the `ajv-keywords` library to add pre-made custom keywords to the Ajv instance.
  ajvKeywords(ajv, ['typeof', 'instanceof']);
});

export const initializeMatcher = (expect: jest.Expect) => {
  expect.extend(jestJsonMatchers);
  expect.extend({
    toMatchSchemaRef(received: object, name: string) {
      const schema = schemas.find((s) => Object.keys(s.definitions).includes(name));
      const $ref = `${schema?.$id}#/definitions/${name}`;
      return jestJsonMatchers.toMatchSchema.call(this, received, { $ref });
    },
  });
  expect(accountSchemas).toBeValidSchema();
  expect(sequencerSchemas).toBeValidSchema();
  expect(providerSchemas).toBeValidSchema();
  expect(libSchemas).toBeValidSchema();
  expect(rpcSchemas).toBeValidSchema();
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchemaRef(name: string): R;
    }
  }
}
