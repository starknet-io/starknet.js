import { pedersen } from './hash';
import { toBN } from './number';

export class MerkleTree {
  public leaves: string[];

  public branches: string[][] = [];

  public root: string;

  constructor(leafHashes: string[]) {
    this.leaves = leafHashes;
    this.root = this.build(leafHashes);
  }

  private build(leaves: string[]): string {
    if (leaves.length === 1) {
      return leaves[0];
    }
    if (leaves.length !== this.leaves.length) {
      this.branches.push(leaves);
    }
    const newLeaves = [];
    for (let i = 0; i < leaves.length; i += 2) {
      if (i + 1 === leaves.length) {
        newLeaves.push(MerkleTree.hash(leaves[i], '0x0'));
      } else {
        newLeaves.push(MerkleTree.hash(leaves[i], leaves[i + 1]));
      }
    }
    return this.build(newLeaves);
  }

  static hash(a: string, b: string) {
    const [aSorted, bSorted] = [toBN(a), toBN(b)].sort((x: any, y: any) => (x.gte(y) ? 1 : -1));
    return pedersen([aSorted, bSorted]);
  }

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
      MerkleTree.hash(isLeft ? leaf : neededBranch, isLeft ? neededBranch : leaf),
      nextBranch,
      newHashPath
    );
  }
}

export function proofMerklePath(root: string, leaf: string, path: string[]): boolean {
  if (path.length === 0) {
    return root === leaf;
  }
  const [next, ...rest] = path;
  return proofMerklePath(root, MerkleTree.hash(leaf, next), rest);
}
