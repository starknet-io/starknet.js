export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};
