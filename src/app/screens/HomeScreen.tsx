/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Styles
import {homeStyles} from '@src/styles/General';
import Colors from '@src/styles/Colors';
import {OAuth2Context} from '../environment/OAuth2Context';
import {WebClient} from '../modules/web-client/WebClient';
import {Music} from '../models/Music';
import AppPlayer from '../modules/player/AppPlayer';
import TrackPlayer, { State } from 'react-native-track-player';

const HomeScreen = (props: any) => {
  const {authorization,setAuthorization}  = useContext(OAuth2Context);
  const {navigation} = props;
  const [songs,setSongs] = useState<Music[]>([]);

  const web_client = new WebClient({host:'http://192.168.101.2',port:8085});

  const setup = async () => {
    await AppPlayer.initializePlayer();
    web_client
    .get<Music[]>('/v1/storage/music/',undefined
    ,{
      Authorization: 'Bearer ' + authorization.access_token,
    })
    .then(s => {
      setSongs(s);
    })
    .catch(error => {
      console.log('got error');
      console.log(error);
      ToastAndroid.show('Failed to retrieve music ' + error.message , ToastAndroid.SHORT);
    });
  };

  const logout = () => {
    setAuthorization({
      loggedIn: false,
    });
  };

  useEffect(() => {
    setup();
  }, []);


  const goToScreen = (routeName: string) => {
    navigation.navigate(routeName);
  };

  const addQueue = async (song: Music) => {
    //console.log(song);
    await TrackPlayer.add({
      url: song.uri,
      title: song.title,
      artwork: song.photo,
      artist: song.user.fullName,
      duration: song.duration,
    });
    const state = await TrackPlayer.getState();
    if (state !== State.Playing){
      TrackPlayer.play().then(() => goToScreen('Music'));
    } else {
      ToastAndroid.show('Song has been added to queue',ToastAndroid.SHORT);
    }
  };

  const renderItems = () => {
    return songs !== undefined ?
      songs.map(s => (
      <TouchableOpacity style={{marginLeft: 24}} key={s.id} onPress={() => addQueue(s)}>
        <Image source={{uri: s.photo}} style={{width: 200, height: 200}} />
        <Text style={homeStyles.playlistTitle}>{s.title}</Text>
        <Text style={homeStyles.playlistText}>{s.user.fullName}</Text>
      </TouchableOpacity> )
      )
    : <Text>Cargando</Text>;
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
          <View style={homeStyles.inputSearch}>
            <Ionicons
              style={homeStyles.iconSearch}
              name="search-outline"
              size={20}
              color={Colors.GRAY3}
            />
            <TextInput
              placeholder="Song or artist"
              placeholderTextColor={Colors.GRAY3}
              style={homeStyles.textInput}
            />
          </View>
          <View>
            <View style={homeStyles.playBox}>
              <Text style={homeStyles.playText}>Playlists</Text>
              <Ionicons
                style={homeStyles.palyArrow}
                name="chevron-forward-outline"
                size={15}
                color={Colors.ACCENT}
              />
            </View>
            <ScrollView horizontal>
              <View style={homeStyles.playlistBoxes}>
                {renderItems()}
              </View>
            </ScrollView>
          </View>
          <View>
            <View style={[homeStyles.playBox, {marginTop: 24}]}>
              <Text style={homeStyles.playText}>Favorite</Text>
              <Ionicons
                style={{marginTop: 10}}
                name="chevron-forward-outline"
                size={15}
                color={Colors.ACCENT}
              />
            </View>
            <View style={{marginTop: 16}}>
              <View style={{flexDirection: 'row'}}>
                <View style={homeStyles.favIcon}>
                  <Image
                    style={{marginTop: 10, marginLeft: 8}}
                    source={require('@assets/Music.png')}
                  />
                </View>
                <View style={{marginTop: -16}}>
                  <Text style={homeStyles.favTitle}>
                    Holy (feat. Chance the Rapper)
                  </Text>
                  <Text style={homeStyles.favSubTitle}>Justin Bieber</Text>
                </View>
                <Ionicons
                  style={{marginTop: -8, marginLeft: 60}}
                  name="heart-outline"
                  size={25}
                  color={Colors.PRIMARY}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <View style={homeStyles.favIcon}>
                  <Image
                    style={{marginTop: 10, marginLeft: 8}}
                    source={require('@assets/Music.png')}
                  />
                </View>
                <View style={{marginTop: -16}}>
                  <Text style={homeStyles.favTitle}>
                    Holy (feat. Chance the Rapper)
                  </Text>
                  <Text style={homeStyles.favSubTitle}>Justin Bieber</Text>
                </View>
                <Ionicons
                  style={{marginTop: -8, marginLeft: 60}}
                  name="heart-outline"
                  size={25}
                  color={Colors.PRIMARY}
                />
              </View>
            </View>
          </View>
          <View>
            <Ionicons
              name="musical-notes-outline"
              size={30}
              color={Colors.ACCENT}
              onPress={() => goToScreen('Music')}
            />
          </View>
        </View>
      </>
    );
};

export {HomeScreen};
