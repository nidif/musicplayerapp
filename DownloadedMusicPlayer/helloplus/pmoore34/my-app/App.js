import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import Button from './button.js';

const backgroundImage = require('./assets/Images/background_2.jpg');
const backgroundGif = require('./assets/Images/background_image_SGGif.gif');

export default function App() {
  return (
    <View style={styles.container}>
      <View style= {styles.title}> {'Hello World Plus'} </View>
      <View style={styles.imageContainer}>
        <Image source= {backgroundGif} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Click Button" />
        <Button label= "Dont Click button"/>
      </View>
      <StatusBar style= 'auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    flex: 1 / 10,
    color: 'yellow',
    fontSize: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 1,
  },
  imageContainer: {
      flex: 1,
      paddingTop: 25,
  },
  image: {
      width: 320,
      height: 200,
      borderRadius: 18,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
