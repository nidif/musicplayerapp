import {
    AppRegistry,
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Switch,
    ScrollView,
} from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Trimmer from 'react-native-trimmer';
import Editor from './Editor'

// Settings imports
import { exportPreferences, importPreferences } from './preferences.js';
const mm = require('music-metadata');

// Library imports
import './Library.css';
import { clear } from '@testing-library/user-event/dist/clear';

const Stack = createNativeStackNavigator();
const Separator = () => <View style={styles.separator} />;

// Song Information
const folders = []; 
const track_list = {};
/*
Tracklist:
  1: {
    Title: "SongName"
    Artist: "ArtistName"
    Album: "AlbumName"
    Path: "filename.mp3"
    // possibly need to add more fields here
  }
*/

// Editor Constants
const maxTrimDuration = 60000;
const minimumTrimDuration = 1000;
const totalDuration = 180000;

const initialLeftHandlePosition = 0;
const initialRightHandlePosition = 36000;

const scrubInterval = 10;

const MusicPlayerApp = () => {

    return (
        //defining some screens with the navigator
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="Title"
                    component={TitleScreen}
                    options={{ title: 'Title', headerShown: false }}
                />

                <Stack.Screen
                    name="Library Page"
                    component={LibraryScreen}
                />

                <Stack.Screen
                    name="Editor Page"
                    component={EditorScreen}
                />

                <Stack.Screen
                    name="Explore Page"
                    component={ExploreScreen}
                />

                <Stack.Screen
                    name="Settings Page"
                    component={SettingsScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

//title page, library page is set for inital landing page
const TitleScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.logo}>
                Downloaded Music Player
            </Text>
            <Button
                title="Start Listening"
                color="#000000"
                onPress={() =>
                    navigation.navigate('Library Page')}
            />
        </View>
    );
};

// library/player page goes here
const LibraryScreen = ({ navigation }) => {
    // FUNCTIONS:

    let filter_open = false;
    let persistent_list = {};
    let current_sort = "Title";

    // *** Playback Functions: ***
    const [sound, setSound] = React.useState();

    //load track .. can stop by reloading track also
    async function loadSound(songPath) {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require(songPath));
        setSound(sound);
    }

    //play
    async function play(track_index) {
        console.log('Loading Sound');
        let file = track_list[track_index].Path;
        loadSound(file);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    //pause
    async function pauseSound() {
        console.log('Pausing Sound');
        await sound.pauseAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // *** Library Functions: ***

    function find(list, value) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == value) {
                return i;
            }
        }
        return -1;
    }

    function get_names(category) {
        let list = [];
        for (let i = 0; i < Object.keys(persistent_list).length; i++) {
            let name = persistent_list[i][category];
            if (find(list, name) == -1) {
                list.push(name);
            }
        }
        return list;
    }

    // still arbitrary data, will read metadata once it's added
    function load_info() {
        for (let i = 0; i < 20; i++) { // copy pasted code from here
            let new_info = {};
            new_info["Title"] = "Track" + (Math.floor(Math.random() * 90) + 10);
            let a = "Helo";
            if (i < 10) {
                a = "Jelo";
            }
            new_info["Artist"] = a;
            new_info["Album"] = "AlbumName";
            new_info["Path"] = "placeholder.mp3";
            persistent_list[i] = new_info;
            //track_list[i] = new_info;
        } // until here
        track_list = persistent_list;
    }

    function get_songs(dst_list, src_list, by, name) { // copy pasted code from here
        let index = 0;
        for (let i = 0; i < Object.keys(src_list).length; i++) {
            if (src_list[i][by] == name) { // if a track's title/album/artist name matches the given name
                dst_list[index] = src_list[i];
                index += 1;
            }
        }
    } // until here

    function sort(list, by) { // copy pasted code from here
        // for now uses bubble sort, but could be revised for faster sorting later
        let length = Object.keys(list).length;
        for (let i = 0; i < length - 1; i++) {
            let swap_necessary = false;
            for (let j = 0; j < length - 1 - i; j++) {
                if (list[j][by] > list[j + 1][by]) {
                    swap_necessary = true;
                    let entry = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = entry;
                }
            }

            if (swap_necessary == false) {
                break;
            }
        }
    } // until here

    function apply_changes(behavior, by, name) { // copy pasted code from here
        // 'behavior' determines if it's sort or filter
        // 'by' determines what to sort or filter by ("Title", "Artist", "Album")
        // 'name' is what artist/playlist/album name to filter by
        //load_info();
        track_list = persistent_list;

        if (behavior == "sort") {
            if (by == "Title") {
                sort(track_list, by);
            } else {
                let index = 0;
                let all_artists = {}; // list of all artists/albums in the library
                for (let i = 0; i < Object.keys(track_list).length; i++) {
                    let do_not_add = false;
                    for (let j = 0; j < Object.keys(all_artists).length; j++) {
                        if (all_artists[j][by] == track_list[i][by]) {
                            do_not_add = true;
                            break;
                        }
                    }
                    if (do_not_add == false) {
                        let new_info = {};
                        new_info[by] = track_list[i][by];
                        all_artists[index] = new_info;
                        index += 1;
                    }
                }

                sort(all_artists, by);
                let temp_list = {};
                for (let k = 0; k < Object.keys(all_artists).length; k++) {
                    let filtered_songs = {};
                    get_songs(filtered_songs, track_list, by, all_artists[k][by]); // partitions by category
                    sort(filtered_songs, "Title"); // sorts each category

                    let start = Object.keys(temp_list).length;
                    for (let i = 0; i < Object.keys(filtered_songs).length; i++) { // adds to main list
                        temp_list[start + i] = filtered_songs[i];
                    }
                }
                track_list = temp_list;
            }
        } else if (behavior == "filter") {
            let filtered_list = {};
            get_songs(filtered_list, track_list, by, name);
            sort(filtered_list, current_sort);
            track_list = filtered_list;
        }
    } // until here

    function display_songs() {
        const lib = document.getElementById("library");

        for (let i = 0; i < Object.keys(track_list).length; i++) {
            let title = track_list[i].Title;
            let artist = track_list[i].Artist;

            const separator_div = document.createElement("div");
            const list_div = document.createElement("div");
            const button_div = document.createElement("div");
            const text_div = document.createElement("div");

            const play_button = document.createElement("button");
            const title_text = document.createElement("p");
            const title_node = document.createTextNode(title);
            const artist_text = document.createElement("p");
            const artist_node = document.createTextNode(artist);
            list_div.setAttribute("class", "track");
            button_div.setAttribute("class", "button_section");
            text_div.setAttribute("class", "text_section");
            play_button.setAttribute("class", "play_button")
            separator_div.setAttribute("style", "height: 5px; width: 100%;")
            title_text.setAttribute("class", "title_class");
            artist_text.setAttribute("class", "artist_class");

            const image = document.createElement("img");
            image.setAttribute("src", "./assets/play.png")
            image.setAttribute("class", "play_image");
            play_button.appendChild(image);
            play_button.addEventListener("click", (event) => {
                play(i);
            })

            // adds button section to row
            button_div.appendChild(play_button);
            list_div.appendChild(button_div);

            // adds text section to row
            text_div.appendChild(title_text);
            list_div.appendChild(text_div);
            text_div.appendChild(artist_text)

            title_text.appendChild(title_node);
            artist_text.appendChild(artist_node);
            lib.appendChild(list_div);
            lib.appendChild(separator_div);
        }
    }

    function clear_songs() {
        const lib = document.getElementById("library");

        while (lib.hasChildNodes()) {
            lib.removeChild(lib.firstChild);
        }
    }

    function sort_clicked() {
        if (current_sort == "Title") {
            current_sort = "Artist";
        } else if (current_sort == "Artist") {
            current_sort = "Album";
        } else if (current_sort == "Album") {
            current_sort = "Title";
        }

        const sort_text = document.getElementById("sort_text");
        sort_text.textContent = "Sorting by " + current_sort;
        apply_changes("sort", current_sort);
        clear_songs();
        display_songs();
    }

    function clear_filter() {
        const filter = document.getElementById("filter");
        while (filter.hasChildNodes()) {
            filter.removeChild(filter.firstChild);
        }
    }

    function filter_chosen(by, name) {
        clear_filter();
        filter_open = false;
        apply_changes("filter", by, name);
        clear_songs();
        display_songs();
    }

    function fill_filter(by) {
        const filter = document.getElementById("filter");
        clear_filter();
        let list = get_names(by);
        for (let i = 0; i < list.length; i++) {
            const button = document.createElement("button");
            const button_text = document.createElement("p");
            const button_node = document.createTextNode(list[i]);
            button_text.setAttribute("class", "filter_text");
            button.setAttribute("class", "filter_option");
            button.addEventListener("click", () => filter_chosen(by, list[i]));
            button_text.appendChild(button_node);
            button.appendChild(button_text);
            filter.appendChild(button);
        }
    }

    function filter_clicked() {
        const filter = document.getElementById("filter");
        if (filter_open) {
            clear_filter();
            filter_open = false;
        } else {
            filter_open = true;
            const artist = document.createElement("button");
            const artist_text = document.createElement("p");
            const artist_node = document.createTextNode("Artists");
            artist_text.setAttribute("class", "filter_text");
            artist.setAttribute("class", "filter_option");
            artist.addEventListener("click", () => fill_filter("Artist"));
            artist_text.appendChild(artist_node);
            artist.appendChild(artist_text);
            filter.appendChild(artist);

            const album = document.createElement("button");
            const album_text = document.createElement("p");
            const album_node = document.createTextNode("Albums");
            album_text.setAttribute("class", "filter_text");
            album.setAttribute("class", "filter_option");
            album.addEventListener("click", () => fill_filter("Album"));
            album_text.appendChild(album_node);
            album.appendChild(album_text);
            filter.appendChild(album);
        }
    }

    function playlist_clicked() {

    }

    React.useEffect(() => {
        const filter_div = document.createElement("div");
        filter_div.setAttribute("class", "filter");
        filter_div.setAttribute("id", "filter");
        document.body.appendChild(filter_div);

        const lib = document.createElement("div");
        lib.setAttribute("id", "library");
        document.body.appendChild(lib);

        load_info();
        apply_changes("sort", "Title"); // sorts by title name by default
        display_songs();
    });

    // USER INTERFACE, modified by above code:
    return (
        <View style={styles.screensize}>
            <div id="top_bar">
                <button id="sort_button" class="top_button" onClick={sort_clicked}>
                    <p id="sort_text" class="top_text">Sorting by Title</p>
                </button>

                <button id="filter_button" class="top_button" onClick={filter_clicked}>
                    <p class="top_text">Filter</p>
                </button>

                <button id="playlist_button" class="top_button" onClick={playlist_clicked}>
                    <p class="top_text">Playlists</p>
                </button>
            </div>

            <Separator />

            <View style={styles.libbtn}>
                <Button
                    title="Library"
                    color="#aaaaaa"
                    onPress={() => navigation.navigate('Library Page')}
                />
            </View>
            <View style={styles.editbtn}>
                <Button
                    title="Editor"
                    color="#aaaaaa"
                    onPress={() => navigation.navigate('Editor Page')}
                />
            </View>
            <View style={styles.explorebtn}>
                <Button
                    title="Explore"
                    color="#aaaaaa"
                    onPress={() => navigation.navigate('Explore Page')}
                />
            </View>
            <View style={styles.setbtn}>
                <Button
                    title="Settings"
                    color="#aaaaaa"
                    onPress={() => navigation.navigate('Settings Page')}
                />
            </View>
        </View>
    );
};

const EditorScreen = ({navigation}) => {

  // Functionality
  const customShare = async () => {
    Share.share(
    {
      title: "shared",
      message: "some message",
    }
    );
  };

  return(
    <View style={styles.screensize}>
        <Text style={styles.audioTitle}> 
          AUDIO EDITOR
        </Text>
        <Text style={styles.shareButton} color="black" onPress={customShare} /*SHARE BUTTON*/>
          SHARE
        </Text>
        <Editor /* AUDIO EDITOR PAGE */ />
     
    <Separator />


     <View style={styles.libbtn}>
       <Button
         title="Library"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Library Page')}
       />
     </View>
     <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
      <View style={styles.setbtn}>
       <Button
         title="Settings"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Settings Page')}
       />
     </View>
   </View>
  );
}

const ExploreScreen = ({navigation}) => {
  const songjson = require('./songs.json');

  var songlist = [];
  
  for (let i = 0; i < 100; i++) {
    songlist.push(
      <View key={i}>
      <Text style={{fontWeight: 'bold'}}>#{(songjson[i].position)}</Text>
      <Text>{(songjson[i].name)} - {(songjson[i].artist)}</Text>
      <Text> </Text>
      </View>
    );
  }


  return(
    <View style={styles.screensize}>
    <ScrollView>
    <Text style={{fontWeight: 'bold', fontSize: 20, margin:20, textAlign: 'center'}}>
    Billboard Hot 100
    </Text>
    <Text style={{textAlign: 'center'}}>Explore some of today's hottest tracks.</Text>
    <Separator />
    <View style={{fontSize: 16, margin: 20, textAlign: 'center'}}>
    {songlist}
    </View>
    </ScrollView>
    <Separator />
     <View style={styles.libbtn}>
       <Button
         title="Library"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Library Page')}
       />
     </View>
     <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
      <View style={styles.setbtn}>
     <Button
         title="Settings"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Settings Page')}
       />
     </View>
   </View>
  );
}

//where settings page code goes... wip
const SettingsScreen = ({ navigation }) => {
    // State Information
    const [username, onChangeText] = useState('user');
    const [folder, onChangeText2] = useState(' ');
    const [mp3, onChangeText3] = useState(' ');
    const [setting1, setIsEnabled1] = useState(false);
    const [setting2, setIsEnabled2] = useState(false);
    const [setting3, setIsEnabled3] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
    // Settings Functions
    const handleFolderButtonPress = () => {
        // Handle folder addition logic...
        addFolder(dir);
        alert('Folder Button pressed!');
    };

    const handleSearchButtonPress = () => {
        // Iterate through the dictionary of folders and search for MP3s in each.
        for (const folderName in folders) {
            if (folders.hasOwnProperty(folderName)) {
                const folderPath = folders[folderName];
                searchForMP3s(folderPath, folderName);
            }
        }
        alert('Search Button pressed!');
    };

    const handleExportButtonPress = () => {
        // Handle Export Preferences logic...
        exportPreferences(dir, library);
        alert('Export Button pressed!');
    };

    const handleImportButtonPress = () => {
        // Handle Import Preferences logic...
        importPreferences(dir, handleImportedPreferences);
        alert('Import Button pressed!');
    };


    return (
        <View style={styles.screensize}>
            <Separator />
            <Text style={styles.paragraph}>
                Username is {username}.
            </Text>
            
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={username}
            />
                <Separator />
            {/* Folder Button */}
            <View>
                <Button title="Add Folder" color="#aaaaaa" onPress={handleFolderButtonPress} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={folder}
            />
            {/* Search Button */}
            <View>
                <Button title="Search MP3s" color="#aaaaaa" onPress={handleSearchButtonPress} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText3}
                value={mp3}
            />
            {/* Export Button */}
            <View>
                <Button title="Export Preferences" color="#aaaaaa" onPress={handleExportButtonPress} />
            </View>

            {/* Import Button */}
            <View>
                <Button title="Import Preferences" color="#aaaaaa" onPress={handleImportButtonPress} />
            </View>
          
    <Separator />

     <View style={styles.libbtn}>
       <Button
         title="Library"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Library Page')}
       />
     </View>
     <View style={styles.editbtn}>
        <Button
          title="Editor"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Editor Page')}
        />
      </View>
      <View style={styles.explorebtn}>
        <Button
          title="Explore"
          color="#aaaaaa" 
          onPress={() => navigation.navigate('Explore Page')}
        />
      </View>
     <View style={styles.setbtn}>
     <Button
         title="Settings"
         color="#aaaaaa" 
         onPress={() => navigation.navigate('Settings Page')}
       />
     </View>
   </View>

  );
}

//styles go here...
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
  },
  logo: {
    paddingTop: 200,
    height: 400,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  screensize:{
    height: 755,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 12,
  },
  playbtn: {
    width: 50,
    height: 50,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  libbtn: {
    right: 300,
    left: 0,
    width: "26%",
    position: 'absolute',
    bottom: 0,
  },
  editbtn: {
    right: 200,
    left: 105,
    width: "26%",
    position: 'absolute',
    bottom: 0,
  },
  explorebtn: {
    right: 100,
    left: 206,
    width: "26%",
    position: 'absolute',
    bottom: 0,
  },
  setbtn: {
    right: 0,
    left: 307,
    width: "26%",
    position: 'absolute',
    bottom: 0,
  },
  title: {
    opacity: 0,
  },
  trackplayer: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'row', 
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#737373',
    width: '100%',
    fontSize: 24,
    position: "absolute",
    bottom: 37
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row', 
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 20,
  },
  audioTitle: {
    left: 90,
    paddingTop: 40,
    marginRight: 40,
    color: 'blue',
    fontSize: 30,
    fontWeight: 'bold',
}, 
  shareButton: {
      left: 330,
      top: -20,
      alignContent: 'center',
      alignItems: 'center',
      fontSize: 10,
      fontWeight: 'bold',
  }
});

// Settings Screen Functions
// Get MP3 Metadata
async function getMP3Metadata(filePath) {
    try {
        const metadata = await mm.parseFile(filePath, { native: true });
        const { common } = metadata;

        const title = common.title || path.basename(filePath, '.mp3');
        const artist = common.artist || 'Unknown Artist';
        const album = common.album || 'Unknown Album';

        return { title, artist, album };
    } catch (error) {
        console.error(`Error reading metadata for ${filePath}: ${error.message}`);
        return null;
    }
}

// Function to recursively search for MP3 files in a folder.
function searchForMP3s(dir, folderName) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            // If it's a directory, recursively search it.
            searchForMP3s(filePath, folderName);
        } else {
            // Check if the file is an MP3.
            if (path.extname(filePath) === '.mp3') {
                // Extract metadata
                const metadata = getMP3Metadata(filePath);
                let newTrack = {};

                if (metadata) {
                    // Add the track information to track_list
                    newTrack = {
                        Title: metadata.title,
                        Artist: metadata.artist,
                        Album: metadata.album,
                        Path: filePath,
                    };
                }

                track_list.push(newTrack);
            }
        }
    });
}

function addFolder(fldr) {
    folders.push(fldr);
}

// Function to handle imported preferences
function handleImportedPreferences(preferences) {
    // Check if preferences are valid
    if (preferences && Array.isArray(preferences)) {
        // You can now use the preferences as needed
    } else {
        console.error('Invalid preferences data.');
    }
}

export default MusicPlayerApp;
AppRegistry.registerComponent('MusicPlayerApp', () => MusicPlayerApp);
