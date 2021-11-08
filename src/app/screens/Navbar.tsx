import {useNavigation} from '@react-navigation/native';
import Colors from '@src/styles/Colors';
import {musicStyles} from '@src/styles/General';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Navbar = () => {
  const navigation = useNavigation();

  const goToScreen = (routeName: string) => {
    navigation.replace(routeName);
  };

  return (
    <View
      style={[
        musicStyles.bottomContainer,
        {backgroundColor: Colors.BACKGROUND},
      ]}>
      <View style={musicStyles.musicControlls}>
        <TouchableOpacity onPress={() => navigation.navigate('Music')}>
          <Ionicons
            name="musical-notes-outline"
            size={30}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToScreen('Upload')}>
          <Ionicons
            name="cloud-upload-outline"
            size={30}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToScreen('Home')}>
          <Ionicons name="home-outline" size={30} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToScreen('Search')}>
          <Ionicons name="md-search-outline" size={30} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToScreen('User')}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {Navbar};
