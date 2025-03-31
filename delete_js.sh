#!/bin/bash

# Find all files with the .js extension and delete them.
find . -name "*.js" -type f -delete

echo "All .js files have been deleted."