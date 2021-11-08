/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Styles
import {homeStyles, modalStyles} from '@src/styles/General';
import Colors from '@src/styles/Colors';
import {OAuth2Context} from '../environment/OAuth2Context';
import {WebClient} from '../modules/web-client/WebClient';
import {Music} from '../models/Music';
import AppPlayer from '../modules/player/AppPlayer';
import { Navbar } from './Navbar';
import TrackPlayer from 'react-native-track-player';
import { Playlist } from '../models/Playlist';
import InputBox from '@src/styles/InputBox';
import { Button } from 'react-native-elements';

const HomeScreen = (props: any) => {
  const {authorization,setAuthorization}  = useContext(OAuth2Context);
  const {navigation} = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [songs,setSongs] = useState<Music[]>([]);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [favorites, setFavorites] = useState<Music[]>([]);

  const web_client = new WebClient();

  const getFavorites = () => {
    web_client.get<Music[]>('/v1/storage/music/favorites',undefined,{
      Authorization: 'Bearer ' + authorization.access_token,
    }).then(s => setFavorites(s))
    .catch(error => {
      console.log(error);
      ToastAndroid.show('Failed to retrieve music ' + error.message , ToastAndroid.SHORT);
    });
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

  const setup = async () => {
    web_client
    .get<Music[]>('/v1/storage/music/',undefined
    ,{
      Authorization: 'Bearer ' + authorization.access_token,
    })
    .then(s => {
      setSongs(s);
    })
    .catch(error => {
      console.log(error);
      ToastAndroid.show('Failed to retrieve music ' + error.message , ToastAndroid.SHORT);
    });
  };

  const logout = async () => {
    await TrackPlayer.stop();
    setAuthorization({
      loggedIn: false,
    });
  };

  useEffect(() => {
    setup();
    getFavorites();
    getPlaylist();
  }, []);


  const goToScreen = (routeName: string) => {
    navigation.navigate(routeName);
  };

  const addSong = (music: Music) => {
    AppPlayer.addMusic(music).then(f => {
      if (f) {
        goToScreen('Music');
      }
    });
  };

  const renderSongs = () => {
    return renderItems(songs);
  };

  const renderFavorites = () => {
    return renderItems(favorites);
  };

  const createPlaylist = () => {
    if (title.length > 3){
      setProgress(true);
      web_client.post<Playlist>('/v1/storage/music/playlist/add',JSON.stringify({
        title: title,
      }),undefined,{
        Authorization: 'Bearer '+ authorization.access_token,
      }).then(r => {
        setModalVisible(false);
        ToastAndroid.show('Playlist: ' + r.title + ' has been created',ToastAndroid.SHORT);
        getPlaylist();
      }).catch(error => {
        console.log(error);
        ToastAndroid.show('Failed to created playlist',ToastAndroid.SHORT);
      }).finally(() => setProgress(false));

    } else {
      ToastAndroid.show('Invalid title',ToastAndroid.SHORT);
    }
  };

  const addPlaylist = (c: Music[]) => {
    AppPlayer.addMusic(...c).then(f => {
      if (f) {
        goToScreen('Music');
      }
    });
  };

  const renderPlaylist = () => {
    return playlist.length > 0 ?
      playlist.map(s => (
        <TouchableOpacity style={{marginLeft: 24}} key={s.id} onPress={() => addPlaylist(s.songs)}>
        <Image source={require('@assets/favicon.png')} style={{width: 150, height: 150}} />
        <Text style={homeStyles.playlistTitle}>{s.title}</Text>
        <Text style={homeStyles.playlistText}>{s.user.fullName}</Text>
      </TouchableOpacity>
      ))
      : (<View style={{alignItems: 'center'}}>
      <Image
        source={require('@assets/loading.gif')}
        style={{height: 100, width: 100}}
        />
    </View>);
  };

  const renderItems = (music: Music[]) => {
    return music.length > 0  ?
    music.map(s => (
    <TouchableOpacity style={{marginLeft: 24}} key={s.id} onPress={() => addSong(s)}>
      <Image source={{uri: s.photo}} style={{width: 150, height: 150}} />
      <Text style={homeStyles.playlistTitle}>{s.title}</Text>
      <Text style={homeStyles.playlistText}>{s.user.fullName}</Text>
    </TouchableOpacity> )
    )
  : (<View style={{alignItems: 'center'}}>
      <Image
        source={require('@assets/loading.gif')}
        style={{height: 100, width: 100}}
        />
    </View>);
  };

    return (
      <>
        <StatusBar backgroundColor={Colors.BACKGROUND} />
        <View style={homeStyles.container}>
          <View style={homeStyles.Header}>
            <Text style={homeStyles.headerTitle}>Libreria</Text>
            <Ionicons
              onPress={logout}
              style={homeStyles.Exit}
              name="exit-outline"
              size={30}
              color={Colors.ACCENT}
            />
          </View>
          <ScrollView>
            <View>
              <View style={homeStyles.playBox}>
                <Text style={homeStyles.playText}>All</Text>
                <Ionicons
                  style={homeStyles.palyArrow}
                  name="chevron-forward-outline"
                  size={15}
                  color={Colors.ACCENT}
                />
              </View>
              <ScrollView horizontal contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
                <View style={homeStyles.playlistBoxes}>
                {renderSongs()}
                </View>
              </ScrollView>
            </View>
            <View>
              <View style={homeStyles.playBox}>
                <Text style={homeStyles.playText}>Favoritas</Text>
                <Ionicons
                  style={homeStyles.palyArrow}
                  name="chevron-forward-outline"
                  size={15}
                  color={Colors.ACCENT}
                />
              </View>
              <ScrollView horizontal contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
                <View style={homeStyles.playlistBoxes}>
                {renderFavorites()}
                </View>
              </ScrollView>
            </View>
            <View>
              <View style={homeStyles.playBox}>
                <Text style={homeStyles.playText}>Listas de reproducción</Text>
                <Ionicons
                  style={homeStyles.palyArrow}
                  name="add"
                  size={15}
                  color={Colors.ACCENT}
                />
              </View>
              <ScrollView horizontal contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
                <View style={homeStyles.playlistBoxes}>
                {renderPlaylist()}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
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
                    Crear lista de reproducción
                  </Text>
                  <Ionicons
                    name="close"
                    size={22}
                    color={'white'}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <InputBox
                    keyboardType="default"
                    placeholder="Titutlo"
                    image="music"
                    onChangeText={(e) => setTitle(e)}
                  />
                  <Button disabled={progress}
                  style={{marginTop: 15}}
                  onPress={createPlaylist}
                  title="Agregar"
                  type="outline"
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <Navbar />
      </>
    );
};

export {HomeScreen};
