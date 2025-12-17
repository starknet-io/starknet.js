import { CairoAssembly, CompiledSierra } from '../types/lib/contract/index';

export interface LoadedContract {
  sierra: CompiledSierra;
  casm?: CairoAssembly;
  compiler?: string;
}

/**
 * Browser stub for contractLoader.
 * This function is not available in browser environments.
 * Use it only in Node.js environments (server-side or build scripts).
 */
export function contractLoader(_contractPath: string): LoadedContract {
  throw new Error(
    'contractLoader is only available in Node.js environment. ' +
      'This function requires filesystem access and cannot be used in browsers. ' +
      'Load your contracts using other methods (e.g., import, fetch) in browser environments.'
  );
}
