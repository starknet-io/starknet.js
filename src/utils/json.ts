import Json from 'json-bigint';

const json = (alwaysParseAsBig: boolean) => {
  return Json({
    alwaysParseAsBig,
    useNativeBigInt: true,
    protoAction: 'preserve',
    constructorAction: 'preserve',
  });
};

export const { parse, stringify } = json(false);
export const { parse: parseAlwaysAsBig, stringify: stringifyAlwaysAsBig } = json(true);

export default { parse, stringify };
