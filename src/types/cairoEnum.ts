import type { CairoTypeOption } from '../utils/cairoDataTypes/cairoTypeOption';
import { CairoCustomEnum, CairoResult, type CairoOption } from '../utils/calldata/enum';

export type CairoEnum = CairoCustomEnum | CairoOption<any> | CairoResult<any, any>;
export type CairoTypeEnum = CairoCustomEnum | CairoTypeOption | CairoResult<any, any>;
