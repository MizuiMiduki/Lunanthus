#!/bin/bash

REPO_URL="https://github.com/MizuiMiduki/Lunanthus.git"
REMOTE_NAME="lunanthus_origin"

WHITELIST=("lunanthus/spa/" "lunanthus/pwa/sw.js" "lunanthus/router.js")

if ! git remote | grep -q "$REMOTE_NAME"; then
    git remote add $REMOTE_NAME $REPO_URL
fi

git fetch $REMOTE_NAME

git config core.sparseCheckout true

echo "" > .git/info/sparse-checkout
for item in "${WHITELIST[@]}"; do
    echo "$item" >> .git/info/sparse-checkout
done

echo "Applying updates to: ${WHITELIST[*]}"
git checkout $REMOTE_NAME/main -- ${WHITELIST[@]}

git config core.sparseCheckout false
echo "*" > .git/info/sparse-checkout
git read-tree -mu HEAD

echo "Update complete!"
