# Sprint 2

Skye Nidiffer - GH ID: nidif - Downloaded Music Player

### What you planned to do
Catch up from Sprint 1's issues...
- Audio Playback (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/6)
- Play and Pause UI (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/7)
- Player Information (display title, artist, length) (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/8)
- Implement Different Tabs (UI buttons only, separate pages will be linked later) (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/11)

### What you did not do
- Wanted to add a bar for song length/current time in song to the track player info UI, but instead just put space to where it could display time in text format (eg. 00:00/05:12)
- Aside from that, the playback, basic player UI functions, and tabs are doing what they need to. Further polish could be applied in the future.

### What problems you encountered
- Originally, I had trouble with finding an audio library/module that worked, but my teammates found one that worked well and I was able to work from there. There weren't many other issues that couldn't be worked out by looking at the documentation for either a module or React Native/Expo. 

### Issues you worked on
- Implement Different Tabs (UI buttons only, separate pages will be linked later) (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/11)
- Audio Playback (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/6)
- Play and Pause UI (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/7)
- Player Information (display title, artist, length) (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/8)

### Files you worked on
- DownloadedMusicPlayer/SkeletonCode/App.js - App code with tabs and placeholder pages, pages are to be filled. Functional play/pause/stop button UIs. Added currently playing track UI at bottom, has info for album cover, artist name, track name, track length, and play/pause/stop.
- DownloadedMusicPlayer/SkeletonCode/assets/ - Misc assets, play/pause/stop buttons, app icon, loading splash screen.

### What you accomplished 
- I have a decent framework for the app done, and some library and track playing functionality. So far, the splash screen, title page, tabs and other pages, and play/pause/stop alongside the track info on the library track player are implemented in my App.js. Most of my work was in the frontend and getting the app built up to where other features could be added, and then some work in the library tab for track playing and information display. For audio I used the Expo Audio library, and for tabs I used the React Navigation library. Going forward I plan to help getting the different parts of our app integrated, and I plan on working on the library to develop it further and to integrate my work with the other work done for the library backend.
