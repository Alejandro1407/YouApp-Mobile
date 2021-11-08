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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Styles
import {homeStyles} from '@src/styles/General';
import Colors from '@src/styles/Colors';
import {OAuth2Context} from '../environment/OAuth2Context';
import {WebClient} from '../modules/web-client/WebClient';
import {Music} from '../models/Music';
import AppPlayer from '../modules/player/AppPlayer';
import { Navbar } from './Navbar';
import TrackPlayer from 'react-native-track-player';

const HomeScreen = (props: any) => {
  const {authorization,setAuthorization}  = useContext(OAuth2Context);
  const {navigation} = props;
  const [songs,setSongs] = useState<Music[]>([]);

  const web_client = new WebClient({host:'http://192.168.101.2',port:8085});

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

  const renderItems = () => {
    return songs.length > 0  ?
      songs.map(s => (
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
              {renderItems()}
              </View>
            </ScrollView>
          </View>
        </View>
        <Navbar />
      </>
    );
};

export {HomeScreen};

/*

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


*/