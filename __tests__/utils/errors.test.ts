import { RPC, RpcError } from '../../src';

describe('Error utility tests', () => {
  test('RpcError', () => {
    // TODO: @penovicp types 0.8 exporta u top level sve 0.7 exporta po komponentama, neznan jeli treba minjat test i mod da ocukuje oba tipa
    const baseError: RPC.RPCSPEC08.UNEXPECTED_ERROR = {
      code: 63,
      message: 'An unexpected error occurred',
      data: 'data',
    };
    const method = 'GET';
    const error = new RpcError(baseError, method, method);

    expect(error.baseError).toBe(baseError);
    expect(error.message).toMatch(/^RPC: \S+ with params \S+/);
    expect(error.code).toEqual(baseError.code);
    expect(error.request.method).toEqual(method);
    expect(error.request.params).toEqual(method);

    expect(error.isType('BLOCK_NOT_FOUND')).toBe(false);
    expect(error.isType('UNEXPECTED_ERROR')).toBe(true);
  });
});
