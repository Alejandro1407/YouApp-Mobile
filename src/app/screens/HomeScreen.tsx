/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Styles
import {homeStyles} from '@src/styles/General';
import Colors from '@src/styles/Colors';
import {OAuth2Context} from '../environment/OAuth2Context';
import AppPlayer from '../modules/player/AppPlayer';
import TrackPlayer, {State} from 'react-native-track-player';

export default class HomeScreen extends Component {
  static contextType = OAuth2Context;
  context: React.ContextType<typeof OAuth2Context>;

  screen = Dimensions.get('screen');

  logout = () => {
    this.context.setAuthorization({
      loggedIn: false,
    });
  };
  async componentDidMount() {
    AppPlayer.initializePlayer();
    await TrackPlayer.add({
      url: 'http://10.0.40.48:9090/youapp/049d1e78-bebb-4541-835d-a86def2460d0_1636089824.mp3',
      title: 'Sweather Weather',
      album: 'Album 1',
    });
    console.log(this.screen);
  }

  async play() {
    const state = await TrackPlayer.getState();
    console.log('actual state' + state);
    if (state === State.Playing) {
      console.log('pausing');
      await TrackPlayer.pause();
    } else {
      console.log('playing');
      await TrackPlayer.play();
    }
  }

  goToScreen(routeName: string) {
    this.props.navigation.navigate(routeName);
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={Colors.BACKGROUND} />
        <View style={homeStyles.container}>
          <View style={homeStyles.Header}>
            <Text style={homeStyles.headerTitle}>Libreria</Text>
            <Ionicons
              onPress={this.play}
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
                <View style={{marginLeft: 24}}>
                  <Image source={require('@assets/playList1.png')} />
                  <Text style={homeStyles.playlistTitle}>Stargroves</Text>
                  <Text style={homeStyles.playlistText}>20 songs</Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <Image source={require('@assets/playList2.png')} />
                  <Text style={homeStyles.playlistTitle}>So it goes</Text>
                  <Text style={homeStyles.playlistText}>5 songs</Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <Image source={require('@assets/playList2.png')} />
                  <Text style={homeStyles.playlistTitle}>So it goes</Text>
                  <Text style={homeStyles.playlistText}>5 songs</Text>
                </View>
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
              onPress={() => this.goToScreen('Music')}
            />
          </View>
        </View>
      </>
    );
  }
}
