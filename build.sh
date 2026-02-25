#!/bin/bash
set -e

echo "Building backend dependencies..."
pip install -r backend/requirements.txt

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Copying frontend build to backend static folder..."
cp -r frontend/dist backend/static

echo "Build complete!"
