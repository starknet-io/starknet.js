import { matchersWithOptions } from 'jest-json-schema';

import accountSchemas from './schemas/account.json';
import libSchemas from './schemas/lib.json';
import providerSchemas from './schemas/provider.json';
import sequencerSchemas from './schemas/sequencer.json';

const ajvKeywords = require('ajv-keywords');

export const initializeMatcher = (expect: jest.Expect) => {
  expect.extend(
    matchersWithOptions(
      { schemas: [accountSchemas, sequencerSchemas, providerSchemas, libSchemas] },
      (ajv) => {
        // bigint is not supported in ajv, ajv-keywords, and jest-json-schema
        // we need to add a custom keyword with custom validation function
        // About depreciated warning when running tests see: https://github.com/ajv-validator/ajv/issues/2024
        ajv.addKeyword('isBigInt', {
          validate: (_schema: any, data: any) => {
            return typeof data === 'bigint' && data < 2n ** 64n && data >= 0n;
          },
          errors: true,
        });
        // This uses the `ajv-keywords` library to add pre-made custom keywords to the Ajv instance.
        ajvKeywords(ajv, ['typeof', 'instanceof']);
      }
    )
  );
  expect(accountSchemas).toBeValidSchema();
  expect(sequencerSchemas).toBeValidSchema();
  expect(providerSchemas).toBeValidSchema();
  expect(libSchemas).toBeValidSchema();
};
