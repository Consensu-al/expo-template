#!/bin/bash

# This script updates critical dependencies to compatible versions
# Run before building if you encounter version compatibility issues

echo "Updating critical dependencies..."

# Remove node modules if needed
if [ "$1" == "--clean" ]; then
  echo "Cleaning node_modules directory..."
  rm -rf node_modules
  rm -f bun.lock
fi

# Install/update dependencies
echo "Installing/updating dependencies..."
bun install

# Optional: Run prebuild to generate native files
if [ "$1" == "--prebuild" ] || [ "$2" == "--prebuild" ]; then
  echo "Running prebuild..."
  bun expo prebuild --clean
fi

echo "Done! The app is ready to be built."