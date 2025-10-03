import { CairoResult } from '../../../../src/utils/calldata/enum';

describe('CairoResult', () => {
  describe('constructor', () => {
    test('should set "Ok" if variant is 0', () => {
      const cairoResult = new CairoResult<number, string>(0, 'result_content');
      expect(cairoResult.Ok).toEqual('result_content');
      expect(cairoResult.Err).toBeUndefined();
    });

    test('should set "Err" if variant is 1', () => {
      const cairoResult = new CairoResult<number, string>(1, 'result_content');
      expect(cairoResult.Err).toEqual('result_content');
      expect(cairoResult.Ok).toBeUndefined();
    });

    test('should throw an error if wrong variant is provided', () => {
      expect(() => new CairoResult<number, string>(2, 'result_content')).toThrow(
        new Error('Wrong variant! It should be CairoResultVariant.Ok or .Err.')
      );
    });
  });

  describe('unwrap', () => {
    test('should return "Ok" value', () => {
      const cairoResult = new CairoResult<number, string>(0, 'result_content');
      expect(cairoResult.unwrap()).toEqual('result_content');
    });

    test('should return "Err" value', () => {
      const cairoResult = new CairoResult<number, string>(1, 'result_content');
      expect(cairoResult.unwrap()).toEqual('result_content');
    });
  });

  describe('isOk', () => {
    test('should return true if "Ok" value is set', () => {
      const cairoResult = new CairoResult<number, string>(0, 'result_content');
      expect(cairoResult.isOk()).toEqual(true);
    });
  });

  describe('isErr', () => {
    test('should return true if "Err" value is set', () => {
      const cairoResult = new CairoResult<number, string>(1, 'result_content');
      expect(cairoResult.isErr()).toEqual(true);
    });
  });
});
