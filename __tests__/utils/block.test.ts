import { Block } from '../../src/utils/provider';

describe('new Block()', () => {
  test('decimal number 0 BlockIdentifier', () => {
    const block = new Block(0);
    expect(block.identifier).toMatchObject({ block_number: 0 });
    expect(block.queryIdentifier).toBe('blockNumber=0');
    expect(block.hash).toBe(null);
    expect(block.number).toBe(0);
    expect(block.tag).toBe(null);
  });

  test('decimal number 631581 BlockIdentifier', () => {
    const block1 = new Block(631581);
    expect(block1.identifier).toMatchObject({ block_number: 631581 });
    expect(block1.queryIdentifier).toBe('blockNumber=631581');
    expect(block1.hash).toBe(null);
    expect(block1.number).toBe(631581);
    expect(block1.tag).toBe(null);
  });

  test('non-decimal number -1 BlockIdentifier', () => {
    expect(() => {
      const block = new Block(-1);
      return block;
    }).toThrow(TypeError);
  });

  test('decimal string `0` BlockIdentifier', () => {
    const block = new Block('0');
    expect(block.identifier).toMatchObject({ block_number: 0 });
    expect(block.queryIdentifier).toBe('blockNumber=0');
    expect(block.hash).toBe(null);
    expect(block.number).toBe(0);
    expect(block.tag).toBe(null);
  });

  test('decimal string `631581` BlockIdentifier', () => {
    const block1 = new Block('631581');
    expect(block1.identifier).toMatchObject({ block_number: 631581 });
    expect(block1.queryIdentifier).toBe('blockNumber=631581');
    expect(block1.hash).toBe(null);
    expect(block1.number).toBe(631581);
    expect(block1.tag).toBe(null);
  });

  test('non-decimal string `-1` BlockIdentifier', () => {
    expect(() => {
      const block = new Block('-1');
      return block;
    }).toThrow(TypeError);
  });

  test('(Irregular support) hex string `0x0` BlockIdentifier.', () => {
    const block = new Block('0x0');
    expect(block.identifier).toMatchObject({ block_hash: '0x0' });
    expect(block.queryIdentifier).toBe('blockHash=0x0');
    expect(block.hash).toBe('0x0');
    expect(block.number).toBe(null);
    expect(block.tag).toBe(null);
  });

  test('hex string `0x2a70fb03fe363a2d6be843343a1d81ce6abeda1e9bd5cc6ad8fa9f45e30fdeb` BlockIdentifier', () => {
    const block = new Block('0x2a70fb03fe363a2d6be843343a1d81ce6abeda1e9bd5cc6ad8fa9f45e30fdeb');
    expect(block.identifier).toMatchObject({
      block_hash: '0x2a70fb03fe363a2d6be843343a1d81ce6abeda1e9bd5cc6ad8fa9f45e30fdeb',
    });
    expect(block.queryIdentifier).toBe(
      'blockHash=0x2a70fb03fe363a2d6be843343a1d81ce6abeda1e9bd5cc6ad8fa9f45e30fdeb'
    );
    expect(block.hash).toBe('0x2a70fb03fe363a2d6be843343a1d81ce6abeda1e9bd5cc6ad8fa9f45e30fdeb');
    expect(block.number).toBe(null);
    expect(block.tag).toBe(null);
  });

  test('BigInt 1100871802642964430494835386862140987097292376415056243504467124241116103854n BlockIdentifier', () => {
    const block = new Block(
      1100871802642964430494835386862140987097292376415056243504467124241116103854n
    );
    expect(block.identifier).toMatchObject({
      block_hash: '0x26f12449d649a5339d4891b312a381f23ebc1106792d169b42e6646e87304ae',
    });
    expect(block.queryIdentifier).toBe(
      'blockHash=0x26f12449d649a5339d4891b312a381f23ebc1106792d169b42e6646e87304ae'
    );
    expect(block.hash).toBe('0x26f12449d649a5339d4891b312a381f23ebc1106792d169b42e6646e87304ae');
    expect(block.number).toBe(null);
    expect(block.tag).toBe(null);
  });

  test('String BigInt `1100871802642964430494835386862140987097292376415056243504467124241116103854n` BlockIdentifier', () => {
    expect(() => {
      const block = new Block(
        '1100871802642964430494835386862140987097292376415056243504467124241116103854n'
      );
      return block;
    }).toThrow(TypeError);
  });

  test('string `pending` BlockIdentifier', () => {
    const block1 = new Block('pending');
    expect(block1.identifier).toBe('pending');
    expect(block1.queryIdentifier).toBe('blockNumber=pending');
    expect(block1.hash).toBe(null);
    expect(block1.number).toBe(null);
    expect(block1.tag).toBe('pending');
  });

  test('string `latest` BlockIdentifier', () => {
    const block1 = new Block('latest');
    expect(block1.identifier).toBe('latest');
    expect(block1.queryIdentifier).toBe('blockNumber=latest');
    expect(block1.hash).toBe(null);
    expect(block1.number).toBe(null);
    expect(block1.tag).toBe('latest');
  });

  test('False string `supernova` BlockIdentifier', () => {
    expect(() => {
      const block = new Block('supernova');
      return block;
    }).toThrow(TypeError);
  });

  test('null BlockIdentifier', () => {
    const block1 = new Block(null);
    expect(block1.identifier).toBe('pending');
    expect(block1.queryIdentifier).toBe('blockNumber=pending');
    expect(block1.hash).toBe(null);
    expect(block1.number).toBe(null);
    expect(block1.tag).toBe('pending');
  });
});
