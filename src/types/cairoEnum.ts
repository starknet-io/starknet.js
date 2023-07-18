import { CairoCustomEnum, CairoOption, CairoResult } from '../utils/calldata/enum';

export type CairoEnum = CairoCustomEnum | CairoOption<Object> | CairoResult<Object, Object>;
