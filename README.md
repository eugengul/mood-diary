# Mood Diary

Mood Diary is a mobile application designed to help users track their mood throughout the day.

Built with **React Native** and **Expo**.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## Installation

For android you can download the latest APK release [here](https://github.com/eugengul/mood-diary/releases/latest).

## Screenshots

![Today](https://github.com/user-attachments/assets/66584d2e-7219-4637-99cc-a37d9b02230e)
![Calendar](https://github.com/user-attachments/assets/98cf18bc-4429-46de-99ae-891523473b09)

## Building APK

Follow these steps to build a release APK for your Expo project:

### Prerequisites

- Install Android Studio if you haven't already.

### Steps

1. **Prebuild the Android project**
   ```sh
   npx expo prebuild --platform android --clean
   ```

2. **[Generate an upload key](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key)** (if you don't have one).

3. **[Set up Gradle variables](https://reactnative.dev/docs/signed-apk-android#setting-up-gradle-variables)** for signing the APK.

4. **Navigate to the Android project directory**
   ```sh
   cd android
   ```

5. **Build the release APK**
   ```sh
   ./gradlew assembleRelease
   ```

6. **Locate the built APK** The generated APK files will be in:
   ```
   android/app/build/outputs/apk/release/
   ```
