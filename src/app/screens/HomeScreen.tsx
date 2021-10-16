import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
//Styles
import { homeStyles } from '@src/styles/General';
import Colors from '@src/styles/Colors';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={homeStyles.container}>
        <View style={homeStyles.Header}>
          <Text style={homeStyles.headerTitle}>Libreria</Text>
          <Ionicons style={homeStyles.Exit} name='exit-outline' size={30} color={Colors.ACCENT}/>
        </View>
        <View style={homeStyles.inputSearch}>
          <Ionicons style={homeStyles.iconSearch} name="search-outline" size={17} color={Colors.GRAY3}/>
          <TextInput placeholder='Song or artist' placeholderTextColor={Colors.GRAY3} style={homeStyles.textInput}/>
        </View>
        <View>
          <View style={homeStyles.playBox}>
            <Text style={homeStyles.playText}>Playlists</Text>
            <Ionicons style={homeStyles.palyArrow} name='chevron-forward-outline' size={15} color={Colors.ACCENT}/>
          </View>
          <ScrollView horizontal>
            <View style={homeStyles.playlistBoxes}>
              <View style={{marginLeft: 24}}>
                <Image source={require('@assets/playList1.png')}/>
                <Text style={homeStyles.playlistTitle}>Stargroves</Text>
                <Text style={homeStyles.playlistText}>20 songs</Text>
              </View>
              <View style={{marginLeft: 20}}>
                <Image source={require('@assets/playList2.png')}/>
                <Text style={homeStyles.playlistTitle}>So it goes</Text>
                <Text style={homeStyles.playlistText}>5 songs</Text>
              </View>
              <View style={{marginLeft: 20}}>
                <Image source={require('@assets/playList2.png')}/>
                <Text style={homeStyles.playlistTitle}>So it goes</Text>
                <Text style={homeStyles.playlistText}>5 songs</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View>
          <View style={[homeStyles.playBox, {marginTop: 24,}]}>
            <Text style={homeStyles.playText}>Favorite</Text>
            <Ionicons style={{marginTop: 10}} name='chevron-forward-outline' size={15} color={Colors.ACCENT}/>
          </View>
          <View style={{marginTop: 16,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={homeStyles.favIcon}>
                <Image style={{marginTop: 10, marginLeft: 8,}} source={require('@assets/Music.png')}/>
              </View>
              <View style={{ marginTop: -16}}>
                <Text style={homeStyles.favTitle}
                >Holy (feat. Chance the Rapper)</Text>
                <Text style={homeStyles.favSubTitle}>Justin Bieber</Text>
              </View>
              <Ionicons style={{marginTop: -8,marginLeft: 60,}} name='heart-outline' size={25} color={Colors.PRIMARY}/>
            </View>
          </View>
          <View style={{marginTop: 20,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={homeStyles.favIcon}>
                <Image style={{marginTop: 10, marginLeft: 8,}} source={require('@assets/Music.png')}/>
              </View>
              <View style={{ marginTop: -16}}>
                <Text style={homeStyles.favTitle}
                >Holy (feat. Chance the Rapper)</Text>
                <Text style={homeStyles.favSubTitle}>Justin Bieber</Text>
              </View>
              <Ionicons style={{marginTop: -8,marginLeft: 60,}} name='heart-outline' size={25} color={Colors.PRIMARY}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
