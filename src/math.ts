import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import assert from 'assert';

type ECPoint = [BigNumber, BigNumber];

export const EC_ORDER = BigNumber.from(
  '3618502788666131213697322783095070105526743751716087489154079457884512865583'
);
export const ALPHA = BigNumber.from(1);
export const FIELD_PRIME = BigNumber.from(
  '3618502788666131213697322783095070105623107215331596699973092056135872020481'
);
export const EC_GEN: ECPoint = [
  BigNumber.from('0x1EF15C18599971B7BECED415A40F0C7DEACFD9B0D1819E03D723D8BC943CFCA'.toLowerCase()),
  BigNumber.from('0x5668060AA49730B7BE4801DF46EC62DE53ECD11ABE43A32873000C36E8DC1F'.toLowerCase()),
];

const floorDiv = (a: BigNumber, b: BigNumber): BigNumber => {
  return parseFixed(a.div(b).toString(), 0);
};

export const igcdex = (a: BigNumber, b: BigNumber): [BigNumber, BigNumber, BigNumber] => {
  if (a.eq(0) && b.eq(0)) return [BigNumber.from(0), BigNumber.from(1), BigNumber.from(0)];
  if (a.eq(0)) return [BigNumber.from(0), floorDiv(b, b.abs()), b.abs()];
  if (b.eq(0)) return [floorDiv(a, a.abs()), BigNumber.from(0), a.abs()];

  let mutA = a.abs();
  const xSign = a.lt(0) ? BigNumber.from(-1) : BigNumber.from(1);

  let mutB = b.abs();
  const ySign = b.lt(0) ? BigNumber.from(-1) : BigNumber.from(1);

  let [x, y, r, s] = [BigNumber.from(1), BigNumber.from(0), BigNumber.from(0), BigNumber.from(1)];
  while (!mutB.eq(0)) {
    const [c, q] = [mutA.mod(mutB), floorDiv(mutA, mutB)];
    [mutA, mutB, r, s, x, y] = [mutB, c, x.sub(q.mul(r)), y.sub(q.mul(s)), r, s];
  }

  return [x.mul(xSign), y.mul(ySign), mutA];
};

export const divMod = (n: BigNumber, m: BigNumber, p: BigNumber): BigNumber => {
  const [a, , c] = igcdex(m, p);
  assert(c.toHexString() === BigNumber.from(1).toHexString());
  return n.mul(a).mod(p);
};

export const ecAdd = (point1: ECPoint, point2: ECPoint, p: BigNumber): ECPoint => {
  assert(!point1[0].sub(point2[0]).mod(p).eq(0));
  const m = divMod(point1[1].sub(point2[1]), point1[0].sub(point2[0]), p);
  const x = m.mul(m).sub(point1[0]).sub(point2[0]).mod(p);
  const y = m.mul(point1[0].sub(x)).sub(point1[1]).mod(p);
  return [x, y];
};

export const ecDouble = (point: ECPoint, alpha: BigNumber, p: BigNumber): ECPoint => {
  assert(!point[1].mod(p).eq(0));
  const m = divMod(
    BigNumber.from(3).mul(point[0]).mul(point[0]).add(alpha),
    BigNumber.from(2).mul(point[1]),
    p
  );
  const x = m.mul(m).sub(point[0].mul(2)).mod(p);
  const y = m.mul(point[0].sub(x)).sub(point[1]).mod(p);

  return [x, y];
};

export const ecMult = (m: BigNumber, point: ECPoint, alpha: BigNumber, p: BigNumber): ECPoint => {
  if (m.eq(1)) return point;
  if (m.mod(2).eq(0))
    return ecMult(floorDiv(m, BigNumber.from(2)), ecDouble(point, alpha, p), alpha, p);
  return ecAdd(ecMult(m.sub(1), point, alpha, p), point, p);
};

export const privateKeyToEcPointOnStarkCurve = (pk: BigNumber): ECPoint => {
  assert(pk.gt(0) && pk.lt(EC_ORDER));
  return ecMult(pk, EC_GEN, ALPHA, FIELD_PRIME);
};

export const privateToStarkKey = (pk: string): string => {
  const pkBn = BigNumber.from(pk);
  return privateKeyToEcPointOnStarkCurve(pkBn)[0].toHexString();
};
