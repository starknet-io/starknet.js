# in starknet/namespaces, replace all index.md by directory name.md
BASE_DIR="docs/API/starknet/namespaces"

find "$BASE_DIR" -type f -name "index.md" -exec sh -c '
  for f; do
    d=$(dirname "$f")
    name=$(basename "$d")
    t="$d/$name.md"
    if [ -e "$t" ]; then
      echo "  ⚠️ already exists → $t"
    elif mv "$f" "$t"; then
      echo "  ✅ $(basename "$d")/index.md → $name.md"
    else
      echo "  ❌ error : $f"
    fi
  done
' sh {} +

# Correct broken links in API/index.md 
API_INDEX_FILE="docs/API/index.md"
sed -E -i 's|(\[[^]]+\]\([^)]*/)([^/]+)(/index\.md\))|\1\2/\2.md)|g' "$API_INDEX_FILE"