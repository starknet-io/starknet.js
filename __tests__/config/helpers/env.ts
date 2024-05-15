export const setIfNullish = (envName: string, value?: boolean) => {
  const stringifiedBooleanValue = value ? 'true' : 'false';
  process.env[envName] ??= stringifiedBooleanValue;
};
