import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
//Styles
import Colors from '@src/styles/Colors';
import colors from '@src/styles/Colors';
import AppPlayer from '../modules/player/AppPlayer';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';

const {width} = Dimensions.get('window');

const MusicScreen = () => {
  const playbackState = usePlaybackState();
  //const playbackState = State.Paused;
  const position = 12;
  const duration = 100;

  const setup = async () => {
    AppPlayer.initializePlayer();
    await TrackPlayer.add({
      url: 'http://10.0.40.48:9090/youapp/049d1e78-bebb-4541-835d-a86def2460d0_1636089824.mp3',
      title: 'Sweather Weather',
      album: 'Album 1',
      duration: 100,
    });
  };

  console.log(playbackState);

  useEffect(() => {
    setup();
  });

  const play = async () => {
    //console.log('Current Track: ' + track);
    await TrackPlayer.play();
  };
  /*
  const play = async () => {
    const state = await TrackPlayer.getState();
    console.log('actual state' + state);
    if (state === State.Playing) {
      console.log('pausing');
      await TrackPlayer.pause();
      setPlaying(false);
      //this.isPlaying = false;
    } else {
      console.log('playing');
      await TrackPlayer.play();
      setPlaying(true);
      //this.isPlaying = true;
    }
  };*/

  return (
    <>
      <StatusBar backgroundColor={Colors.BACKGROUND} />
      <SafeAreaView style={styles.container}>
        <View style={styles.maiContainer}>
          <View style={styles.artworkWrapper}>
            <Image
              style={styles.artworkImg}
              source={require('../../assets/good.jpg')}
            />
          </View>
          <View>
            <Text style={styles.title}>Good Day</Text>
            <Text style={styles.artist}>Navey</Text>
          </View>
          <View>
            <Slider
              style={styles.progressContainer}
              value={position}
              minimumValue={0}
              maximumValue={duration}
              thumbTintColor="#00CB34"
              minimumTrackTintColor="#00CB34"
              maximumTrackTintColor="#fff"
              onSlidingComplete={async p => await TrackPlayer.seekTo(p)}
            />
          </View>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.ProgressLabelTxt}>0:00</Text>
            <Text style={styles.ProgressLabelTxt}>3:31</Text>
          </View>
          <View style={styles.musicControlls}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="play-skip-back-outline"
                size={35}
                style={{marginTop: 25}}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={play}>
              <Ionicons
                name={
                  playbackState === State.Playing
                    ? 'ios-pause-circle'
                    : 'ios-play-circle'
                }
                size={75}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="play-skip-forward-outline"
                size={35}
                style={{marginTop: 25}}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomControls}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="heart-outline" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="repeat" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="share-outline" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={30}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#220037',
  },

  maiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },

  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.ACCENT,
  },

  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: colors.ACCENT,
  },

  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },

  progressLabelContainer: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ProgressLabelTxt: {
    color: colors.GRAY5,
  },

  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  bottomContainer: {
    borderTopColor: Colors.GRAY2,
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export {MusicScreen};
