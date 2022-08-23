import type { AccountInterface } from '../account';
import { ProviderInterface } from '../provider';
import { Signature } from '../types';
import { computeHashOnElements } from './hash';
import { MerkleTree } from './merkle';
import { toBN } from './number';
import { compileCalldata } from './stark';
import { prepareSelector } from './typedData';

interface Policy {
  contractAddress: string;
  selector: string;
}

export interface RequestSession {
  key: string;
  expires: number;
  policies: Policy[];
}

export interface PreparedSession extends RequestSession {
  root: string;
}

export interface SignedSession extends PreparedSession {
  signature: Signature;
}

export const SESSION_PLUGIN_CLASS_HASH =
  '0x31c70ed28f4b0faf39b2f97d8f0a61a36968319c13fe6f2051b8de5a15f3d9b';

// H(Policy(contractAddress:felt,selector:selector))
const POLICY_TYPE_HASH = '0x2f0026e78543f036f33e26a8f5891b88c58dc1e20cbbfaf0bb53274da6fa568';

export async function supportsSessions(
  address: string,
  provider: ProviderInterface
): Promise<boolean> {
  const { result } = await provider.callContract({
    contractAddress: address,
    entrypoint: 'is_plugin',
    calldata: compileCalldata({ classHash: SESSION_PLUGIN_CLASS_HASH }),
  });
  return !toBN(result[0]).isZero();
}

export function preparePolicy({ contractAddress, selector }: Policy): string {
  return computeHashOnElements([POLICY_TYPE_HASH, contractAddress, prepareSelector(selector)]);
}

export function createMerkleTreeForPolicies(policies: Policy[]): MerkleTree {
  return new MerkleTree(policies.map(preparePolicy));
}

export function prepareSession(session: RequestSession): PreparedSession {
  const { root } = createMerkleTreeForPolicies(session.policies);
  return { ...session, root };
}

export async function createSession(
  session: RequestSession,
  account: AccountInterface
): Promise<SignedSession> {
  const { expires, key, policies, root } = prepareSession(session);
  const signature = await account.signMessage({
    primaryType: 'Session',
    types: {
      Policy: [
        { name: 'contractAddress', type: 'felt' },
        { name: 'selector', type: 'selector' },
      ],
      Session: [
        { name: 'key', type: 'felt' },
        { name: 'expires', type: 'felt' },
        { name: 'root', type: 'merkletree', contains: 'Policy' },
      ],
      StarkNetDomain: [{ name: 'chainId', type: 'felt' }],
    },
    domain: {
      chainId: account.chainId,
    },
    message: {
      key,
      expires,
      root: session.policies,
    },
  });
  return {
    key,
    policies,
    expires,
    root,
    signature,
  };
}
