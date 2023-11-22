import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react'
import { StyleSheet, View, Image,Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

import Button from './button.js';

export default function App() {

    const [range,setRange] = useState('50%');
    const [sliding, setSliding] = useState('Inactive');


  return (
    <View style={styles.container}>
      <View style={styles.songTitle}>
        <Text style={[styles.setSongColor,styles.setSongFont]}>Song Name</Text>  
      </View> 
      <View style={styles.artistName}>
        <Text style={[styles.setArtistColor,styles.setArtistFont]}>Artist Name</Text>  
      </View> 
      <Slider  
        style = {{ width: 280, height: 40}}
        //paddingTop={100}
        //top={280}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='red'
        maximumTrackTintColor='#000'
        thumbTintColor='red'
        value={0.5}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
      />
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> Fade In / Fade Out</Text>
      </View>
      <Slider 
        style = {{ width: 280, height: 60}}
        thumbTintColor='yellow'
        minimumTrackTintColor='yellow'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
      />
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> L / R</Text>
      </View>
      <Slider 
        style = {{ width: 280, height: -40}}
        thumbTintColor='blue'
        minimumTrackTintColor='blue'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
      />
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> Speed </Text>
      </View>
      <Slider 
        style = {{ width: 280, height: -40}}
        thumbTintColor='green'
        minimumTrackTintColor='green'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
      />
      <View style={styles.editors}>
        <Text styles={[styles.setEditorColor, styles.setEditorFont]}> Volume</Text>
      </View>

      <Slider 
        style = {{ width: 300, height: -40}}
        flex= {1}
        thumbTintColor='white'
        minimumTrackTintColor='white'
        maximumTrackTintColor='#000'
        minimumValue={0}
        maximumValue={1}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
        value={0.5}
      />

      <View style={styles.footerContainer}>
        <Button label="Pause Play"/>
        <Button label="Seek(RW)"/> 
        <Button label="Seek(FF)" />
        <Button label="Seek Start" />
        <Button label="Seek End" />
        <Button label="Cut" />
        <Button label="REC" />
      </View>
      <StatusBar style= 'auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  editors: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  setEditorColor: {
    color: 'green',
  },
  setEditorFont: {
    fontSize: 10,
    fontWeight: 'bold',
  },
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
