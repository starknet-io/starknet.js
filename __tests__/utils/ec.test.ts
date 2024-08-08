import { ec } from '../../src';

describe.only('ec full public key', () => {
  test('determine if value is a BigNumberish', () => {
    const privateKey1 = '0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535';
    expect(ec.getFullPublicKey(privateKey1)).toBe(
      '0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf'
    );
  });
});
