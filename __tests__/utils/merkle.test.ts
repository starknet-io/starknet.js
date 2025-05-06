import { BigNumberish } from '../../src';
import { computePedersenHash, computePoseidonHash } from '../../src/utils/hash';
import { MerkleTree, proofMerklePath } from '../../src/utils/merkle';

type RawHashMethod = (a: BigNumberish, b: BigNumberish) => string;

describe.each([
  {
    name: 'Pedersen',
    hashMethod: computePedersenHash,
    manualHashMethod: <RawHashMethod>((a, b) => MerkleTree.hash(a, b, computePedersenHash)),
  },
  {
    name: 'Poseidon',
    hashMethod: computePoseidonHash,
    manualHashMethod: <RawHashMethod>((a, b) => MerkleTree.hash(a, b, computePoseidonHash)),
  },
])('MerkleTree class with $name hash', ({ hashMethod, manualHashMethod }) => {
  describe('calculate hashes', () => {
    test(`should generate hash with sorted arguments`, async () => {
      let leaves = ['0x12', '0xa']; // 18, 10
      let merkleHash = MerkleTree.hash(leaves[0], leaves[1], hashMethod);
      let rawHash = manualHashMethod(leaves[1], leaves[0]);
      expect(merkleHash).toBe(rawHash);

      leaves = ['0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026', '0x3'];
      merkleHash = MerkleTree.hash(leaves[0], leaves[1], hashMethod);
      rawHash = manualHashMethod(leaves[1], leaves[0]);
      expect(merkleHash).toBe(rawHash);
    });
  });

  describe('generate roots', () => {
    test('should generate valid root for 1 elements', async () => {
      const leaves = ['0x1'];
      const tree = new MerkleTree(leaves);

      const manualMerkle = leaves[0];
      expect(tree.root).toBe(manualMerkle);
    });

    test('should generate valid root for 2 elements', async () => {
      const leaves = ['0x1', '0x2'];
      const tree = new MerkleTree(leaves, hashMethod);

      const manualMerkle = manualHashMethod(leaves[0], leaves[1]);
      expect(tree.root).toBe(manualMerkle);
    });

    test('should generate valid root for 4 elements', async () => {
      const leaves = ['0x1', '0x2', '0x3', '0x4'];
      const tree = new MerkleTree(leaves, hashMethod);

      const manualMerkle = manualHashMethod(
        manualHashMethod(leaves[0], leaves[1]),
        manualHashMethod(leaves[2], leaves[3])
      );
      expect(tree.root).toBe(manualMerkle);
    });

    test('should generate valid root for 6 elements', async () => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6'];
      const tree = new MerkleTree(leaves, hashMethod);

      const manualMerkle = manualHashMethod(
        manualHashMethod(
          manualHashMethod(leaves[0], leaves[1]),
          manualHashMethod(leaves[2], leaves[3])
        ),
        manualHashMethod(manualHashMethod(leaves[4], leaves[5]), '0x0')
      );
      expect(tree.root).toBe(manualMerkle);
    });

    test('should generate valid root for 7 elements', async () => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
      const tree = new MerkleTree(leaves, hashMethod);

      const manualMerkle = manualHashMethod(
        manualHashMethod(
          manualHashMethod(leaves[0], leaves[1]),
          manualHashMethod(leaves[2], leaves[3])
        ),
        manualHashMethod(manualHashMethod(leaves[4], leaves[5]), manualHashMethod(leaves[6], '0x0'))
      );
      expect(tree.root).toBe(manualMerkle);
    });
  });

  describe('generate proofs', () => {
    let tree: MerkleTree;

    beforeAll(() => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
      tree = new MerkleTree(leaves, hashMethod);
    });

    test('should return proof path for valid child', async () => {
      const proof = tree.getProof('0x3');
      const manualProof = [
        '0x4',
        manualHashMethod('0x1', '0x2'),
        manualHashMethod(manualHashMethod('0x5', '0x6'), manualHashMethod('0x7', '0x0')),
      ];
      expect(proof).toEqual(manualProof);
    });

    test('should return proof path for valid child', async () => {
      const proof = tree.getProof('0x7');
      const manualProof = [
        '0x0', // proofs should always be as long as the tree is deep
        manualHashMethod('0x5', '0x6'),
        manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
      ];
      expect(proof).toEqual(manualProof);
    });

    test('should return proof path for valid child', async () => {
      const proof = tree.getProof('0x5');
      const manualProof = [
        '0x6',
        manualHashMethod('0x7', '0x0'), // tree should be padded with 0x0 so that all proofs are equals in size
        manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
      ];
      expect(proof).toEqual(manualProof);
    });

    test('should throw for invalid child', () => {
      expect(() => tree.getProof('0x8')).toThrow('leaf not found');
    });
  });

  describe('verify proofs', () => {
    let tree: MerkleTree;

    beforeAll(() => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
      tree = new MerkleTree(leaves, hashMethod);
    });

    test('should return true for valid manual proof', async () => {
      const manualProof = [
        '0x0', // tree should be padded with 0x0 so that all proofs are equals in size
        manualHashMethod('0x5', '0x6'),
        manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
      ];
      const leaf = '0x7';
      const { root } = tree;
      expect(proofMerklePath(root, leaf, manualProof, hashMethod)).toBe(true);
    });

    test('should return true for valid manual proof', async () => {
      const manualProof = [
        '0x6',
        manualHashMethod('0x7', '0x0'), // tree should be padded with 0x0 so that all proofs are equals in size
        manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
      ];
      const leaf = '0x5';
      const { root } = tree;
      expect(proofMerklePath(root, leaf, manualProof, hashMethod)).toBe(true);
    });

    test('should return true for valid proof', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      expect(proofMerklePath(root, leaf, proof, hashMethod)).toBe(true);
    });

    test('should return false for invalid proof (root)', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const root = '0x4';
      expect(proofMerklePath(root, leaf, proof, hashMethod)).toBe(false);
    });

    test('should return false for invalid proof (proof[0])', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      proof[0] = '0x7';
      expect(proofMerklePath(root, leaf, proof, hashMethod)).toBe(false);
    });

    test('should return false for invalid proof (proof[1])', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      proof[1] = '0x4';
      expect(proofMerklePath(root, leaf, proof, hashMethod)).toBe(false);
    });

    test('should return false for invalid proof (proof[2])', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      proof[2] = '0x4';
      expect(proofMerklePath(root, leaf, proof, hashMethod)).toBe(false);
    });
  });

  describe('verify 2-deep tree with empty data on the right', () => {
    let tree: MerkleTree;

    beforeAll(() => {
      const leaves = ['0x1', '0x2', '0x3'];
      tree = new MerkleTree(leaves, hashMethod);
    });

    test('should return 1-length proof in a 2-length tree', async () => {
      const proof = tree.getProof('0x3');
      const manualProof = ['0x0', manualHashMethod('0x1', '0x2')];
      expect(proof).toEqual(manualProof);
    });

    test('should check the previous proof works fine', async () => {
      const manualMerkle = manualHashMethod(
        manualHashMethod('0x3', '0x0'),
        manualHashMethod('0x1', '0x2')
      );
      expect(tree.root).toBe(manualMerkle);
    });
  });

  describe('verify 3-deep tree with empty data on the right', () => {
    let tree: MerkleTree;

    beforeAll(() => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6'];
      tree = new MerkleTree(leaves, hashMethod);
    });

    test('should return 2-length proof with the 2nd place skipped', async () => {
      const proof = tree.getProof('0x5');
      const manualProof = [
        '0x6',
        '0x0',
        manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
      ];
      expect(proof).toEqual(manualProof);
    });

    test('should check the previous proof works fine', async () => {
      const manualMerkle = manualHashMethod(
        manualHashMethod(manualHashMethod('0x5', '0x6'), '0x0'),
        manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4'))
      );
      expect(tree.root).toBe(manualMerkle);
    });
  });

  describe('verify 4-deep tree with empty data on the right', () => {
    let tree: MerkleTree;

    beforeAll(() => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7', '0x8', '0x9'];
      tree = new MerkleTree(leaves, hashMethod);
    });

    test('should return 2-length proof with the 2nd place skipped', async () => {
      const proof = tree.getProof('0x9');
      const manualProof = [
        '0x0',
        '0x0',
        '0x0',
        manualHashMethod(
          manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
          manualHashMethod(manualHashMethod('0x5', '0x6'), manualHashMethod('0x7', '0x8'))
        ),
      ];
      expect(proof).toEqual(manualProof);
    });

    test('should check the previous proof works fine', async () => {
      const manualMerkle = manualHashMethod(
        manualHashMethod(manualHashMethod(manualHashMethod('0x9', '0x0'), '0x0'), '0x0'),
        manualHashMethod(
          manualHashMethod(manualHashMethod('0x1', '0x2'), manualHashMethod('0x3', '0x4')),
          manualHashMethod(manualHashMethod('0x5', '0x6'), manualHashMethod('0x7', '0x8'))
        )
      );
      expect(tree.root).toBe(manualMerkle);
    });
  });
});
