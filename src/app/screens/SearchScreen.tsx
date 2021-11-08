/* eslint-disable react-native/no-inline-styles */
import Colors from '@src/styles/Colors';
import {homeStyles} from '@src/styles/General';
import React, {useContext, useState} from 'react';
import {
  View,
  TextInput,
  StatusBar,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Music} from '@models/Music';
import {WebClient} from '@modules/web-client/WebClient';
import {Navbar} from './Navbar';
import {OAuth2Context} from '@environment/OAuth2Context';
import AppPlayer from '../modules/player/AppPlayer';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const {authorization} = useContext(OAuth2Context);
  const [payload, setPayload] = useState<string>();
  const [songs, setSongs] = useState<Music[]>([]);
  const web_client = new WebClient({host: 'http://192.168.101.2', port: 8085});
  const navigation = useNavigation();
  const search = () => {
    if (payload?.length === 0) {
      return;
    }
    web_client
      .get<Music[]>(
        '/v1/storage/music/find',
        {
          title: payload!,
        },
        {
          Authorization: 'Bearer ' + authorization.access_token,
        },
      )
      .then(m => {
        console.log(m);
        setSongs(m);
      })
      .catch(e => {
        console.log(e);
        ToastAndroid.show('Failed to retrieve music', ToastAndroid.SHORT);
      });
  };

  const addSong = async (music: Music) => {
    AppPlayer.addMusic(music).then(f => {
      if (f) {
        navigation.navigate('Music');
      }
    });
  };

  const renderItems = () => {
    return songs.length > 0 ? (
      songs.map(s => (
        <TouchableOpacity
          style={{margin: 10}}
          key={s.id}
          onPress={() => addSong(s)}>
          <Image source={{uri: s.photo}} style={{width: 150, height: 150}} />
          <Text style={homeStyles.playlistTitle}>{s.title}</Text>
          <Text style={homeStyles.playlistText}>{s.user.fullName}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <View style={{alignItems: 'center'}}>
        <Text style={homeStyles.label}>Busca una canción</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.BACKGROUND} />
      <View style={homeStyles.container}>
        <View style={homeStyles.inputSearch}>
          <Ionicons
            style={homeStyles.iconSearch}
            name="search-outline"
            size={20}
            color={Colors.GRAY3}
          />
          <TextInput
            onEndEditing={search}
            onChangeText={setPayload}
            placeholder="Song or artist"
            placeholderTextColor={Colors.GRAY3}
            style={homeStyles.textInput}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={homeStyles.searchBoxes}>{renderItems()}</View>
        </ScrollView>
      </View>
      <Navbar />
    </>
  );
};

export {SearchScreen};
