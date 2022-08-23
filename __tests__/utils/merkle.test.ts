import { MerkleTree, proofMerklePath } from '../../src/utils/merkle';

describe('MerkleTree class', () => {
  describe('generate roots', () => {
    test('should generate valid root for 1 elements', async () => {
      const leaves = ['0x1'];
      const tree = new MerkleTree(leaves);

      const manualMerkle = leaves[0];

      expect(tree.root).toBe(manualMerkle);
    });
    test('should generate valid root for 2 elements', async () => {
      const leaves = ['0x1', '0x2'];
      const tree = new MerkleTree(leaves);

      const manualMerkle = MerkleTree.hash(leaves[0], leaves[1]);

      expect(tree.root).toBe(manualMerkle);
    });
    test('should generate valid root for 4 elements', async () => {
      const leaves = ['0x1', '0x2', '0x3', '0x4'];
      const tree = new MerkleTree(leaves);

      const manualMerkle = MerkleTree.hash(
        MerkleTree.hash(leaves[0], leaves[1]),
        MerkleTree.hash(leaves[2], leaves[3])
      );

      expect(tree.root).toBe(manualMerkle);
    });
    test('should generate valid root for 6 elements', async () => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6'];
      const tree = new MerkleTree(leaves);

      const manualMerkle = MerkleTree.hash(
        MerkleTree.hash(
          MerkleTree.hash(leaves[0], leaves[1]),
          MerkleTree.hash(leaves[2], leaves[3])
        ),
        MerkleTree.hash(leaves[4], leaves[5])
      );

      expect(tree.root).toBe(manualMerkle);
    });
    test('should generate valid root for 7 elements', async () => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
      const tree = new MerkleTree(leaves);

      const manualMerkle = MerkleTree.hash(
        MerkleTree.hash(
          MerkleTree.hash(leaves[0], leaves[1]),
          MerkleTree.hash(leaves[2], leaves[3])
        ),
        MerkleTree.hash(MerkleTree.hash(leaves[4], leaves[5]), leaves[6])
      );

      expect(tree.root).toBe(manualMerkle);
    });
  });
  describe('generate proofs', () => {
    let tree: MerkleTree;
    beforeAll(() => {
      const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
      tree = new MerkleTree(leaves);
    });
    test('should return proof path for valid child', async () => {
      const proof = tree.getProof('0x3');

      const manualProof = [
        '0x4',
        MerkleTree.hash('0x1', '0x2'),
        MerkleTree.hash(MerkleTree.hash('0x5', '0x6'), '0x7'),
      ];

      expect(proof).toEqual(manualProof);
    });
    test('should return proof path for valid child', async () => {
      const proof = tree.getProof('0x7');

      const manualProof = [
        '0x0', // proofs should always be as long as the tree is deep
        MerkleTree.hash('0x5', '0x6'),
        MerkleTree.hash(MerkleTree.hash('0x1', '0x2'), MerkleTree.hash('0x3', '0x4')),
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
      tree = new MerkleTree(leaves);
    });

    test('should return true for valid manual proof', async () => {
      const manualProof = [
        MerkleTree.hash('0x5', '0x6'),
        MerkleTree.hash(MerkleTree.hash('0x1', '0x2'), MerkleTree.hash('0x3', '0x4')),
      ];
      const leaf = '0x7';
      const { root } = tree;

      expect(proofMerklePath(root, leaf, manualProof)).toBe(true);
    });
    test('should return true for valid proof', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;

      expect(proofMerklePath(root, leaf, proof)).toBe(true);
    });
    test('should return false for invalid proof (root)', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const root = '0x4';

      expect(proofMerklePath(root, leaf, proof)).toBe(false);
    });
    test('should return false for invalid proof (proof[0])', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      proof[0] = '0x7';
      expect(proofMerklePath(root, leaf, proof)).toBe(false);
    });
    test('should return false for invalid proof (proof[1])', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      proof[1] = '0x4';
      expect(proofMerklePath(root, leaf, proof)).toBe(false);
    });
    test('should return false for invalid proof (proof[2])', async () => {
      const proof = tree.getProof('0x3');
      const leaf = '0x3';
      const { root } = tree;
      proof[2] = '0x4';
      expect(proofMerklePath(root, leaf, proof)).toBe(false);
    });
  });
});
