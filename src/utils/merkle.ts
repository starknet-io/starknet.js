import { BigNumberish } from '../types';
import { computePedersenHash } from './hash';

export class MerkleTree {
  public leaves: string[];

  public branches: string[][] = [];

  public root: string;

  public hashMethod: (a: BigNumberish, b: BigNumberish) => string;

  /**
   * Create a Merkle tree
   *
   * @param leafHashes hex-string array
   * @param hashMethod hash method to use, default: Pedersen
   * @returns created Merkle tree
   * @example
   * ```typescript
   * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
   * const tree = new MerkleTree(leaves);
   * // tree = {
   * //   branches: [['0x5bb9440e2...', '0x262697b88...', ...], ['0x38118a340...', ...], ...],
   * //   leaves: ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'],
   * //   root: '0x7f748c75e5bdb7ae28013f076b8ab650c4e01d3530c6e5ab665f9f1accbe7d4',
   * //   hashMethod: [Function computePedersenHash],
   * // }
   * ```
   */
  constructor(
    leafHashes: string[],
    hashMethod: (a: BigNumberish, b: BigNumberish) => string = computePedersenHash
  ) {
    this.hashMethod = hashMethod;
    this.leaves = leafHashes;
    this.root = this.build(leafHashes);
  }

  /** @ignore */
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
   * Calculate hash from ordered a and b, Pedersen hash default
   *
   * @param a first value
   * @param b second value
   * @param hashMethod hash method to use, default: Pedersen
   * @returns result of the hash function
   * @example
   * ```typescript
   * const result1 = MerkleTree.hash('0xabc', '0xdef');
   * // result1 = '0x484f029da7914ada038b1adf67fc83632364a3ebc2cd9349b41ab61626d9e82'
   *
   * const customHashMethod = (a, b) => `custom_${a}_${b}`;
   * const result2 = MerkleTree.hash('0xabc', '0xdef', customHashMethod);
   * // result2 = 'custom_2748_3567'
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
   * Calculates the merkle membership proof path
   *
   * @param leaf hex-string
   * @param branch hex-string array
   * @param hashPath hex-string array
   * @returns collection of merkle proof hex-string hashes
   * @example
   * ```typescript
   * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
   * const tree = new MerkleTree(leaves);
   * const result = tree.getProof('0x3');
   * // result = [
   * //   '0x4',
   * //   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
   * //   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
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
 * Tests a Merkle tree path
 *
 * @param root hex-string
 * @param leaf hex-string
 * @param path hex-string array
 * @param hashMethod hash method to use, default: Pedersen
 * @returns true if the path is valid, false otherwise
 * @example
 * ```typescript
 * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
 * const tree = new MerkleTree(leaves);
 * const result = proofMerklePath(tree.root, '0x3', [
 *   '0x4',
 *   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
 *   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
 * ]);
 * // result = true
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
