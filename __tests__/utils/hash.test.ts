import { getSelectorFromName } from '../../src/utils/hash';

describe('Hash Tester', () => {
  test('Test getSelectorFromName', () => {
    const hash = getSelectorFromName('__validate__');
    console.log('🚀 ~ file: hash.test.ts ~ line 6 ~ test ~ hash', hash);
  });
});
