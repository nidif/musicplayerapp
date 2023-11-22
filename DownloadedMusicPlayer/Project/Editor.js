import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import Trimmer from "react-native-trimmer";
/*
var AudioTools = require('react-native-audio-video-tools');


const audioTools = new AudioTools('C:/Users/Mccad/OneDrive/Desktop/CS340/DownloadedMusicPlayer/DownloadedMusicPlayer/assets/sound.mp3');

audioTools.getDetails().then(details => {
    console.log("Duration: " + details.duration);
})
*/
const maxTrimDuration = 60000;
const minimumTrimDuration = 1000;
const totalDuration = 180000;

const initialLeftHandlePosition = 0;
const initialRightHandlePosition = 36000;

const scrubInterval = 10;




export default class Editor extends Component {

  // sets everything to off or initial Pos
  state = {
    playing: false,
    trimmerLeftHandlePosition: initialLeftHandlePosition,
    trimmerRightHandlePosition: initialRightHandlePosition,
    scrubberPosition: 1000
  };

  play = () => {
    this.setState({ playing: true });
    // update pos of scrubber
    this.scrubberInterval = setInterval(() => {
      this.setState({
        scrubberPosition: this.state.scrubberPosition + scrubInterval
      });
    }, scrubInterval);
  };

  pause = () => {
    clearInterval(this.scrubberInterval);
    // stops pos of scrubber
    this.setState({
      playing: false,
      scrubberPosition: this.state.scrubberPosition
    });
  };

  // deals with the change of the trimming size
  onHandleChange = ({ leftPosition, rightPosition }) => {
    this.setState({
      trimmerRightHandlePosition: rightPosition,
      trimmerLeftHandlePosition: leftPosition
    });
  };

  // keeps scrubber at postion it was left off
  onScrubbingComplete = (newValue) => {
    this.setState({ playing: false, scrubberPosition: newValue });
  };

  render() {
    const {
      trimmerLeftHandlePosition,
      trimmerRightHandlePosition,
      scrubberPosition,
    } = this.state;

    return (
      <View>
        <Trimmer
          onHandleChange={this.onHandleChange}
          totalDuration={totalDuration}
          trimmerLeftHandlePosition={trimmerLeftHandlePosition}
          trimmerRightHandlePosition={trimmerRightHandlePosition}
          minimumTrimDuration={minimumTrimDuration}
          maxTrimDuration={maxTrimDuration}
          //initialZoomValue={0.5}
          scaleInOnInit={false}
          tintColor="blue"
          markerColor="grey"
          trackBackgroundColor="powderblue"
          trackBorderColor="blue"
          scrubberColor="black"
          scrubberPosition={scrubberPosition}
          onScrubbingComplete={this.onScrubbingComplete}
        />
          <Button title="Pause" color="darkblue" onPress={this.pause} />
          <Button title="Play" color="darkblue" onPress={this.play} />
          <Button title="Cut" color="darkblue" onPress={this.play} />
      </View>
    );
  }
}
