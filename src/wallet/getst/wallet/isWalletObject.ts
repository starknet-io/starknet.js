/* eslint-disable no-empty */
export const isWalletObj = (wallet: any): boolean => {
  try {
    return (
      wallet &&
      [
        // wallet's must have methods/members, see IStarknetWindowObject
        'request',
        'on',
        'off',
        'version',
        'id',
        'name',
        'icon',
      ].every((key) => key in wallet)
    );
  } catch (err) {}
  return false;
};
