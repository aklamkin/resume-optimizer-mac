# Resume Optimizer - Standalone Mac Application

🚀 **AI-Powered Resume Optimization Tool**

A complete standalone Mac application that uses Google Gemini AI to analyze and optimize your resume for specific job opportunities.

## Features

- **AI Resume Analysis**: Advanced analysis using Google Gemini AI
- **Job Matching**: Tailored optimization for specific job descriptions
- **ATS Optimization**: Ensure your resume passes Applicant Tracking Systems
- **Cover Letter Generation**: AI-powered cover letters (short & long versions)
- **Multiple Formats**: Support for PDF, DOCX, and text uploads
- **Real-time Editing**: Live resume editing with instant preview
- **Built-in API Key Management**: Easy configuration through the app menu

## Getting Started

### 1. Install the Application

Double-click the `Resume Optimizer.app` file to install it in your Applications folder.

### 2. Configure API Key

1. Launch the application
2. Go to **Resume Optimizer** > **Configure API Key...** in the menu bar
3. Enter your Google Gemini API key
4. Click Save

**Get your free API key here**: https://aistudio.google.com/

### 3. Start Optimizing

1. Paste or upload your resume
2. Enter the job description (or paste a job posting URL)
3. Click "Analyze Resume"
4. Review AI suggestions and apply the ones you like
5. Download your optimized resume

## Usage Tips

- **Drag & Drop**: Simply drag your resume file into the upload area
- **Job URLs**: You can paste job posting URLs directly (works with most job sites)
- **Real-time Preview**: See changes instantly as you apply suggestions
- **Multiple Downloads**: Export in PDF, DOCX, or TXT formats
- **Cover Letters**: Generate professional cover letters with one click

## Menu Features

### Resume Optimizer Menu
- **About**: Information about the application
- **Configure API Key**: Set up your Google Gemini API key
- **Quit**: Exit the application

### File Menu
- **New Analysis**: Clear current analysis and start fresh
- **Open GitHub Repository**: View source code

### Edit Menu
- Standard text editing commands (Undo, Redo, Copy, Paste, etc.)

### View Menu
- **Reload**: Refresh the application
- **Toggle Developer Tools**: Debug the application
- **Zoom**: Adjust application zoom level
- **Full Screen**: Toggle full-screen mode

### Help Menu
- **Get Google Gemini API Key**: Direct link to get your API key
- **Documentation**: View the documentation
- **Report Issue**: Report bugs or request features

## Technical Details

### System Requirements
- macOS 10.14 or later
- Internet connection for AI analysis
- 4GB RAM minimum (8GB recommended)

### Architecture
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Python FastAPI with Google Gemini AI
- **Desktop**: Electron with native Mac integration
- **File Processing**: PDF, DOCX, and text extraction

### Security
- All processing happens locally and with Google's secure AI API
- No resume data is stored permanently
- API keys are stored securely in your user directory

## Troubleshooting

### Common Issues

**"Backend server not found"**
- Ensure the complete application bundle is intact
- Try reinstalling the application

**"API key not configured"**
- Use the menu: Resume Optimizer > Configure API Key
- Ensure you have a valid Google Gemini API key

**"AI service unavailable"**
- Check your internet connection
- Verify your API key is correct and active
- Try again in a few moments (service may be temporarily busy)

### Still Need Help?

1. **Documentation**: Check the GitHub repository for detailed documentation
2. **Issues**: Report bugs at https://github.com/aklamkin/resume_optmzr.1.2/issues
3. **API Key Help**: Visit https://aistudio.google.com/ for Google Gemini support

## License

MIT License - See the original repository for details.

## Credits

- **Google Gemini AI**: For powerful language processing
- **React**: For the user interface
- **FastAPI**: For the backend API
- **Electron**: For desktop application framework
- **Tailwind CSS**: For styling

---

**Made with ❤️ for job seekers everywhere**

*Transform your resume, land your dream job! 🚀*
