# Resume Optimizer - Standalone Mac Application

🚀 **AI-Powered Resume Optimization Tool for macOS**

A complete standalone Mac application that uses Google Gemini AI to analyze and optimize your resume for specific job opportunities. Built with React, FastAPI, and Electron.

![macOS](https://img.shields.io/badge/macOS-10.14+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## ✨ Features

- **🤖 AI Resume Analysis**: Advanced analysis using Google Gemini AI
- **🎯 Job Matching**: Tailored optimization for specific job descriptions
- **📄 ATS Optimization**: Ensure your resume passes Applicant Tracking Systems
- **✍️ Cover Letter Generation**: AI-powered cover letters (short & long versions)
- **📁 Multiple Formats**: Support for PDF, DOCX, and text uploads
- **⚡ Real-time Editing**: Live resume editing with instant preview
- **🔐 Built-in API Key Management**: Easy configuration through the app menu
- **🖥️ Native macOS Integration**: Professional menu system and user experience

## 📦 Downloads

### Pre-built Applications
- **Apple Silicon Macs (M1/M2/M3)**: [Download ARM64 DMG](https://github.com/aklamkin/resume-optimizer-mac/releases/latest/download/Resume%20Optimizer-1.0.0-arm64.dmg)
- **Intel Macs**: [Download x64 DMG](https://github.com/aklamkin/resume-optimizer-mac/releases/latest/download/Resume%20Optimizer-1.0.0.dmg)

### System Requirements
- macOS 10.14 (Mojave) or later
- 4GB RAM minimum (8GB recommended)
- 500MB free disk space
- Internet connection for AI analysis

## 🚀 Quick Start

1. **Download** the appropriate DMG file for your Mac
2. **Install** by dragging to Applications folder
3. **Launch** Resume Optimizer from Applications
4. **Configure API Key** via menu: Resume Optimizer > Configure API Key...
5. **Get your free API key** at https://aistudio.google.com/
6. **Start optimizing!** Upload resume + job description

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+ with pip
- macOS development environment

### Backend Development
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Electron Development
```bash
cd electron
npm install
npm start
```

## 🏗️ Building from Source

### 1. Build Backend
```bash
cd backend
source venv/bin/activate
pip install pyinstaller
pyinstaller backend.spec --clean
```

### 2. Build Frontend
```bash
cd frontend
npm install
REACT_APP_BACKEND_URL=http://127.0.0.1:8001 npm run build
```

### 3. Package Electron App
```bash
cd electron
npm install
npm run dist
```

### 4. Find Your Built App
The DMG files will be in `electron/dist/`

## 📁 Project Structure

```
resume-optimizer-mac/
├── backend/                 # Python FastAPI backend
│   ├── server.py           # Main API logic
│   ├── main.py            # Entry point for packaging
│   ├── backend.spec       # PyInstaller configuration
│   └── requirements.txt   # Python dependencies
├── frontend/               # React.js frontend
│   ├── src/               # React source code
│   ├── package.json       # Node.js dependencies
│   └── build/             # Built frontend (generated)
├── electron/               # Electron desktop wrapper
│   ├── main.js            # Main Electron process
│   ├── preload.js         # Security preload script
│   ├── package.json       # Electron configuration
│   └── dist/              # Built applications (generated)
├── docs/                   # Documentation
├── scripts/                # Build and utility scripts
├── assets/                 # Icons and resources
└── README.md              # This file
```

## 🎯 Usage

### Basic Workflow
1. **Upload Resume**: Drag & drop PDF/DOCX or paste text
2. **Add Job Description**: Paste job posting or URL
3. **Analyze**: Click "Analyze Resume" for AI processing
4. **Review**: Apply AI suggestions you like
5. **Export**: Download optimized resume in preferred format

### Menu Features
- **Resume Optimizer Menu**: Configure API key, about info
- **File Menu**: New analysis, GitHub repository
- **Edit Menu**: Standard editing commands
- **View Menu**: Zoom, developer tools, full screen
- **Help Menu**: API key help, documentation, issues

## 🔧 API Configuration

### Getting Your Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google account
3. Create new project or select existing
4. Generate API key
5. Configure in app: Resume Optimizer > Configure API Key...

### Secure Storage
- API keys stored in `~/Library/Application Support/ResumeOptimizer/`
- Encrypted communication with Google's APIs
- No resume data stored permanently

## 🧪 Testing

### Run Tests
```bash
# Test the built application
./scripts/test_app.sh

# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Test on both Intel and Apple Silicon Macs

## 📋 Roadmap

- [ ] Code signing for easier installation
- [ ] Auto-updater integration
- [ ] Dark mode support
- [ ] Multiple language support
- [ ] Cloud storage integration
- [ ] Resume templates
- [ ] Batch processing

## 🛟 Support

- **Documentation**: Check `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/aklamkin/resume-optimizer-mac/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aklamkin/resume-optimizer-mac/discussions)
- **API Help**: [Google AI Studio](https://aistudio.google.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language processing
- **React** and **FastAPI** communities for excellent frameworks
- **Electron** for enabling cross-platform desktop apps
- **Tailwind CSS** for beautiful styling system

## 🔗 Related Projects

- [Original Resume Optimizer](https://github.com/aklamkin/resume_optmzr.1.2) - Web-based version
- [Emergent Integrations](https://emergent.ai/) - AI integration library

---

**Made with ❤️ for job seekers everywhere**

*Transform your resume, land your dream job! 🚀*
