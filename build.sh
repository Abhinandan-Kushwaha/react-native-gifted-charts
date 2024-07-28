#!/bin/bash

# Source and destination directories
SRC_DIR="./src"
DST_DIR="./dist"

# Create the destination directory if it doesn't exist
mkdir -p "$DST_DIR"

# Find and move all .js and .d.ts files while preserving the directory structure
find "$SRC_DIR" -type f \( -name '*.js' -o -name '*.d.ts' \) | while read -r file; do
    # Get the relative path of the file
    rel_path="${file#$SRC_DIR/}"
    # Get the directory of the file
    file_dir=$(dirname "$rel_path")
    # Create the directory in the destination if it doesn't exist
    mkdir -p "$DST_DIR/$file_dir"
    # Move the file to the destination
    mv "$file" "$DST_DIR/$rel_path"
    echo "Moved $file to $DST_DIR/$rel_path"
done
