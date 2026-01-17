#!/bin/bash
# Script to fix paths for GitHub Pages deployment

# Build the project
npm run build

# Define the subdirectory name
SUBDIR="todo-full-stack-web-application-with-neon-db"

# Create the subdirectory in the out folder
mkdir -p out/$SUBDIR

# Move all content except _next into the subdirectory
for item in out/*; do
  if [[ "$(basename "$item")" != "_next" ]]; then
    mv "$item" "out/$SUBDIR/"
  fi
done

# Update the base href in the HTML files to include the subdirectory
find out/$SUBDIR -name "*.html" -exec sed -i "s|href=\"/|href=\"/$SUBDIR/|g" {} \;
find out/$SUBDIR -name "*.html" -exec sed -i "s|src=\"/|src=\"/$SUBDIR/|g" {} \;

echo "Paths fixed for GitHub Pages deployment in subdirectory: $SUBDIR"