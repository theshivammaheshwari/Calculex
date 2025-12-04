Markdown

# Calculator Suite App 📱

A comprehensive financial and utility calculator application built with React Native and Expo, featuring 8+ specialized calculators with a modern, intuitive interface.

![App Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-brightgreen.svg)
![Expo](https://img.shields.io/badge/Expo-54.0.25-000020.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📸 Screenshots

<!-- Add your screenshots here -->
<p align="center">
  <img src="screenshots/home.png" width="250" alt="Home Screen" />
  <img src="screenshots/calculator.png" width="250" alt="Calculator" />
  <img src="screenshots/profile.png" width="250" alt="Profile" />
</p>

---

## ✨ Features

### 💰 Financial Calculators
- **EMI Calculator** - Calculate Equated Monthly Installments for loans
- **SIP Calculator** - Systematic Investment Plan returns calculator
- **Future Value Calculator** - Predict investment growth over time
- **Stock Average Calculator** - Calculate average stock purchase price
- **Stock Split Calculator** - Adjust portfolio after stock splits

### 🧮 Utility Calculators
- **Age Calculator** - Calculate exact age in years, months, and days
- **BMI Calculator** - Body Mass Index with health recommendations
- **Trip Calculator** - Plan trip expenses and split costs

### 🎨 UI/UX Features
- Clean, modern interface with gradient designs
- Smooth animations using React Native Animated API
- Haptic feedback for better user experience
- Intuitive navigation with bottom tabs
- Responsive design for all screen sizes
- Safe area handling for all devices

---

## 🛠️ Tech Stack

### Frontend Framework
├── React Native 0.81.5 # Cross-platform mobile framework
├── Expo 54.0.25 # Development platform
├── TypeScript 5.9.3 # Type-safe JavaScript
└── Expo Router 6.0.15 # File-based routing

text


### State Management
├── React Query 5.83.0 # Server state management
├── Zustand 5.0.3 # Client state management
└── React Hooks # Built-in state management

text


### UI Libraries
├── Lucide React Native 0.475.0 # Icon library
├── Expo Linear Gradient 15.0.7 # Gradient backgrounds
├── React Native Gesture Handler 2.28.0 # Touch interactions
├── React Native Safe Area Context 5.6.1 # Safe area handling
└── React Native Screens 4.16.0 # Native navigation

text


### Development Tools
├── Bun 1.3.3 # Fast JavaScript runtime
├── VS Code # Code editor
├── Android Studio # Android SDK
└── Gradle 8.14.3 # Build automation

text


---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | >= 22.0.0 | [Download](https://nodejs.org/) |
| Bun | >= 1.3.0 | [Download](https://bun.sh/) |
| Android Studio | Latest | [Download](https://developer.android.com/studio) |
| Java JDK | >= 17 | [Download](https://adoptium.net/) |
| VS Code | Latest | [Download](https://code.visualstudio.com/) |

### System Requirements

**macOS:**
- macOS 12.0 or later
- 8GB RAM minimum (16GB recommended)
- 20GB free disk space
- Xcode Command Line Tools

**Environment Variables:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
🚀 Installation
Step 1: Clone the Repository
Bash

# Using HTTPS
git clone https://github.com/yourusername/calculator-suite-app.git

# Or using SSH
git clone git@github.com:yourusername/calculator-suite-app.git

# Navigate to project directory
cd calculator-suite-app
Step 2: Install Dependencies
Bash

# Install all npm packages
bun install

# Alternative: Using npm
npm install

# Alternative: Using yarn
yarn install
Expected output:

text

bun install v1.3.3

+ @babel/core@7.26.7
+ @expo/vector-icons@15.0.3
+ expo@54.0.25
+ expo-router@6.0.15
+ react@19.1.0
+ react-native@0.81.5
...

1034 packages installed [17.90s]
Step 3: Set Up Environment Variables
Create a .env file in the root directory:

Bash

# Copy example env file
cp .env.example .env

# Or create manually
touch .env
Add the following to .env:

env

# API Configuration (if applicable)
EXPO_PUBLIC_API_URL=https://your-api-url.com

# App Configuration
EXPO_PUBLIC_APP_NAME=Calculator Suite
EXPO_PUBLIC_APP_VERSION=1.0.0

# Analytics (optional)
EXPO_PUBLIC_ANALYTICS_ID=your_analytics_id
Step 4: Configure App Settings
Edit app.json with your app details:

JSON

{
  "expo": {
    "name": "Calculator Suite",
    "slug": "calculator-suite-app",
    "version": "1.0.0",
    "android": {
      "package": "com.yourname.calculatorsuite"
    }
  }
}
Step 5: Start Development Server
Bash

# Start Expo development server
bun start

# Alternative commands:
npx expo start           # Standard start
npx expo start --clear   # Clear cache and start
npx expo start --tunnel  # Use tunnel connection
Expected output:

text

Starting Metro Bundler

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀█ █▄▄▄    [QR CODE]         █
█ █   █ █▀▀▀█                          █
█ █▄▄▄█ █▀ █▀                          █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code to open the app
Step 6: Run on Device
Option 1: Using Expo Go (Quick Testing)
Install Expo Go on your phone:

Android - Google Play
iOS - App Store
Scan QR code from terminal:

Bash

# QR code will appear in terminal
# Or press 's' to switch to Expo Go mode
App will load on your device

Option 2: Using Android Emulator
Bash

# Start Android emulator from Android Studio
# Then press 'a' in Expo terminal

# Or directly run:
npx expo run:android
Option 3: Development Build
Bash

# Create development build
npx expo prebuild --platform android

# Run development build
npx expo run:android
📦 Building APK
Quick Build (Development APK)
Bash

# Step 1: Generate Android native files
npx expo prebuild --platform android --clean

# Step 2: Navigate to android folder
cd android

# Step 3: Make gradlew executable
chmod +x gradlew

# Step 4: Build APK
./gradlew assembleRelease

# Step 5: Locate APK
# Path: android/app/build/outputs/apk/release/app-release.apk
Production APK with Signing
Step 1: Create Keystore
Bash

# From project root directory
keytool -genkeypair -v -storetype PKCS12 \
  -keystore ./android/app/my-upload-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
Enter keystore information:

text

Enter keystore password: [your-password]
Re-enter new password: [your-password]
What is your first and last name?: Calculator Suite
Organizational unit?: Dev
Organization?: Your Company
City or Locality?: Your City
State or Province?: Your State
Country code?: IN
Is ... correct?: yes
Step 2: Configure Gradle Properties
Edit android/gradle.properties and add at the end:

properties

# Keystore Configuration
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your_password_here
MYAPP_UPLOAD_KEY_PASSWORD=your_password_here

# Gradle Performance
org.gradle.jvmargs=-Xmx4096m
org.gradle.parallel=true
org.gradle.daemon=true
org.gradle.configureondemand=true
Step 3: Update Build.gradle
Edit android/app/build.gradle and find the android { block:

gradle

android {
    // ... existing code ...
    
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
            proguardFiles getDefaultProguardFile("proguard-android.txt"), 
                         "proguard-rules.pro"
        }
    }
}
Step 4: Build Signed APK
Bash

# Navigate to android folder
cd android

# Clean previous builds
./gradlew clean

# Build release APK
./gradlew assembleRelease

# Expected output:
# BUILD SUCCESSFUL in 8m 23s
# 930 actionable tasks: 857 executed, 73 up-to-date
Step 5: Locate and Copy APK
Bash

# APK location
ls -lh app/build/outputs/apk/release/app-release.apk

# Copy to Desktop
cd ..
cp android/app/build/outputs/apk/release/app-release.apk \
   ~/Desktop/CalculatorSuite-v1.0.0.apk

# Verify file
ls -lh ~/Desktop/CalculatorSuite-v1.0.0.apk
# Expected size: 40-60 MB
🔄 Rebuild After Changes
For Code-Only Changes (JavaScript/TypeScript)
When you modify:

React components
Styles
Business logic
Constants
Bash

# Navigate to android folder
cd android

# Clean and rebuild
./gradlew clean
./gradlew assembleRelease

# Estimated time: 3-5 minutes
For Configuration/Dependency Changes
When you:

Install new packages (bun add package-name)
Change app.json
Modify native code
Update Expo SDK version
Bash

# From project root
rm -rf android
npx expo prebuild --platform android --clean

# Reconfigure signing
# 1. Add keystore config to gradle.properties
# 2. Update build.gradle with signing configs

# Build APK
cd android
./gradlew assembleRelease

# Estimated time: 8-10 minutes
Quick Rebuild Script
Create scripts/build.sh:

Bash

#!/bin/bash

echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean

echo "🔨 Building release APK..."
./gradlew assembleRelease

echo "📦 Copying APK to Desktop..."
cd ..
cp android/app/build/outputs/apk/release/app-release.apk \
   ~/Desktop/CalculatorSuite-$(date +%Y%m%d-%H%M).apk

echo "✅ Build complete!"
ls -lh ~/Desktop/CalculatorSuite-*.apk | tail -1
Make executable and run:

Bash

chmod +x scripts/build.sh
./scripts/build.sh
🧪 Testing
Run Unit Tests
Bash

# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage

# Run specific test file
bun test Calculator.test.tsx
Run Linter
Bash

# Check code quality
bun lint

# Fix auto-fixable issues
bun lint --fix

# Check TypeScript types
bun type-check
Format Code
Bash

# Format all files
bun format

# Check formatting without changes
bun format:check
Test APK on Device
Using ADB (USB Connection)
Bash

# Enable USB Debugging on Android phone:
# Settings > About Phone > Tap "Build Number" 7 times
# Settings > Developer Options > USB Debugging ON

# Connect phone via USB
adb devices
# Output should show your device

# Install APK
adb install ~/Desktop/CalculatorSuite-v1.0.0.apk

# Expected output:
# Performing Streamed Install
# Success
Using File Transfer
Copy APK to phone via:

USB cable file transfer
Google Drive / Dropbox
Email attachment
AirDrop (if applicable)
On phone:

Open APK with File Manager
Enable "Install from Unknown Sources" if prompted
Tap "Install"
📱 App Structure
text

calculator-suite-app/
│
├── app/                           # Application screens (Expo Router)
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── (calculators)/        # Calculator screens group
│   │   │   ├── _layout.tsx       # Stack navigator for calculators
│   │   │   ├── home.tsx          # Calculator selection screen
│   │   │   ├── emi.tsx           # EMI Calculator
│   │   │   ├── sip.tsx           # SIP Calculator
│   │   │   ├── stock-average.tsx # Stock Average Calculator
│   │   │   ├── stock-split.tsx   # Stock Split Calculator
│   │   │   ├── future-value.tsx  # Future Value Calculator
│   │   │   ├── age.tsx           # Age Calculator
│   │   │   ├── bmi.tsx           # BMI Calculator
│   │   │   └── trip.tsx          # Trip Calculator
│   │   ├── _layout.tsx           # Tab navigator configuration
│   │   └── profile.tsx           # Profile screen
│   ├── _layout.tsx               # Root layout with providers
│   ├── index.tsx                 # App entry point
│   └── +not-found.tsx            # 404 error screen
│
├── assets/                       # Static assets
│   └── images/                   # App icons and images
│       ├── icon.png              # App icon (1024x1024)
│       ├── adaptive-icon.png     # Android adaptive icon
│       ├── splash-icon.png       # Splash screen icon
│       └── favicon.png           # Web favicon
│
├── constants/                    # App-wide constants
│   └── colors.ts                 # Color definitions
│
├── components/                   # Reusable components (if any)
│   ├── Button.tsx
│   └── Input.tsx
│
├── utils/                        # Utility functions
│   └── calculations.ts
│
├── android/                      # Android native code
│   ├── app/
│   │   ├── build.gradle          # App-level Gradle config
│   │   └── src/main/
│   ├── build.gradle              # Project-level Gradle config
│   └── gradle.properties         # Gradle properties
│
├── ios/                          # iOS native code (if using)
│
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore rules
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── bun.lockb                     # Bun lock file
├── tsconfig.json                 # TypeScript configuration
├── metro.config.js               # Metro bundler config
├── eslint.config.js              # ESLint configuration
├── README.md                     # This file
└── LICENSE                       # License file
🎯 Usage Examples
EMI Calculator
Open the app
Tap "Calculators" tab at bottom
Select "EMI" card
Enter loan details:
text

Loan Amount: ₹1,000,000
Interest Rate: 8.5%
Tenure: 20 years (240 months)
View results:
Monthly EMI: ₹8,678
Total Interest: ₹1,082,720
Total Amount: ₹2,082,720
SIP Calculator
Navigate to SIP Calculator
Input investment details:
text

Monthly Investment: ₹10,000
Expected Return: 12% per annum
Time Period: 10 years
Calculate results:
Total Investment: ₹12,00,000
Expected Returns: ₹11,16,695
Maturity Value: ₹23,16,695
Stock Average Calculator
Open Stock Average Calculator
Add purchases:
text

Purchase 1: 100 shares @ ₹150
Purchase 2: 50 shares @ ₹140
Purchase 3: 75 shares @ ₹160
View average price:
Average Price: ₹151.11 per share
Total Shares: 225
Total Investment: ₹34,000
🔧 Configuration
Update App Name
File: app.json

JSON

{
  "expo": {
    "name": "Your Custom App Name",
    "slug": "your-custom-slug",
    "android": {
      "package": "com.yourcompany.yourapp",
      "versionCode": 1,
      "versionName": "1.0.0"
    }
  }
}
File: android/app/src/main/res/values/strings.xml

XML

<resources>
    <string name="app_name">Your Custom App Name</string>
</resources>
Update App Icons
Replace these files in assets/images/:

File	Size	Purpose
icon.png	1024x1024	App icon (iOS & Android)
adaptive-icon.png	1024x1024	Android adaptive icon
splash-icon.png	1284x2778	Splash screen
favicon.png	48x48	Web favicon
Generate icons online:

App Icon Generator
Expo Icon Generator
Customize Theme Colors
File: constants/colors.ts

TypeScript

export const Colors = {
  // Primary colors
  primary: '#1e40af',      // Blue
  secondary: '#3b82f6',    // Light Blue
  
  // Calculator colors
  emi: '#0891b2',          // Cyan
  sip: '#059669',          // Green
  stock: '#7c3aed',        // Purple
  age: '#8b5cf6',          // Light Purple
  bmi: '#f43f5e',          // Rose
  trip: '#0284c7',         // Sky Blue
  
  // UI colors
  background: '#f5f5f5',
  text: '#1f2937',
  border: '#e5e7eb',
  
  // Status colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};
Configure Bottom Tab Bar
File: app/(tabs)/_layout.tsx

TypeScript

tabBarStyle: {
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderTopColor: "#f0f0f0",
  height: Platform.OS === "android" ? 100 : 60,
  paddingBottom: Platform.OS === "android" ? 40 : 8,
  paddingTop: 12,
}
Adjust values for your device:

height: Overall tab bar height
paddingBottom: Space from bottom edge
paddingTop: Space from content
📚 Documentation
Build Guide - Detailed APK build instructions
API Documentation - API integration guide (if applicable)
Contributing Guidelines - How to contribute
Changelog - Version history
Code of Conduct - Community guidelines
External Resources
Expo Documentation
React Native Docs
Expo Router Guide
React Query Docs
🐛 Known Issues
Issue 1: Bottom Tabs Overlap with Android Navigation
Problem: Tab bar overlaps with Android back/home buttons on some devices.

Solution:

TypeScript

// File: app/(tabs)/_layout.tsx
tabBarStyle: {
  height: Platform.OS === "android" ? 100 : 60,
  paddingBottom: Platform.OS === "android" ? 40 : 8,
}
Issue 2: 404 Errors in Development Build
Problem: Routes show 404 error in custom development builds.

Solution: Use Expo Go for development testing instead.

Bash

# Switch to Expo Go mode
npx expo start
# Press 's' in terminal
Issue 3: Metro Bundler Cache Issues
Problem: Changes not reflecting in app.

Solution:

Bash

# Clear cache and restart
npx expo start --clear

# Or manually clear
rm -rf .expo node_modules/.cache
bun install
Issue 4: Gradle Build Failures
Problem: Build fails with Gradle errors.

Solution:

Bash

# Stop Gradle daemon
cd android
./gradlew --stop

# Clean and rebuild
./gradlew clean
./gradlew assembleRelease
🔄 Roadmap
Version 1.1.0 (Q1 2025)
 Currency Converter - Real-time exchange rates
 Loan Comparison Tool - Compare multiple loan offers
 Tax Calculator - Income tax calculations
 Dark Mode - System-wide dark theme
 Calculation History - Save and view past calculations
Version 1.2.0 (Q2 2025)
 Cloud Sync - Backup calculations to cloud
 Export to PDF - Generate calculation reports
 Multi-language Support - Hindi, Spanish, French
 Android Widgets - Quick access from home screen
 Notifications - Reminders for SIP dates
Version 2.0.0 (Q3 2025)
 iOS Version - Launch on App Store
 Investment Tracker - Track portfolio performance
 Goal Planning - Financial goal calculator
 AI Suggestions - Smart financial recommendations
 Social Sharing - Share calculations
🤝 Contributing
Contributions, issues, and feature requests are welcome!

How to Contribute
Fork the repository

Bash

# Click "Fork" button on GitHub
Clone your fork

Bash

git clone https://github.com/YOUR_USERNAME/calculator-suite-app.git
Create a feature branch

Bash

git checkout -b feature/AmazingFeature
Make your changes

Write clean, documented code
Follow existing code style
Add tests if applicable
Commit your changes

Bash

git commit -m 'Add some AmazingFeature'
Push to your fork

Bash

git push origin feature/AmazingFeature
Open a Pull Request

Go to original repository
Click "New Pull Request"
Select your branch
Describe your changes
Development Guidelines
Code Style: Follow ESLint and Prettier rules
TypeScript: Use proper types, avoid any
Commits: Use conventional commits format
Testing: Add tests for new features
Documentation: Update README if needed
Reporting Bugs
Before submitting:

Check existing issues
Search closed issues
Try latest version
Include in report:

Device information (model, Android version)
Steps to reproduce
Expected vs actual behavior
Screenshots or screen recordings
Error messages or logs
Example:

Markdown

**Bug:** EMI calculation incorrect for 0% interest

**Device:** Samsung Galaxy S21, Android 13

**Steps:**
1. Open EMI Calculator
2. Enter Amount: 100000, Rate: 0%, Tenure: 12
3. Calculate

**Expected:** Monthly EMI = ₹8,333.33
**Actual:** Shows error

**Screenshots:** [attached]
📄 License
This project is licensed under the MIT License.

text

MIT License

Copyright (c) 2024 Shivam Maheshwari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
See LICENSE file for full text.

👨‍💻 Author
Shivam Maheshwari
Full Stack Mobile Developer

<div align="center">
Email
Phone

Instagram
Facebook
LinkedIn
GitHub

</div>
Connect with me:

📧 Email: 247shivam@gmail.com
📱 Phone: +91 9468955596
💼 LinkedIn: Your LinkedIn Profile
📸 Instagram: @shivam.maheshwary1
👤 Facebook: theshivammaheshwari
💻 GitHub: @yourusername
🌐 Portfolio: yourwebsite.com
Available for:

Mobile App Development (React Native, Expo)
Full Stack Development
Freelance Projects
Technical Consulting
Code Reviews
🙏 Acknowledgments
Special thanks to:

Expo Team - For the incredible development platform and tooling
React Native Community - For comprehensive documentation and support
Vercel - For Next.js and inspiration
Lucide Icons - For beautiful, customizable icons
TanStack Query - For powerful data fetching
Stack Overflow Community - For debugging help and solutions
Open Source Contributors - For inspiration and code examples
Beta Testers - For valuable feedback and bug reports
Libraries & Tools Used
Library	Purpose	License
Expo	Development Platform	MIT
React Native	Mobile Framework	MIT
React Query	State Management	MIT
Lucide Icons	Icon Library	ISC
TypeScript	Type Safety	Apache-2.0
📊 Project Stats
<div align="center">
GitHub Stars
GitHub Forks
GitHub Watchers

GitHub Issues
GitHub Pull Requests
GitHub License
GitHub Last Commit

Code Size
Repo Size
Contributors

</div>
💬 Support & Community
Get Help
If you have questions or need assistance:

Channel	Link	Response Time
📧 Email	247shivam@gmail.com	24-48 hours
💬 GitHub Issues	Open Issue	1-3 days
💡 Discussions	GitHub Discussions	Community-driven
📱 Phone/WhatsApp	+91 9468955596	Business hours
Community Guidelines
Be respectful and inclusive
Help others learn and grow
Share knowledge generously
Report bugs constructively
Celebrate successes together
⭐ Show Your Support
If this project helped you or you found it useful:

⭐ Star this repository on GitHub
🐛 Report bugs to help improve
💡 Suggest features for future versions
📢 Share with others who might benefit
☕ Buy me a coffee (link if applicable)
Bash

# Clone and give it a try!
git clone https://github.com/yourusername/calculator-suite-app.git
cd calculator-suite-app
bun install
bun start
🎉 Success Stories
"This calculator app saved me hours of manual calculations for my investment planning!" - User Testimonial

"Clean code, great UI, easy to customize for my needs." - Developer Feedback

Share your experience:

Tweet about the app with #CalculatorSuiteApp
Write a blog post about your usage
Record a video tutorial
Share on social media
📱 Download APK
Latest Release
Version 1.0.0 - December 2024

Download APK

File Details:

Size: ~45 MB
Min Android: 6.0 (API 23)
Target Android: 15 (API 36)
SHA-256: [checksum]
Installation Instructions
Download APK from link above
Enable "Install from Unknown Sources":
Settings → Security → Unknown Sources
Or Settings → Apps → Special Access → Install Unknown Apps
Open downloaded APK file
Tap "Install"
Open app and enjoy!
<div align="center">
🌟 Thank You for Using Calculator Suite App! 🌟
Made with ❤️ by Shivam Maheshwari

Empowering financial decisions through technology

Built with React Native
Powered by Expo
Made with TypeScript

© 2024 Shivam Maheshwari. All Rights Reserved.

