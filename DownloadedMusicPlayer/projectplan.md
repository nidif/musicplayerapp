# Sprint Plan

## Project Information
### Product Overview
Product Name: Downloaded Music Player
The program to be developed would be a phone app that is able to play music that is locally downloaded to a phone. It will contain features commonly seen in a typical music player, with various additional features.
### Backlog Items
1. **Gather Music**: The program should be able to find all the audio files recognized as music on the device
2. **Browse Library**: The program should display and sort the audio based on its metadata so that users can find and select it
3. **Basic Player Interactions**: Users should be able to play, pause, rewind, fast forward, skip, etc. music that they find from the displayed sections of music
4. **Playlists & Saving Playlist Orders**: Users should be able to create playlists that can be played and shuffled, and if users find an ordering of the songs in the playlist that they like, they should be able to save it 
5. **Altering Music**: There should be a simple in-app editor for cutting sections out of audio files, and amplifying the volume of the audio file. Users should also be able to make copies of audio files.
6. **More Player Interactions**: Users should be able to change certain properties of the music that is playing, such as volume/speed multipliers.
7. **Changing Metadata**: Users should also be able to make simple changes to a song/album’s metadata, such as the genre, artist, title, icon, the album that the song belongs to (if any), the track number position in an album (if any)
8. **EQ**: Users should be able to EQ the way that the music player outputs audio
9. **Sourcing Music**: The program should have a database of music that can be purchased and downloaded from third party services with links to those services, able to be searched in the app
10. **Recommending Music**: The program should detect what genres and artists users listen to in order to recommend music similar to what they enjoy
11. **Creating an Account**: While not necessary, users should be able to make an account that their data can be synced to
12. **Saving/Loading Data to/from Account**: Users should be able to save things such as their playlists and playlist orders to their account, but not the songs directly. The user can then load that information onto a new device and it will attempt to make it work with the audio files on that new device.
### Sprint 1 Task Ideas (each member should receive 3):
- Feature for user to add a folder path to a list of folders. These folders will be searched through to compile all the audio files in those folders
- There should be a library tab for the user to look through all of the audio files
- There should be a filter button to only show songs from a specific artist/genre/album
- There should be a sort priority option, letting the user choose the main way the library is sorted (like if songs should be separated by artist name in alphabetical order, or if songs should be sorted by song title in alphabetical order)
- There should be some way for the user's preferences to save locally (could be in a json file or something, but if anyone has an alternate method feel free to do that)
- Audio Playback
- Play and Pause UI
- Player Information
- Audio Editor Tab UI
- Find and Import Audio Manipulation library
- Implement Different Tabs

## Design Ideas
### Tabs
The app should have 4 tabs at the bottom:
1. Library: This is where the user's music would be pooled, and it could be filtered and sorted however the user chooses 
2. Audio Editor: This would be a tab for simple file edits, such as cutting out portions of the audio file or raising the volume of the audio file
3. Explore: At the top, users would be able to search for songs or artists, which would link to third-party services for purchasing music. At the bottom, music would be recommended to the user based on their listening tastes
4. Account: This is where users could create an account and save/load their data to/from a server
