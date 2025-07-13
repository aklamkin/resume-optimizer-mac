#!/usr/bin/env python3
"""
Main entry point for the Resume Optimizer backend server
This file is used for packaging the backend into a standalone executable
"""
import os
import sys
import uvicorn
from pathlib import Path

# Add the current directory to the Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

# Set environment variable for the API key storage location
if sys.platform == "darwin":  # macOS
    config_dir = Path.home() / "Library" / "Application Support" / "ResumeOptimizer"
elif sys.platform == "win32":  # Windows
    config_dir = Path.home() / "AppData" / "Local" / "ResumeOptimizer"
else:  # Linux
    config_dir = Path.home() / ".config" / "ResumeOptimizer"

config_dir.mkdir(parents=True, exist_ok=True)
config_file = config_dir / "config.env"

# Load environment variables from config file if it exists
if config_file.exists():
    from dotenv import load_dotenv
    load_dotenv(config_file)

def main():
    """Main function to start the backend server"""
    # Import the FastAPI app from server.py
    from server import app
    
    # Start the server
    print("🚀 Starting Resume Optimizer Backend Server...")
    print(f"📁 Config directory: {config_dir}")
    print(f"🔑 API key configured: {bool(os.environ.get('GEMINI_API_KEY'))}")
    
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8001,
        log_level="info",
        access_log=False
    )

if __name__ == "__main__":
    main()
