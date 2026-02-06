// Correct ../index broken links
import { createReadStream, promises as fs } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { createInterface } from 'readline';

interface ReversedTreeNode {
  fileName: string;
  path: string;
}

let qtyCorrected = 0;

async function analyzeFile(
  file: ReversedTreeNode,
  reversedTree: ReversedTreeNode[],
  basePath: string
) {
  // scan only basePath (starknet) directory
  if (file.path.startsWith(basePath)) {
    const dirs = file.path.split('/');
    const needle = '../index.md';
    const toReplaceLength = needle.indexOf('.md') - (needle.indexOf('/') + 1);
    let contentResult = '';
    let isFileModified: boolean = false;
    const fileStream = createReadStream(file.path, { encoding: 'utf8' });

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (let line of rl) {
      // One non standard case :
      if (
        file.path == 'docs/API/starknet/namespaces/RPC/namespaces/API/API.md' &&
        line === 'Re-exports [CONTRACT](../CONTRACT/index.md)'
      ) {
        contentResult += 'Re-exports [CONTRACT](../CONTRACT/CONTRACT.md)' + '\n';
      } else if (line.includes(needle)) {
        const positions: number[] = [0];
        let pos = 0;
        while ((pos = line.indexOf(needle, pos)) !== -1) {
          positions.push(pos);
          pos += needle.length;
        }
        for (let i: number = positions.length - 2; i >= 0; i--) {
          let base: string = line.slice(positions[i], positions[i + 1]);
          let nbBack = 0;
          while (base.endsWith('../')) {
            nbBack++;
            base = base.slice(0, base.length - '../'.length);
          }
          const baseTarget = dirs.slice(0, dirs.length - nbBack - 2).join('/');
          const targetForIndex = baseTarget + '/index.md';
          const targetForName = baseTarget + '/' + dirs[dirs.length - nbBack - 3] + '.md';
          const fileIndexSet = new Set(reversedTree.map((item) => item.path));
          const isFoundWithIndex = fileIndexSet.has(targetForIndex);
          if (!isFoundWithIndex) {
            const isFoundWithName = fileIndexSet.has(targetForName);
            if (isFoundWithName) {
              isFileModified = true;
              qtyCorrected++;
              const t =
                line.slice(0, positions[i + 1] + 3) +
                dirs[dirs.length - nbBack - 3] +
                line.slice(positions[i + 1] + 3 + toReplaceLength);
              line = t;
            } else {
            }
          }
        }
        contentResult += line + '\n';
      } else {
        contentResult += line + '\n';
      }
    }
    fileStream.destroy();
    if (isFileModified) {
      await writeFile(file.path, contentResult);
    }
  }
}

async function createReversedTree(baseScan: string): Promise<ReversedTreeNode[]> {
  interface FileTreeNode {
    name: string;
    type: 'file' | 'directory';
    path: string;
    children?: FileTreeNode[];
  }

  async function getFileTreeTyped(dirPath: string): Promise<FileTreeNode[]> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const nodes: FileTreeNode[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const node: FileTreeNode = {
        name: entry.name,
        type: entry.isDirectory() ? 'directory' : 'file',
        path: fullPath,
      };
      if (entry.isDirectory()) {
        node.children = await getFileTreeTyped(fullPath);
      }
      nodes.push(node);
    }
    return nodes;
  }

  function extractReversedTree(nodes: FileTreeNode[]): ReversedTreeNode[] {
    const acc: ReversedTreeNode[] = [];
    let childAcc: ReversedTreeNode[] = [];
    nodes.forEach((node: FileTreeNode) => {
      if (node.type === 'directory' && node.children) {
        childAcc = extractReversedTree(node.children);
      } else {
        childAcc = [{ fileName: node.name, path: node.path }];
      }
      acc.push(...childAcc);
    });
    return acc;
  }

  const tree = await getFileTreeTyped(baseScan);
  return extractReversedTree(tree);
}

// Usage
async function main() {
  const baseScan = 'docs/API/';
  const baseCorrection = baseScan + 'starknet';
  const reversedTree = await createReversedTree(baseScan);

  for (const node of reversedTree) {
    await analyzeFile(node, reversedTree, baseCorrection);
  }
  console.log(qtyCorrected, 'links corrected');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
