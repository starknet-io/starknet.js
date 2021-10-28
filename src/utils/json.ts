import Json from 'json-bigint';

const { parse, stringify } = Json({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
});

export { parse, stringify };
export default { parse, stringify };
