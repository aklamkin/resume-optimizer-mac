# Development Guide - Resume Optimizer Mac

## 🛠️ Development Environment Setup

### Prerequisites
- **macOS**: 10.14+ (required for building)
- **Node.js**: 18+ and npm
- **Python**: 3.9+ with pip
- **Git**: For version control
- **Xcode Command Line Tools**: `xcode-select --install`

### Initial Setup
```bash
git clone https://github.com/your-username/resume-optimizer-mac.git
cd resume-optimizer-mac
```

## 🏗️ Architecture Overview

### Components
1. **Backend** (Python FastAPI): AI processing and file handling
2. **Frontend** (React.js): User interface and interactions
3. **Electron** (Node.js): Desktop wrapper and native integration

### Data Flow
```
User Interface (React) 
    ↓ HTTP Requests
Backend API (FastAPI) 
    ↓ AI Requests
Google Gemini AI
    ↓ Processed Data
Backend Response
    ↓ JSON Response
Frontend Display
```

## 🔧 Backend Development

### Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Environment Configuration
Create `.env` file:
```env
GEMINI_API_KEY=your_api_key_here
HOST=127.0.0.1
PORT=8001
```

### Running Development Server
```bash
# Start backend server
python server.py

# Or with auto-reload
uvicorn server:app --host 127.0.0.1 --port 8001 --reload
```

### Key Files
- **`server.py`**: Main FastAPI application with all endpoints
- **`main.py`**: Entry point for PyInstaller packaging
- **`backend.spec`**: PyInstaller configuration
- **`requirements.txt`**: Python dependencies

### Adding New Features

#### 1. Add New API Endpoint
```python
# In server.py
@app.post("/api/new-feature")
async def new_feature(request: NewFeatureRequest):
    try:
        # Your logic here
        return {"result": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

#### 2. Add New Dependencies
```bash
pip install new-package
pip freeze > requirements.txt
```

#### 3. Update PyInstaller Config
Edit `backend.spec` to include new hidden imports:
```python
hiddenimports=[
    # ... existing imports
    'new_package',
    'new_package.submodule',
]
```

### Building Backend
```bash
source venv/bin/activate
pip install pyinstaller
pyinstaller backend.spec --clean
```

## ⚛️ Frontend Development

### Setup
```bash
cd frontend
npm install
```

### Running Development Server
```bash
# Start React development server
npm start

# Runs on http://localhost:3000
```

### Key Files
- **`src/App.js`**: Main React component with all UI logic
- **`src/index.js`**: React app entry point
- **`package.json`**: Dependencies and scripts
- **`tailwind.config.js`**: Tailwind CSS configuration

### Adding New Features

#### 1. Add New UI Component
```jsx
// In App.js
const NewFeatureComponent = () => {
  const [state, setState] = useState('');
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Your component JSX */}
    </div>
  );
};
```

#### 2. Add New API Call
```jsx
const callNewAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/new-feature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'example' })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
  }
};
```

#### 3. Add New Dependencies
```bash
npm install new-package
```

### Building Frontend
```bash
# Build for production
REACT_APP_BACKEND_URL=http://127.0.0.1:8001 npm run build

# Output goes to build/ directory
```

## 🖥️ Electron Development

### Setup
```bash
cd electron
npm install
```

### Running Development
```bash
# Start Electron app (requires built frontend and backend)
npm start
```

### Key Files
- **`main.js`**: Main Electron process (window management, menus)
- **`preload.js`**: Security bridge between main and renderer
- **`package.json`**: Electron configuration and build settings
- **`entitlements.mac.plist`**: macOS security entitlements

### Adding New Features

#### 1. Add New Menu Item
```javascript
// In main.js, update createMenu() function
{
  label: 'New Feature',
  accelerator: 'CmdOrCtrl+Shift+N',
  click: () => {
    // Your menu action
  }
}
```

#### 2. Add New IPC Handler
```javascript
// In main.js
ipcMain.handle('new-feature', async (event, data) => {
  // Handle the request
  return { result: 'success' };
});

// In preload.js
contextBridge.exposeInMainWorld('electronAPI', {
  // ... existing APIs
  newFeature: (data) => ipcRenderer.invoke('new-feature', data)
});
```

#### 3. Update Security Settings
Edit `entitlements.mac.plist` for new permissions:
```xml
<key>com.apple.security.new-permission</key>
<true/>
```

### Building Electron App
```bash
# Build for distribution
npm run dist

# Output goes to dist/ directory
# Creates .dmg files for Intel and Apple Silicon
```

## 🔄 Full Build Process

### Development Workflow
1. **Backend Changes**: Edit `backend/server.py` → Test locally
2. **Frontend Changes**: Edit `frontend/src/App.js` → Test with `npm start`
3. **Electron Changes**: Edit `electron/main.js` → Test with `npm start`

### Production Build
```bash
# 1. Build Backend
cd backend
source venv/bin/activate
pyinstaller backend.spec --clean

# 2. Build Frontend  
cd ../frontend
npm install
REACT_APP_BACKEND_URL=http://127.0.0.1:8001 npm run build

# 3. Copy built frontend to electron
cp -r build/* ../electron/frontend_build/

# 4. Copy built backend to electron
cp -r ../backend/dist/ResumeOptimizerBackend.app ../electron/backend_build/

# 5. Build Electron app
cd ../electron
npm install
npm run dist
```

## 🧪 Testing

### Unit Tests
```bash
# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test
```

### Integration Testing
```bash
# Test full application
./scripts/test_app.sh
```

### Manual Testing Checklist
- [ ] App launches without errors
- [ ] API key configuration works
- [ ] File upload (PDF, DOCX) works
- [ ] Text input works
- [ ] AI analysis completes
- [ ] Suggestions can be applied/removed
- [ ] Export works (PDF, DOCX, TXT)
- [ ] Menu items function correctly
- [ ] Window resizing works
- [ ] App closes cleanly

## 📦 Release Process

### Version Bumping
1. Update version in `electron/package.json`
2. Update version in `backend/server.py`
3. Update version in `frontend/package.json`
4. Update README.md with new version

### Creating Release
1. Build all components
2. Test DMG files on both Intel and Apple Silicon
3. Create GitHub release with:
   - Release notes
   - DMG files attached
   - Installation instructions

### Distribution
- Upload DMG files to GitHub Releases
- Update download links in README
- Create release announcement

## 🐛 Debugging

### Backend Issues
```bash
# Check backend logs
cd backend && python server.py

# Debug with verbose logging
UVICORN_LOG_LEVEL=debug python server.py
```

### Frontend Issues
```bash
# React development tools
npm start
# Open browser dev tools

# Check console for errors
# Use React DevTools extension
```

### Electron Issues
```bash
# Enable developer tools
# In main.js, add:
mainWindow.webContents.openDevTools();

# Check main process logs in terminal
# Check renderer process logs in DevTools
```

### Common Issues

#### "Backend server not found"
- Ensure backend was built correctly
- Check backend executable permissions
- Verify path in `electron/main.js`

#### "API key not working"
- Verify API key is valid
- Check internet connection
- Verify config file location

#### "Build fails"
- Check all dependencies are installed
- Verify Python/Node versions
- Clear cache: `npm cache clean --force`

## 🚀 Performance Optimization

### Backend
- Use async/await for I/O operations
- Implement request caching
- Optimize file processing

### Frontend
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize bundle size with code splitting

### Electron
- Preload only necessary modules
- Optimize startup time
- Use efficient IPC communication

---

## 📚 Additional Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [PyInstaller Documentation](https://pyinstaller.readthedocs.io/)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)

Happy coding! 🎉
