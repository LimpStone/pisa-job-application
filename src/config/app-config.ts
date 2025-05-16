// Application configuration
export const appConfig = {
    // Path to the Python prediction script
    // Update this to the actual path where your script is located
    pythonScriptPath: process.env.PYTHON_SCRIPT_PATH || "scripts/predict_application.py",
  
    // Other configuration options
    appName: "PISA Job Application",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  }
  