/* eslint-disable max-classes-per-file */
import { Mixin } from 'ts-mixer';

import { RpcProvider as BaseRpcProvider } from '../rpc';
import { StarknetId } from './starknetId';

export class RpcProvider extends Mixin(BaseRpcProvider, StarknetId) {}
