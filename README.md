# Calculator Suite App 📱

A comprehensive financial and utility calculator application built with React Native and Expo, featuring 8+ specialized calculators with a modern, intuitive interface.

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

## 📦 Build APK - Complete Guide

### Step 1: Generate Android Files

```bash
rm -rf android
npx expo prebuild --platform android --clean
```

### Step 2: Configure gradle.properties

Edit `android/gradle.properties` and add at the end:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=123456
MYAPP_UPLOAD_KEY_PASSWORD=123456

org.gradle.jvmargs=-Xmx4096m
org.gradle.parallel=true
org.gradle.daemon=true
```

### Step 3: Configure build.gradle

Edit `android/app/build.gradle` - Find `android {` block and add:

```gradle
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
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
}
```

### Step 4: Create Keystore

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore ./android/app/my-upload-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Enter password: `123456` and fill other details

### Step 5: Build APK

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

APK Location: `android/app/build/outputs/apk/release/app-release.apk`

### Step 6: Copy to Desktop

```bash
cd ..
cp android/app/build/outputs/apk/release/app-release.apk ~/Desktop/CalculatorSuite.apk
```

## 🔄 Rebuild After Changes

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

## 🧪 Install on Phone

```bash
adb install ~/Desktop/CalculatorSuite.apk
```

## 🐛 Troubleshooting

### ANDROID_HOME not set

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
source ~/.zshrc
```

### Permission denied

```bash
cd android
chmod +x gradlew
```

### Gradle errors

```bash
cd android
./gradlew --stop
./gradlew clean
```

## 👨‍💻 Author

**Shivam Maheshwari**
- 📧 Email: 247shivam@gmail.com
- 📱 Phone: +91 9468955596
- 📸 Instagram: @shivam.maheshwary1
- 👤 Facebook: theshivammaheshwari

## 📄 License

MIT License - Copyright (c) 2025 Shivam Maheshwari

---

Made with ❤️ by Shivam Maheshwari
