import { LegacyUDC, UDC } from '../global/constants';
import { Deployer } from './default';

export * from './default';
export * from './interface';
export const defaultDeployer = new Deployer(UDC.ADDRESS, UDC.ENTRYPOINT);
export const legacyDeployer = new Deployer(LegacyUDC.ADDRESS, LegacyUDC.ENTRYPOINT);
