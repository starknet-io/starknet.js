import { BigNumberish } from '../types';
import { computePedersenHash } from './hash';

export class MerkleTree {
  public leaves: string[];

  public branches: string[][] = [];

  public root: string;

  public hashMethod: (a: BigNumberish, b: BigNumberish) => string;

  constructor(
    leafHashes: string[],
    hashMethod: (a: BigNumberish, b: BigNumberish) => string = computePedersenHash
  ) {
    this.hashMethod = hashMethod;
    this.leaves = leafHashes;
    this.root = this.build(leafHashes);
  }

  /**
   * Create Merkle tree
   * @param leaves hex-string array
   * @returns format: hex-string; Merkle tree root
   * @example
   * ```typescript
   * const leaves: string[] = [
   * "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914",
   * "0x1234567890123456789012345678901234567890123456789012345678901234",
   * "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
   * ];
   * const merkleTree = new MerkleTree();
   * const root = merkleTree.build(leaves);
   * // root = "0x71d6f4b2f7a5aa46daa76f2e01ab44b0e7581a82b40cb1289b89b2353fc1b9e0"
   * ```
   */
  private build(leaves: string[]): string {
    if (leaves.length === 1) {
      return leaves[0];
    }
    if (leaves.length !== this.leaves.length) {
      this.branches.push(leaves);
    }
    const newLeaves: string[] = [];
    for (let i = 0; i < leaves.length; i += 2) {
      if (i + 1 === leaves.length) {
        newLeaves.push(MerkleTree.hash(leaves[i], '0x0', this.hashMethod));
      } else {
        newLeaves.push(MerkleTree.hash(leaves[i], leaves[i + 1], this.hashMethod));
      }
    }
    return this.build(newLeaves);
  }

  /**
   * Create hash from ordered a and b, Pedersen hash default
   * @param a BigNumberish value to be hashed
   * @param b BigNumberish value to be hashed
   * @param hashMethod Function to compute hash, default is Pedersen hash
   * @returns format: hex-string
   * @example
   * ```typescript
   * const hash = MerkleTree.hash(
   * "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914",
   * "0x1234567890123456789012345678901234567890123456789012345678901234",
   * );
   * // hash = "0x71d6f4b2f7a5aa46daa76f2e01ab44b0e7581a82b40cb1289b89b2353fc1b9e0"
   * ```
   */
  static hash(
    a: BigNumberish,
    b: BigNumberish,
    hashMethod: (a: BigNumberish, b: BigNumberish) => string = computePedersenHash
  ) {
    const [aSorted, bSorted] = [BigInt(a), BigInt(b)].sort((x, y) => (x >= y ? 1 : -1));
    return hashMethod(aSorted, bSorted);
  }

  /**
   * Return path to leaf
   * @param leaf hex-string representing the leaf
   * @param branch hex-string array representing the branch
   * @param hashPath hex-string array representing the hash path
   * @returns format: hex-string array representing the path to the leaf
   * @example
   * ```typescript
   * const merkleTree = new MerkleTree();
   * const proof = merkleTree.getProof("0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914");
   * // proof = [
   * // "0x1234567890123456789012345678901234567890123456789012345678901234",
   * // "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
   * // ]
   * ```
   */
  public getProof(leaf: string, branch = this.leaves, hashPath: string[] = []): string[] {
    const index = branch.indexOf(leaf);
    if (index === -1) {
      throw new Error('leaf not found');
    }
    if (branch.length === 1) {
      return hashPath;
    }
    const isLeft = index % 2 === 0;
    const neededBranch = (isLeft ? branch[index + 1] : branch[index - 1]) ?? '0x0';
    const newHashPath = [...hashPath, neededBranch];
    const currentBranchLevelIndex =
      this.leaves.length === branch.length
        ? -1
        : this.branches.findIndex((b) => b.length === branch.length);
    const nextBranch = this.branches[currentBranchLevelIndex + 1] ?? [this.root];
    return this.getProof(
      MerkleTree.hash(isLeft ? leaf : neededBranch, isLeft ? neededBranch : leaf, this.hashMethod),
      nextBranch,
      newHashPath
    );
  }
}

/**
 * Test Merkle tree path
 * @param root hex-string
 * @param leaf hex-string
 * @param path hex-string array
 * @param hashMethod hash method override, Pedersen default
 * @returns {boolean} True if the Merkle tree path is valid, false otherwise
 * @example
 * ```typescript
 * const root = "0x71d6f4b2f7a5aa46daa76f2e01ab44b0e7581a82b40cb1289b89b2353fc1b9e0";
 * const leaf = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const path = [
 * 	"0x1234567890123456789012345678901234567890123456789012345678901234",
 * 	"0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
 * ];
 * const isValid = proofMerklePath(root, leaf, path);
 * // isValid = true
 * ```
 */
export function proofMerklePath(
  root: string,
  leaf: string,
  path: string[],
  hashMethod: (a: BigNumberish, b: BigNumberish) => string = computePedersenHash
): boolean {
  if (path.length === 0) {
    return root === leaf;
  }
  const [next, ...rest] = path;
  return proofMerklePath(root, MerkleTree.hash(leaf, next, hashMethod), rest, hashMethod);
}
