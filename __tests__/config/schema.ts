import ajvKeywords from 'ajv-keywords';
import { matchersWithOptions } from 'jest-json-schema';

import starknet_api_openrpc from 'starknet_specs/api/starknet_api_openrpc.json';
import starknet_metadata from 'starknet_specs/api/starknet_metadata.json';
import starknet_trace_api_openrpc from 'starknet_specs/api/starknet_trace_api_openrpc.json';
import starknet_write_api from 'starknet_specs/api/starknet_write_api.json';

import accountSchemas from '../schemas/account.json';
import componentSchemas from '../schemas/component.json';
import libSchemas from '../schemas/lib.json';
import providerSchemas from '../schemas/provider.json';
import rpcSchemas from '../schemas/rpc.json';
import { isBigInt } from '../../src/utils/typed';

const matcherSchemas = [accountSchemas, libSchemas, providerSchemas, rpcSchemas];
const starknetSchemas = [
  { $id: 'starknet_api_openrpc', ...starknet_api_openrpc },
  { $id: 'starknet_metadata', ...starknet_metadata },
  { $id: 'starknet_trace_api_openrpc', ...starknet_trace_api_openrpc },
  { $id: 'starknet_write_api', ...starknet_write_api },
  // schema aliases to rectify faulty references from the spec
  { $id: 'starknet_api_openrpc.json', ...starknet_api_openrpc },
  { $id: 'api/starknet_api_openrpc.json', ...starknet_api_openrpc },
];
const schemas = [...matcherSchemas, ...starknetSchemas, componentSchemas];
const jestJsonMatchers = matchersWithOptions({ schemas }, (ajv: any) => {
  // @ts-ignore
  ajv.addKeyword({
    keyword: 'isBigInt',
    type: 'object',
    validate: (_schema: any, data: any) => {
      return isBigInt(data) && data < 2n ** 64n && data >= 0n;
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
      const schema = matcherSchemas.find((s) => Object.keys(s.definitions).includes(name));
      const $ref = `${schema?.$id}#/definitions/${name}`;
      return jestJsonMatchers.toMatchSchema.call(this, received, { $ref });
    },
  });
  expect(accountSchemas).toBeValidSchema();
  expect(componentSchemas).toBeValidSchema();
  expect(starknet_api_openrpc).toBeValidSchema();
  expect(starknet_metadata).toBeValidSchema();
  expect(starknet_trace_api_openrpc).toBeValidSchema();
  expect(starknet_write_api).toBeValidSchema();
  expect(libSchemas).toBeValidSchema();
  expect(providerSchemas).toBeValidSchema();
  expect(rpcSchemas).toBeValidSchema();
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchemaRef(name: string): R;
    }
  }
}
