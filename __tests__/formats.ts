// Jest JSON schema

export const formats = {
  bcp47: /^[a-z]{2}-[A-Z]{2}$/,
  bigint: /^[1-9][0-9]*n$/,
};

export const schema = {
  $id: 'EstimateFee',
  type: 'object',
  properties: {
    overall_fee: {
      isBigInt: true,
    },
    suggestedMaxFee: {
      isBigInt: true,
    },
    gas_consumed: {
      isBigInt: true,
    },
    gas_price: {
      isBigInt: true,
    },
  },
  required: ['overall_fee', 'suggestedMaxFee'],
};
