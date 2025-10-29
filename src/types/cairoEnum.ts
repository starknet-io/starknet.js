import type { CairoTypeCustomEnum } from '../utils/cairoDataTypes/cairoTypeCustomEnum';
import type { CairoTypeOption } from '../utils/cairoDataTypes/cairoTypeOption';
import type { CairoTypeResult } from '../utils/cairoDataTypes/cairoTypeResult';
import { CairoCustomEnum, CairoResult, CairoOption } from '../utils/calldata/enum';

export type CairoEnum = CairoCustomEnum | CairoOption<any> | CairoResult<any, any>;
export type CairoTypeEnum = CairoTypeCustomEnum | CairoTypeOption | CairoTypeResult;
