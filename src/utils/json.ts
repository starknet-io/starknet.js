import Json from 'json-bigint';

const { parse, stringify } = Json({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
  protoAction: 'preserve',
  constructorAction: 'preserve',
});

export { parse, stringify };
export default { parse, stringify };
