#!/bin/bash
set -e

echo "=== Installing backend dependencies ==="
pip install -r backend/requirements.txt

echo "=== Installing Node.js and npm ==="
apt-get update && apt-get install -y nodejs npm

echo "=== Building frontend ==="
cd frontend
npm install --legacy-peer-deps
npm run build
ls -la dist/
cd ..

echo "=== Removing old static folder ==="
rm -rf backend/static

echo "=== Copying frontend build to backend ==="
cp -r frontend/dist backend/static
ls -la backend/static/

echo "=== Build complete! ==="
echo "Files in backend/static:"
ls -la backend/static/
