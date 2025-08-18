#!/bin/bash

# Run depcheck and get unused dependencies
unused=$(depcheck --json | jq -r '.dependencies[]')

if [ -z "$unused" ]; then
  echo "No unused dependencies found!"
  exit 0
fi

echo "Unused dependencies found:"
echo "$unused"

# Prompt user for confirmation
read -p "Do you want to remove all unused dependencies? (y/n): " confirm
if [[ $confirm != [yY] ]]; then
  echo "Aborted."
  exit 0
fi

# Uninstall all unused dependencies
npm uninstall $unused

echo "Unused dependencies removed!"
