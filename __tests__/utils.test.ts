import { compressProgram, makeAddress, isBrowser } from '..';
import compiledArgentAccount from '../__mocks__/ArgentAccount.json';

test('isNode', () => {
  expect(isBrowser).toBe(false);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = compressProgram(inputContract.program);

    expect(compressed).toMatchSnapshot();
  });
  // there's basically no error case with almost all types being supported
});
describe('makeAddress()', () => {
  test('test on eth address', () => {
    const ethAddress = '0xdFD0F27FCe99b50909de0bDD328Aed6eAbe76BC5';

    const starkAddress = makeAddress(ethAddress);

    expect(starkAddress).toBe('0xdfd0f27fce99b50909de0bdd328aed6eabe76bc5');
  });
});
