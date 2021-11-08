/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
//Styles
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress,
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Colors from '@src/styles/Colors';
import AppPlayer from '@modules/player/AppPlayer';
import {WebClient} from '@modules/web-client/WebClient';
import {OAuth2Context} from '@environment/OAuth2Context';
import {homeStyles, modalStyles} from '@src/styles/General';
import {Playlist} from '../models/Playlist';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const MusicScreen = () => {
  let playbackState = usePlaybackState();
  const placeholder = require('@assets/favicon.png');
  const {position, duration} = useProgress();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [track, setTrack] = useState<Track & {liked: boolean; id: number}>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const {authorization} = useContext(OAuth2Context);
  const web_client = new WebClient({host: 'http://192.168.101.2', port: 8085});

  const setup = async () => {
    let cTrack: number = await TrackPlayer.getCurrentTrack();
    if (cTrack === null) {
      return;
    }
    let cT: Track = await TrackPlayer.getTrack(cTrack);
    if (cT !== undefined) {
      console.log(cT);
      setTrack(cT);
    }
  };

  const addToPlaylist = (p: Playlist) => {
    if (track === undefined) {
      ToastAndroid.show("You're not listing anything", ToastAndroid.SHORT);
      return;
    }
    if (!adding) {
      setAdding(true);
      web_client
        .post(
          '/v1/storage/music/playlist',
          JSON.stringify({
            musicId: track.id,
            playlistId: p.id,
          }),
          undefined,
          {
            Authorization: 'Bearer ' + authorization.access_token,
          },
        )
        .then(() => {
          setModalVisible(false);
          ToastAndroid.show(
            track.title + ' has been added to: ' + p.title,
            ToastAndroid.LONG,
          );
        })
        .catch(error => {
          console.log(error);
          ToastAndroid.show('Failed to add to playlist', ToastAndroid.SHORT);
        })
        .finally(() => setAdding(false));
    } else {
      ToastAndroid.show('Please wait...', ToastAndroid.SHORT);
    }
  };

  const renderPlaylist = () => {
    return playlist.length > 0 ? (
      playlist.map(p => (
        <TouchableOpacity key={p.id} onPress={() => addToPlaylist(p)}>
          <Text style={homeStyles.playlistTitle}>{p.title}</Text>
          <Text style={homeStyles.playlistText}>{p.user.fullName}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('@assets/loading.gif')}
          style={{height: 100, width: 100}}
        />
      </View>
    );
  };

  const getPlaylist = async () => {
    web_client
      .get<Playlist[]>('/v1/storage/music/playlist', undefined, {
        Authorization: 'Bearer ' + authorization.access_token,
      })
      .then(p => setPlaylist(p))
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Failed to retrieve playlist', ToastAndroid.SHORT);
      });
  };

  const events: Event[] = [
    Event.PlaybackState,
    Event.PlaybackTrackChanged,
    Event.PlaybackError,
    Event.RemotePlay,
  ];

  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const t: Track = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(t);
    }
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
  });

  const play = async () => {
    console.log(track);
    if (playbackState === State.Playing) {
      console.log('pausing');
      await TrackPlayer.pause();
    } else {
      console.log('playing');
      await TrackPlayer.play();
    }
  };

  const next = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (e) {
      ToastAndroid.show('Cannot skip to next', ToastAndroid.SHORT);
    }
  };

  const prev = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (e) {
      ToastAndroid.show('Cannot skip to prev', ToastAndroid.SHORT);
    }
  };

  const like = async () => {
    if (track !== undefined) {
      setEnabled(true);
      web_client
        .get('/v1/storage/music/like/' + track.id, undefined, {
          Authorization: 'Bearer ' + authorization.access_token,
        })
        .then(() => {
          track.liked = true;
          updateMetada(track);
        })
        .catch(error => {
          console.log(error);
          ToastAndroid.show('Failed to like this song', ToastAndroid.SHORT);
        })
        .finally(() => setEnabled(false));
      console.log('liked');
    }
  };

  const dislike = async () => {
    if (track !== undefined) {
      setEnabled(true);
      web_client
        .get('/v1/storage/music/dislike/' + track.id, undefined, {
          Authorization: 'Bearer ' + authorization.access_token,
        })
        .then(() => {
          track.liked = false;
          updateMetada(track);
        })
        .catch(error => {
          console.log(error);
          ToastAndroid.show('Failed to dislike this song', ToastAndroid.SHORT);
        })
        .finally(() => setEnabled(false));
      console.log('unliked');
    }
  };

  const updateMetada = async (t: Track) => {
    let number = await TrackPlayer.getCurrentTrack();
    TrackPlayer.updateMetadataForTrack(number, t);
  };

  useEffect(() => {
    setup();
    getPlaylist();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={Colors.BACKGROUND} />
      <SafeAreaView style={styles.container}>
        <View style={styles.maiContainer}>
          <View style={styles.artworkWrapper}>
            <Image
              source={
                track === undefined
                  ? placeholder
                  : {
                      uri: track.artwork?.toString(),
                    }
              }
              style={styles.artworkImg}
            />
          </View>
          <View>
            <Text style={styles.title}>{track?.title}</Text>
            <Text style={styles.artist}>{track?.artist}</Text>
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
            <Text style={styles.ProgressLabelTxt}>
              {AppPlayer.secondsToHHMMSS(position)}
            </Text>
            <Text style={styles.ProgressLabelTxt}>
              {AppPlayer.secondsToHHMMSS(duration)}
            </Text>
          </View>
          <View style={styles.musicControlls}>
            <TouchableOpacity onPress={prev}>
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
            <TouchableOpacity onPress={next}>
              <Ionicons
                name="play-skip-forward-outline"
                size={35}
                style={{marginTop: 25}}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomControls}>
            <TouchableOpacity
              disabled={enabled}
              onPress={() => {
                console.log(track?.liked);
                track?.liked === undefined || track.liked === false
                  ? like()
                  : dislike();
              }}>
              <Ionicons
                name={
                  track?.liked === undefined || track.liked === false
                    ? 'heart-outline'
                    : 'heart'
                }
                size={30}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="add" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <View style={modalStyles.titleView}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    Agregar a lista de reproducción
                  </Text>
                  <Ionicons
                    name="close"
                    size={22}
                    color={'white'}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <ScrollView>{renderPlaylist()}</ScrollView>
              </View>
            </View>
          </Modal>
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
    color: Colors.ACCENT,
  },

  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.ACCENT,
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
    color: Colors.GRAY5,
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
    justifyContent: 'space-around',
    width: '80%',
  },
});

export {MusicScreen};
