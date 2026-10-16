import { constants, TypedDataRevision, type TypedData } from '../../../../src';

export const giftTypedData: TypedData = {
  domain: {
    name: 'Gift',
    chainId: constants.StarknetChainId.SN_SEPOLIA,
    version: '1',
    revision: TypedDataRevision.ACTIVE,
  },
  message: { date_start: 2345, gift_id: 101 },
  primaryType: 'Message',
  types: {
    StarknetDomain: [
      { name: 'name', type: 'shortstring' },
      { name: 'chainId', type: 'shortstring' },
      { name: 'version', type: 'shortstring' },
    ],
    Message: [
      { name: 'date_start', type: 'felt' },
      { name: 'gift_id', type: 'u128' },
    ],
  },
};
