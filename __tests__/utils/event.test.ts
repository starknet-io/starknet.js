import { InvokeTransactionReceiptResponse } from '../../src';
import { UDC } from '../../src/constants';
import { parseUDCEvent } from '../../src/utils/events';

describe('parseUDCEvent tests', () => {
  const data = [
    'contractAddr',
    'deployerAddr',
    'unique',
    'hash',
    '0x4',
    '0x0',
    '0x0',
    '0x0',
    '0x0',
    'salt',
  ];

  const mockTxReceipt = {
    transaction_hash: 'transaction_hash',
    events: [
      {
        from_address: UDC.ADDRESS,
        data,
      },
    ],
  } as InvokeTransactionReceiptResponse;

  it('should parse UDC event and return the expected result', () => {
    const result = parseUDCEvent(mockTxReceipt);

    expect(result).toEqual({
      transaction_hash: 'transaction_hash',
      contract_address: 'contractAddr',
      address: 'contractAddr',
      deployer: 'deployerAddr',
      unique: 'unique',
      classHash: 'hash',
      calldata_len: '0x4',
      calldata: ['0x0', '0x0', '0x0', '0x0'],
      salt: 'salt',
    });
  });

  it('should throw an error if UDC emitted event is empty', () => {
    const emptyEventTxReceipt = {
      transaction_hash: '0xabcdef1234567890',
    } as InvokeTransactionReceiptResponse;
    expect(() => parseUDCEvent(emptyEventTxReceipt)).toThrowError('UDC emitted event is empty');
  });

  it('should have parse calldata with the data[4] length', () => {
    const result = parseUDCEvent(mockTxReceipt);
    const length = parseInt(data[4], 16);
    expect(result.calldata).toHaveLength(length);
  });
});
