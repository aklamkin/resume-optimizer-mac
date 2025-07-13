#!/bin/bash

# Resume Optimizer Mac - Complete Build Script
# This script builds the entire application from source

set -e  # Exit on error

echo "🏗️  Resume Optimizer Mac - Complete Build"
echo "========================================"

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script requires macOS to build the Mac application"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "1. Checking prerequisites..."
if ! command_exists python3; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is required but not installed"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is required but not installed"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Build Backend
echo ""
echo "2. Building Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "   Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "   Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q pyinstaller
pip install -q emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/
pip install -q -r requirements.txt

# Build backend with PyInstaller
echo "   Packaging backend with PyInstaller..."
pyinstaller backend.spec --clean --noconfirm

if [ ! -f "dist/ResumeOptimizerBackend.app/Contents/MacOS/ResumeOptimizerBackend" ]; then
    echo "❌ Backend build failed"
    exit 1
fi

echo "✅ Backend build completed"

# Build Frontend
echo ""
echo "3. Building Frontend..."
cd ../frontend

# Install dependencies
echo "   Installing Node.js dependencies..."
npm install --silent

# Build React app
echo "   Building React application..."
REACT_APP_BACKEND_URL=http://127.0.0.1:8001 npm run build --silent

if [ ! -d "build" ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo "✅ Frontend build completed"

# Prepare Electron
echo ""
echo "4. Preparing Electron application..."
cd ../electron

# Install Electron dependencies
echo "   Installing Electron dependencies..."
npm install --silent

# Create directories for built components
mkdir -p frontend_build backend_build

# Copy built frontend
echo "   Copying built frontend..."
cp -r ../frontend/build/* frontend_build/

# Copy built backend
echo "   Copying built backend..."
cp -r ../backend/dist/ResumeOptimizerBackend.app backend_build/

# Build Electron app
echo "   Building Electron application..."
npm run dist --silent

if [ ! -f "dist/Resume Optimizer-1.0.0-arm64.dmg" ] && [ ! -f "dist/Resume Optimizer-1.0.0.dmg" ]; then
    echo "❌ Electron build failed"
    exit 1
fi

echo "✅ Electron build completed"

# Show results
echo ""
echo "5. Build Results:"
cd dist
for file in *.dmg; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "   📦 $file ($size)"
    fi
done

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📁 Built applications are in: electron/dist/"
echo "📋 Next steps:"
echo "   1. Test the DMG files on your Mac"
echo "   2. Run ./scripts/test_app.sh to verify functionality"
echo "   3. Create a GitHub release if tests pass"
echo ""
