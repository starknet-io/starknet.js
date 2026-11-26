import { formatUnits, parseUnits, units } from '../../src';

describe('units', () => {
  test('converts fri to strk', () => {
    expect(units(1n, 'fri')).toEqual('0.000000000000000001');
    expect(units(1000n, 'fri')).toEqual('0.000000000000001');
    expect(units(123123123n, 'fri')).toEqual('0.000000000123123123');
    expect(units('123123123', 'fri')).toEqual('0.000000000123123123');
    expect(units(10n ** 18n, 'fri')).toEqual('1');
    expect(units(30n * 10n ** 16n, 'fri')).toEqual('0.3');
    expect(units(30n * 10n ** 22n, 'fri')).toEqual('300000');
  });

  test('reads a hex fri amount as an integer', () => {
    expect(units('0x40ff', 'fri')).toEqual('0.000000000000016639');
  });

  test('converts strk to fri', () => {
    expect(units('0.3', 'strk')).toEqual('300000000000000000');
    expect(units('1', 'strk')).toEqual('1000000000000000000');
    expect(units('1000', 'strk')).toEqual('1000000000000000000000');
    expect(units('123123123.123', 'strk')).toEqual('123123123123000000000000000');
    expect(units('0.123456789012345678', 'strk')).toEqual('123456789012345678');
  });

  test('reads a hex strk amount as a whole number of strk', () => {
    expect(units('0x40ff', 'strk')).toEqual('16639000000000000000000');
  });

  test('gives "0" for a zero strk amount', () => {
    expect(units('0', 'strk')).toEqual('0');
    expect(units('0.0', 'strk')).toEqual('0');
    expect(units('000', 'strk')).toEqual('0');
    expect(units(0n, 'strk')).toEqual('0');
    expect(units('0x0', 'strk')).toEqual('0');
  });

  test('refuses a strk amount with more than 18 decimals', () => {
    expect(() => units('0.1234567890123456789', 'strk')).toThrow(
      "'0.1234567890123456789' strk has more than 18 decimals"
    );
    expect(() => units('1.0000000000000000001', 'strk')).toThrow(
      "'1.0000000000000000001' strk has more than 18 decimals"
    );
  });

  test('keeps a strk amount through a round trip', () => {
    expect(units(units('0.333', 'strk'), 'fri')).toEqual('0.333');
    expect(units(units('123123123.123', 'strk'), 'fri')).toEqual('123123123.123');
    expect(units(units('1000.1', 'strk'), 'fri')).toEqual('1000.1');
    expect(units(units('123123123.123123', 'strk'), 'fri')).toEqual('123123123.123123');
    expect(units(units('0.0000003', 'strk'), 'fri')).toEqual('0.0000003');
    expect(units(units('0', 'strk'), 'fri')).toEqual('0');
  });

  test('accepts short strk amounts', () => {
    expect(units('.5', 'strk')).toEqual('500000000000000000');
    expect(units('1.', 'strk')).toEqual('1000000000000000000');
  });

  test('accepts negative strk amounts', () => {
    expect(units('-1.5', 'strk')).toEqual('-1500000000000000000');
    expect(units('-.5', 'strk')).toEqual('-500000000000000000');
    expect(units(-1n, 'strk')).toEqual('-1000000000000000000');
    // minus zero is zero, without a sign
    expect(units('-0', 'strk')).toEqual('0');
    expect(units('-0.0', 'strk')).toEqual('0');
  });

  test('accepts zeros after the 18th decimal', () => {
    expect(units('1.50000000000000000000', 'strk')).toEqual('1500000000000000000');
    expect(units('0.0000000000000000010', 'strk')).toEqual('1');
  });

  test('refuses a strk amount with several dots', () => {
    // '1.000.000' is one million in some countries: it must not become 1 strk
    expect(() => units('1.000.000', 'strk')).toThrow("'1.000.000' is not a valid strk amount");
    expect(() => units('1.2.3', 'strk')).toThrow("'1.2.3' is not a valid strk amount");
  });

  test('refuses a strk amount with other characters', () => {
    // '1 ' must not become 1 fri
    expect(() => units('1 ', 'strk')).toThrow("'1 ' is not a valid strk amount");
    expect(() => units(' 1', 'strk')).toThrow("' 1' is not a valid strk amount");
    expect(() => units('1,5', 'strk')).toThrow("'1,5' is not a valid strk amount");
    expect(() => units('+1.5', 'strk')).toThrow("'+1.5' is not a valid strk amount");
    expect(() => units('1e3', 'strk')).toThrow("'1e3' is not a valid strk amount");
    expect(() => units('--1', 'strk')).toThrow("'--1' is not a valid strk amount");
    expect(() => units('-0x10', 'strk')).toThrow("'-0x10' is not a valid strk amount");
  });

  test('refuses a strk amount with no digit', () => {
    expect(() => units('', 'strk')).toThrow("'' is not a valid strk amount");
    expect(() => units('.', 'strk')).toThrow("'.' is not a valid strk amount");
    expect(() => units('-', 'strk')).toThrow("'-' is not a valid strk amount");
    expect(() => units('0x', 'strk')).toThrow("Invalid input: '0x' holds no hexadecimal digit");
  });

  test('refuses a strk amount given as a number', () => {
    // TypeScript forbids it, but plain JavaScript can pass a number: it used to give 0 fri
    expect(() => units(1.5 as unknown as string, 'strk')).toThrow(
      'the strk amount must be a string or a bigint, not number'
    );
  });

  test('accepts negative fri amounts', () => {
    expect(units(-1n, 'fri')).toEqual('-0.000000000000000001');
    expect(units('-1', 'fri')).toEqual('-0.000000000000000001');
    expect(units(-(10n ** 17n), 'fri')).toEqual('-0.1');
    expect(units(-15n * 10n ** 17n, 'fri')).toEqual('-1.5');
  });

  test('keeps negative amounts through a round trip', () => {
    expect(units(units('-0.000000000000000001', 'strk'), 'fri')).toEqual('-0.000000000000000001');
    expect(units(units(-340n, 'fri'), 'strk')).toEqual('-340');
  });

  test('refuses an empty fri amount', () => {
    // BigInt('') is 0n: without this check, '' would become '0' strk
    expect(() => units('', 'fri')).toThrow('the fri amount is an empty string');
    expect(() => units(' ', 'fri')).toThrow('the fri amount is an empty string');
    expect(() => units('0x', 'fri')).toThrow("Invalid input: '0x' holds no hexadecimal digit");
  });
});

describe('parseUnits', () => {
  test('converts a decimal amount into the smallest unit of the token', () => {
    expect(parseUnits('1.5', 6)).toEqual(1500000n);
    expect(parseUnits('-1.5', 6)).toEqual(-1500000n);
    expect(parseUnits('.5', 6)).toEqual(500000n);
    expect(parseUnits('1.', 6)).toEqual(1000000n);
  });

  test('gives the same result as units() with 18 decimals', () => {
    expect(parseUnits('0.123456789012345678', 18)).toEqual(123456789012345678n);
    expect(units('0.123456789012345678', 'strk')).toEqual('123456789012345678');
  });

  test('accepts a token with no decimals', () => {
    expect(parseUnits('7', 0)).toEqual(7n);
    expect(parseUnits('7.0', 0)).toEqual(7n);
    expect(parseUnits('.0', 0)).toEqual(0n);
  });

  test('accepts zeros after the last decimal', () => {
    expect(parseUnits('1.1200', 3)).toEqual(1120n);
  });

  test('gives 0 for minus zero', () => {
    expect(parseUnits('-0', 6)).toEqual(0n);
  });

  test('refuses an amount with too many decimals', () => {
    expect(() => parseUnits('1.1234567', 6)).toThrow("'1.1234567' has more than 6 decimals");
    expect(() => parseUnits('1.55', 1)).toThrow("'1.55' has more than 1 decimal");
    expect(() => parseUnits('7.1', 0)).toThrow("'7.1' has more than 0 decimals");
  });

  test('refuses a text that is not a decimal amount', () => {
    expect(() => parseUnits('1,5', 6)).toThrow("'1,5' is not a valid amount");
    expect(() => parseUnits('', 6)).toThrow("'' is not a valid amount");
  });

  test('refuses a hex text', () => {
    // a hex text returned by a node is already in the smallest unit of the token
    expect(() => parseUnits('0x10', 6)).toThrow("'0x10' is not a valid amount");
  });

  test('refuses a value that is not a string', () => {
    // TypeScript forbids it, but plain JavaScript can pass a bigint read on-chain
    expect(() => parseUnits(1500000n as unknown as string, 6)).toThrow(
      'the amount must be a string, not bigint'
    );
  });

  test('writes the token name in the error messages', () => {
    expect(() => parseUnits('1,5', 6, 'USDC')).toThrow("'1,5' is not a valid USDC amount");
    expect(() => parseUnits('1.1234567', 6, 'USDC')).toThrow(
      "'1.1234567' USDC has more than 6 decimals"
    );
    expect(() => parseUnits(1.5 as unknown as string, 6, 'USDC')).toThrow(
      'the USDC amount must be a string, not number'
    );
  });

  test('accepts decimals given as a bigint or a hex text', () => {
    // a contract call returns a bigint, a node returns a hex text
    expect(parseUnits('1', 6n)).toEqual(1000000n);
    expect(parseUnits('1', '0x6')).toEqual(1000000n);
  });

  test('accepts up to 255 decimals', () => {
    expect(parseUnits('1', 255)).toEqual(10n ** 255n);
  });

  test('refuses decimals outside 0 to 255', () => {
    expect(() => parseUnits('1', 256)).toThrow('Value is out of decimals range [0, 255]');
    expect(() => parseUnits('1', -1)).toThrow('Value is out of decimals range [0, 255]');
  });

  test('refuses decimals that are not an integer', () => {
    expect(() => parseUnits('1', 6.5)).toThrow('decimals must be an integer, not 6.5');
    expect(() => parseUnits('1', '6.0')).toThrow("decimals must be an integer, not '6.0'");
    expect(() => parseUnits('1', NaN)).toThrow('decimals must be an integer, not NaN');
  });

  test('refuses empty decimals', () => {
    // BigInt('') is 0n: without this check, '' would become 0 decimals
    expect(() => parseUnits('1', '')).toThrow("decimals must be an integer, not ''");
  });

  test('refuses decimals that are not a number, a bigint or a string', () => {
    // TypeScript forbids it, but plain JavaScript can pass true, which BigInt reads as 1
    expect(() => parseUnits('1', true as unknown as number)).toThrow(
      'decimals must be an integer, not true'
    );
    expect(() => parseUnits('1', undefined as unknown as number)).toThrow(
      'decimals must be an integer, not undefined'
    );
  });

  test('refuses an empty token name', () => {
    expect(() => parseUnits('1', 6, '')).toThrow('the token name is an empty string');
    expect(() => parseUnits('1', 6, ' ')).toThrow('the token name is an empty string');
  });

  test('refuses a token name that is not a string', () => {
    expect(() => parseUnits('1', 6, 5 as unknown as string)).toThrow(
      'the token name must be a string, not number'
    );
  });
});

describe('formatUnits', () => {
  test('writes an amount in the smallest unit as a decimal amount', () => {
    expect(formatUnits(1500000n, 6)).toEqual('1.5');
    expect(formatUnits(1n, 6)).toEqual('0.000001');
    expect(formatUnits(-1500000n, 6)).toEqual('-1.5');
  });

  test('writes no zero at the end, and no dot without decimals', () => {
    expect(formatUnits(1000000n, 6)).toEqual('1');
    expect(formatUnits(0n, 6)).toEqual('0');
    expect(formatUnits(7n, 0)).toEqual('7');
  });

  test('reads a hex text, a decimal text or a number', () => {
    // a node returns a hex text
    expect(formatUnits('0x2710', 6)).toEqual('0.01');
    expect(formatUnits('1500000', 6)).toEqual('1.5');
    expect(formatUnits(1500000, 6)).toEqual('1.5');
  });

  test('refuses an empty amount', () => {
    // BigInt('') is 0n: without this check, '' would become '0'
    expect(() => formatUnits('', 6)).toThrow('the amount is an empty string');
    expect(() => formatUnits('', 6, 'USDC')).toThrow('the USDC amount is an empty string');
  });

  test('refuses a decimal amount', () => {
    // '1.5' is a decimal amount: parseUnits reads it
    expect(() => formatUnits('1.5', 6)).toThrow('Cannot convert 1.5 to a BigInt');
  });

  test('refuses a value that is not a number, a bigint or a string', () => {
    // TypeScript forbids it, but plain JavaScript can pass true, which BigInt reads as 1
    expect(() => formatUnits(true as unknown as bigint, 6)).toThrow(
      'the amount must be a number, a bigint or a string, not boolean'
    );
  });

  test('refuses decimals outside 0 to 255', () => {
    expect(() => formatUnits(1n, 256)).toThrow('Value is out of decimals range [0, 255]');
  });

  test('refuses an empty token name', () => {
    expect(() => formatUnits(1n, 6, '')).toThrow('the token name is an empty string');
  });

  test('keeps an amount through a round trip with parseUnits', () => {
    expect(parseUnits(formatUnits(-1234567n, 6), 6)).toEqual(-1234567n);
    expect(formatUnits(parseUnits('0.000001', 6), 6)).toEqual('0.000001');
  });
});
