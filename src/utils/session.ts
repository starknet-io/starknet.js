import type { AccountInterface } from '../account';
import { Signature } from '../types';
import { pedersen } from './hash';
import { MerkleTree } from './merkle';
import { StarkNetDomain, prepareSelector } from './typedData';

interface Policy {
  contractAddress: string;
  selector: string;
}

interface BaseSession {
  key: string;
  expires: number;
}

export interface RequestSession extends BaseSession {
  policies: Policy[];
}

export interface PreparedSession extends BaseSession {
  root: string;
}

export interface SignedSession extends PreparedSession {
  signature: Signature;
}

function preparePolicy({ contractAddress, selector }: Policy): string {
  return pedersen([contractAddress, prepareSelector(selector)]);
}

export function prepareSession(session: RequestSession): PreparedSession {
  const { policies, ...rest } = session;
  const { root } = new MerkleTree(policies.map(preparePolicy));
  return { ...rest, root };
}

export async function createSession(
  session: RequestSession,
  account: AccountInterface,
  domain: StarkNetDomain = {}
): Promise<SignedSession> {
  const { key, expires, root } = prepareSession(session);
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
        { name: 'root', type: 'merkletree', contains: 'Policy*' },
      ],
      StarkNetDomain: [
        { name: 'name', type: 'felt' },
        { name: 'version', type: 'felt' },
        { name: 'chain_id', type: 'felt' },
      ],
    },
    domain,
    message: {
      key,
      expires,
      root: session.policies,
    },
  });
  return {
    key,
    expires,
    root,
    signature,
  };
}
