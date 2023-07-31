import { CairoCustomEnum, CairoOption, CairoResult } from '../utils/calldata/enum';

export type CairoEnum = CairoCustomEnum | CairoOption<any> | CairoResult<any, any>;
