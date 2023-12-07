import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image, 
  TextInput
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Separator = () => <View style={styles.separator} />;

const MusicPlayerApp = () => {

  return (
    //defining some screens with the navigator
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{title: 'Title', headerShown: false}}
        />

        <Stack.Screen 
          name="Test Page" 
          component={TestScreen} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TitleScreen = ({navigation}) => {
  return (
   <View>
    <Text style={styles.logo}>
      Downloaded Music Player
    </Text>
    <Button 
      title="Start Listening"
      color="#000000" 
      onPress={() =>
        navigation.navigate('Test Page')}
    />
  </View>
  );
};

const TestScreen = ({navigation}) => {
  //define functions/vars up here
  const [count, setCount] = useState(0);
  const [username, onChangeText] = useState('user');
  const [display, showDisplay] = useState(false);

  return (
   <View>
     <Text style={styles.paragraph}>
       Music library will be added soon. Here are some test functions.
     </Text>
     <Button 
       title="Count up"
       color="#aaaaaa" 
       onPress={() =>
         setCount(count + 1)}
     />
     <Text style={styles.paragraph}>
       {count}
     </Text>
     <Button 
       title="Count Down"
       color="#aaaaaa" 
       onPress={() =>
         setCount(count - 1)}
     />
     <Separator />
     <Text style={styles.paragraph}>
       Input a username.
     </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={username}
      />
     <Text style={styles.paragraph}>
       Hello, {username}.
     </Text>
     <Separator />
     <Text style={styles.paragraph}>
       Play/Pause button assets. 
     </Text>

      <Image
        style={styles.playbtn}
        source={require('./assets/play.png')}
      />
      <Image
        style={styles.playbtn}
        source={require('./assets/pause.png')}
      />
      <Text style={styles.paragraph}>
        Have considered react-native-sound-player and react-native-track-player for audio playback, but will look further into it before the next update.

      </Text>
  </View>
  );
};


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
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 12,
  },
  playbtn: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MusicPlayerApp;

AppRegistry.registerComponent('MusicPlayerApp', () => MusicPlayerApp);
