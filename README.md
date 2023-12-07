# Downloaded Music Player
(last updated Dec 7 - project in development)
![DMP Logo](https://lh3.googleusercontent.com/u/0/drive-viewer/AK7aPaAveWEBhN3aNDC0jrQOiSDXOv0txni6dStR15QpNA6ru-wOnTcfaTO061Kzu5CkTmZDe5T0Kif4HWM3C1nnaeCmOXNS=w600-h933)
### Group Members & GitHub IDs:
- Collins Pearson - collinspearson
- Peyton Moore - caderbug
- Skye Nidiffer - nidif
- William Quesinberry - williamques

### Project Description:
- A React Native/Expo Go mobile app that is able to play music files locally downloaded to a phone. Contains features commonly seen in a typical music player, such as making playlists, editing tracks, and exploring trending music. Primarily developed for Android phones.

### Installation & Start up: 
1. Install the latest version of Node.js:
    * [https://nodejs.org/en/download](https://nodejs.org/en/download)
    * Comes with npm/npx.
2. Need to have/create an expo account along with having the latest version of Expo Go installed ([Expo Go Docs](https://docs.expo.dev/get-started/expo-go/)). Use commands:
	* npm expo login
    * npm install
3. Create React Native development environment for app to run ([React Native Docs](https://reactnative.dev/docs/environment-setup)), use command: 
	* npx create-expo-app DownloadedMusicPlayer
4. Clone the repo, move SkeletonCode folders and files into the new DownloadedMusicPlayer expo app environment folder.
5. In same folder, run following commands to download module dependencies:
	*   npm install @react-navigation/native @react-navigation/native-stack
	* npx expo install expo-av
	* npx expo install expo-file-system
	* npm install react-native-trimmer 
6. To start the server, run:
     * npx expo start
7. Once run, you scan the QR code with Expo Go to open the app.

### How to Use:
- Once opened, you press the "Start Listening" button on the title screen.
- This brings you to the Library screen, where you can listen to tracks and make playlists.
- At the bottom of the screen are tabs for the Editor, Explore, and Settings pages.
- The Editor page allows you to trim and adjust tracks. The Explore page shows you currently trending songs and artists. The Settings page allows you to set a username, set folders to look for tracks in, and to import and export your preferences.

### License:
License [here](https://github.com/nidif/musicplayerapp/blob/main/DownloadedMusicPlayer/LICENSE.txt).
