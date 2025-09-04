import type { Calldata, RawArgs } from '../../types/lib';

/**
 * Extract compiled calldata from args or execute callback
 */
export function getCompiledCalldata(constructorArguments: RawArgs, callback: Function): Calldata {
  // Check if Calldata in args or args[0] else compile
  if (Array.isArray(constructorArguments) && '__compiled__' in constructorArguments)
    return constructorArguments as Calldata;
  if (
    Array.isArray(constructorArguments) &&
    Array.isArray(constructorArguments[0]) &&
    '__compiled__' in constructorArguments[0]
  )
    return constructorArguments[0] as Calldata;
  return callback();
}
