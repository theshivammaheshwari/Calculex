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
- Safe area handling for all devices

## 1
```bash
rm -rf android
npx expo prebuild --platform android --clean

## 2
```bash
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore

MYAPP_UPLOAD_KEY_ALIAS=my-key-alias

MYAPP_UPLOAD_STORE_PASSWORD=123456

MYAPP_UPLOAD_KEY_PASSWORD=123456

org.gradle.jvmargs=-Xmx4096m

org.gradle.parallel=true

org.gradle.daemon=true


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

signingConfig signingConfigs.release


## 3
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore ./android/app/my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
cd ./android/

## 4
```bash
cd ./android/
./gradlew clean
./gradlew assembleRelease
