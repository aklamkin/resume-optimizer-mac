#!/bin/bash

# Resume Optimizer - App Test Script
# This script helps verify that the standalone app is working correctly

echo "🧪 Resume Optimizer - Application Test"
echo "======================================"

# Check if DMG files exist
echo "1. Checking DMG files..."
if [ -f "Resume Optimizer-1.0.0-arm64.dmg" ]; then
    echo "✅ Apple Silicon DMG found"
    ARM_SIZE=$(du -h "Resume Optimizer-1.0.0-arm64.dmg" | cut -f1)
    echo "   Size: $ARM_SIZE"
else
    echo "❌ Apple Silicon DMG not found"
fi

if [ -f "Resume Optimizer-1.0.0.dmg" ]; then
    echo "✅ Intel DMG found"
    INTEL_SIZE=$(du -h "Resume Optimizer-1.0.0.dmg" | cut -f1)
    echo "   Size: $INTEL_SIZE"
else
    echo "❌ Intel DMG not found"
fi

echo ""
echo "2. System Information..."
echo "   macOS Version: $(sw_vers -productVersion)"
echo "   Architecture: $(uname -m)"

# Recommend which DMG to use
echo ""
echo "3. Recommendation..."
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    echo "✅ Use: Resume Optimizer-1.0.0-arm64.dmg (Apple Silicon)"
else
    echo "✅ Use: Resume Optimizer-1.0.0.dmg (Intel)"
fi

echo ""
echo "4. Installation Instructions..."
echo "   1. Double-click the recommended DMG file"
echo "   2. Drag Resume Optimizer to Applications folder"
echo "   3. Launch from Applications"
echo "   4. Configure API key via menu: Resume Optimizer > Configure API Key..."
echo "   5. Get API key from: https://aistudio.google.com/"

echo ""
echo "5. Test Checklist..."
echo "   □ App launches without errors"
echo "   □ API key configuration works"
echo "   □ Can upload resume files"
echo "   □ Can paste job descriptions"
echo "   □ Backend server starts automatically"
echo "   □ AI analysis completes successfully"
echo "   □ Can download optimized resume"

echo ""
echo "🎉 Test complete! If you encounter issues, check INSTALL.md for troubleshooting."
echo ""
