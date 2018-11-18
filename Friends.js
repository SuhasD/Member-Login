import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert} from 'react-native';
import Sound from 'react-native-sound';


class MainView extends Component {

 componentWillMount() {
   const { navigation } = this.props;
    const name = navigation.getParam('name', 'NO-ID');
    const email = navigation.getParam('email', 'some default value');
    const pwd = navigation.getParam('pwd', 'some default value');

    this.setState({
      name: name,
      email:email,
      pwd:pwd
    })


    var song = new Sound('https://www.soundjay.com/free-music/sounds/iron-man-01.mp3', null, (error) => {
      if (error) {
        alert('failed to load the sound', error);
        this.setState({
          error:error.message
        })
      } else { // loaded successfully
        // alert('duration in seconds: ' + song.getDuration() +
        //     'number of channels: ' + song.getNumberOfChannels());
        this.setState({
          volume: .5,
          song: song,
          isPlaying: false,
          songLength: song.getDuration(),
          currentTime: 0,
          interval: null,
          error: null
        })
      }
    });
  }

  logout(){
    this.state.song.stop();
      this.setState({
      isPlaying: false,
      currentTime:0,
      interval: clearInterval(this.state.interval)
    })
      alert("You have been logged out!")
      this.props.navigation.navigate('Login',{
        name:this.state.name,
        pwd:this.state.pwd,
        email:this.state.email
      })
  }
  
  stopTrack(){
    this.state.song.stop();
      this.setState({
      isPlaying: false,
      currentTime:0,
      interval: clearInterval(this.state.interval)
    })
  }

   playTrack(){
    if(this.state.isPlaying){
      this.state.song.pause();
        this.setState({
        isPlaying: false,
        interval: clearInterval(this.state.interval)
      })
    } else {
      this.state.song.play();
      this.setState({
        isPlaying: true,
        interval: setInterval(this.tick, 1000)
      })      
    }
  }

  tick() {
    this.state.song.getCurrentTime((seconds) => {
      this.setState({
        currentTime: seconds
      })
    })
  }


  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true); // true = mixWithOthers

    this.playTrack = this.playTrack.bind(this);
    this.stopTrack = this.stopTrack.bind(this);
    this.tick = this.tick.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      volume: .5,
      isPlaying: false,
      songLength: 0,
      currentTime: 0,
      interval: null,
      error: null,
      loopingSound: false,
      isPlaying:false,
      title:"Iron Man",
      name:"No",
      pwd:"",
      email:""
    }
  }

  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.userText}>Welcome, {this.state.name}</Text>
        <Text style={styles.titleText}>Title: {this.state.title}</Text>
        <Text>Length: {this.state.songLength} seconds</Text>
        <Text>Current: {this.state.currentTime} seconds</Text>
        <Button title="Play or Pause" onPress={this.playTrack} />
        <Button  title="Stop or Reset" onPress={this.stopTrack} />

        <Button style={styles.logoutBtn} title="Logout" onPress={this.logout} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
     padding: 20,
     flex: 1,
      bottom:40,
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },

   userText:{
        textAlign: 'center',
        fontWeight: '700',
        fontSize:18,
        marginBottom:60
    },

   titleText:{
        textAlign: 'center',
        fontSize:18
    },

    logoutBtn:{
      marginBottom:100
    }
});


export default MainView;