
# to display in sidebar the directory name (and not just INDEX)
source scripts/rename-namespace-indexes.sh
# Correct links in starknet/namespaces
ts-node scripts/correctionLinks.ts

cp scripts/_category_.json docs/API
cp ApiTitle.md docs/API/
cp scripts/.gitkeep docs/API/

