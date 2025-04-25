import { SupportedRpcVersion } from '../../src/global/constants';
import { isVersion, toAnyPatchVersion, isSupportedSpecVersion } from '../../src/utils/provider';

describe('isVersion', () => {
  it('matches exact versions', () => {
    expect(isVersion('0.7.0', '0.7.0')).toBe(true);
    expect(isVersion('0.7', '0.7')).toBe(true);
    expect(isVersion('1.2.3', '1.2.3')).toBe(true);
    expect(isVersion('0.7', '0.8')).toBe(false);
    expect(isVersion('0.7.0', '0.7.1')).toBe(false);
    expect(isVersion('0.7.0', '0.8.0')).toBe(false);
    expect(isVersion('1.0.0', '2.0.0')).toBe(false);
  });

  it('handles wildcard in major version', () => {
    expect(isVersion('*.7.0', '0.7.0')).toBe(true);
    expect(isVersion('*.7.0', '1.7.0')).toBe(true);
    expect(isVersion('*.7.0', '2.7.0')).toBe(true);
    expect(isVersion('*.7.0', '0.8.0')).toBe(false);
  });

  it('handles wildcard in minor version', () => {
    expect(isVersion('0.*.0', '0.7.0')).toBe(true);
    expect(isVersion('0.*.0', '0.8.0')).toBe(true);
    expect(isVersion('0.*.0', '0.9.0')).toBe(true);
    expect(isVersion('0.*.0', '1.7.0')).toBe(false);
  });

  it('handles wildcard in patch version', () => {
    expect(isVersion('0.7.*', '0.7.0')).toBe(true);
    expect(isVersion('0.7.*', '0.7.1')).toBe(true);
    expect(isVersion('0.7', '0.7.1')).toBe(true);
    expect(isVersion('0.7.*', '0.7.2')).toBe(true);
    expect(isVersion('0.8.*', '0.8.1-rc2')).toBe(true);
    expect(isVersion('0.8.*', '0.8')).toBe(true);
    expect(isVersion('0.8', '0.8.1')).toBe(true);
    expect(isVersion('0.7.*', '0.8.1-rc3')).toBe(false);
    expect(isVersion('0.7.*', '0.8.0')).toBe(false);
    expect(isVersion('0.7', '0.8.1')).toBe(false);
  });

  it('handles multiple wildcards', () => {
    expect(isVersion('*.*.0', '0.7.0')).toBe(true);
    expect(isVersion('*.*.0', '1.8.0')).toBe(true);
    expect(isVersion('*.*.0', '0.7.1')).toBe(false);
    expect(isVersion('0.*.*', '0.7.0')).toBe(true);
    expect(isVersion('0.*.*', '0.8.1')).toBe(true);
    expect(isVersion('0.*.*', '1.7.0')).toBe(false);
    expect(isVersion('*.*.*', '0.7.0')).toBe(true);
    expect(isVersion('*.*.*', '1.8.2')).toBe(true);
    expect(isVersion('*.*.*', '2.3.4')).toBe(true);
    expect(isVersion('', '2.3.4')).toBe(false);
    expect(isVersion('*', '2.3.4')).toBe(true);
    expect(isVersion('*.3', '2.3.4')).toBe(true);
    expect(isVersion('*.2', '2.3.4')).toBe(false);
    expect(isVersion('*.3.5', '2.3.4')).toBe(false);
    expect(isVersion('*.3.4', '2.3.4')).toBe(true);
  });
});

describe('toAnyPatchVersion', () => {
  it('converts version strings to wildcard patch versions', () => {
    expect(toAnyPatchVersion('0.7.0')).toBe('0.7.*');
    expect(toAnyPatchVersion('1.2.3')).toBe('1.2.*');
    expect(toAnyPatchVersion('0.8')).toBe('0.8.*');
    expect(toAnyPatchVersion('2.0')).toBe('2.0.*');
  });

  it('handles invalid or empty version strings', () => {
    expect(toAnyPatchVersion('')).toBe('');
    expect(toAnyPatchVersion('invalid')).toBe('invalid');
    expect(toAnyPatchVersion('0')).toBe('0.*');
  });

  it('handles already wildcarded versions', () => {
    expect(toAnyPatchVersion('0.7.*')).toBe('0.7.*');
    expect(toAnyPatchVersion('1.*')).toBe('1.*');
    expect(toAnyPatchVersion('*')).toBe('*');
  });
});

describe('isSupportedSpecVersion', () => {
  it('returns true for supported spec versions', () => {
    expect(isSupportedSpecVersion('0.7')).toBe(true);
    expect(isSupportedSpecVersion('0.8')).toBe(true);
    expect(isSupportedSpecVersion('1.0')).toBe(true);
  });

  it('returns false for unsupported spec versions', () => {
    expect(isSupportedSpecVersion('0.6')).toBe(false);
    expect(isSupportedSpecVersion('2.0')).toBe(false);
    expect(isSupportedSpecVersion('')).toBe(false);
    expect(isSupportedSpecVersion('invalid')).toBe(false);
  });

  it('handles wildcard and partial versions', () => {
    expect(isSupportedSpecVersion('*')).toBe(false);
    expect(isSupportedSpecVersion('0.*')).toBe(false);
    expect(isSupportedSpecVersion('*.8')).toBe(false);
  });

  describe('isSupportedSpecVersion', () => {
    it('returns true for exact supported version', () => {
      expect(isSupportedSpecVersion(SupportedRpcVersion.v0_7_1)).toBe(true);
    });

    it('returns false for unsupported version', () => {
      expect(isSupportedSpecVersion('9.9.9')).toBe(false);
    });

    it('returns true for supported version with allowAnyPatchVersion=true', () => {
      expect(isSupportedSpecVersion('0.7.1', { allowAnyPatchVersion: true })).toBe(true);
    });

    it('returns false for supported version with allowAnyPatchVersion=false and mismatched patch', () => {
      expect(isSupportedSpecVersion('0.7.444', { allowAnyPatchVersion: false })).toBe(false);
    });

    it('returns true for supported version with wildcard in SupportedRpcVersion', () => {
      // Simulate a SupportedRpcVersion with a wildcard
      expect(isSupportedSpecVersion('0.7.123', { allowAnyPatchVersion: true })).toBe(true);
    });

    it('returns false for empty version', () => {
      expect(isSupportedSpecVersion('')).toBe(false);
    });

    it('returns false for malformed version', () => {
      expect(isSupportedSpecVersion('abc.def.ghi')).toBe(false);
    });

    it('returns true for supported version with allowAnyPatchVersion explicitly set to true', () => {
      expect(isSupportedSpecVersion('0.7.2', { allowAnyPatchVersion: true })).toBe(true);
    });

    it('returns false for supported version with allowAnyPatchVersion explicitly set to false', () => {
      expect(isSupportedSpecVersion('0.7.2', { allowAnyPatchVersion: false })).toBe(false);
    });

    it('returns true for supported version when options is omitted (defaults to false)', () => {
      expect(isSupportedSpecVersion('0.7.1')).toBe(true);
      expect(isSupportedSpecVersion('0.7.0')).toBe(false);
    });

    it('returns false for unsupported version regardless of options', () => {
      expect(isSupportedSpecVersion('1.2.3', { allowAnyPatchVersion: true })).toBe(false);
      expect(isSupportedSpecVersion('1.2.3', { allowAnyPatchVersion: false })).toBe(false);
    });
  });
});
