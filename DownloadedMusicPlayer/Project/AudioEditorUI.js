
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image,Text, Pressable, Share} from 'react-native';
import Editor from './Editor.js';
//import {AudioTools} from 'react-native-audio-video-tools';

import Button from './button.js';

export default function AudioEditorUI() {

    // sharing file to local storage
  const customShare = async () => {

     Share.share(
      {
        title: "shared",
        message: "some message",
      }
     );
  };


  return (
      <View style={styles.container}>
      <View>
        <Text style={styles.title}> 
          AUDIO EDITOR
        </Text>
        <Text style={styles.shareButton} color="black" onPress={customShare} /*SHARE BUTTON*/> 
          SHARE
        </Text>
        <Editor /* AUDIO EDITOR PAGE */ />
      </View>
     
    </View>

const styles = StyleSheet.create({
  title: {
    paddingTop: 40,
    flex: 1 / 10,
    color: 'yellow',
    fontSize: 10,
  },
  setTitleColor: {
    color: 'white',
  },
  setTitleFont: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  songTitle: {
    paddingTop: 10,
    flex: 1 / 10,
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    left: -130,
  },
  setSongColor: {
    color: 'white',
  },
  setSongFont: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  artistName: {
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 10,
    left: -140,
    shadowColor: 'black',
    shadowOffset: 10,
    shadowOpacity: 40,
    shadowRadius: 100,
  },
  setArtistColor: {
    color: 'white',
  },
  setArtistFont: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
