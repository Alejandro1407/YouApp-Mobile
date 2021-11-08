/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {Text, View, Image, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Styles
import {homeStyles} from '@src/styles/General';
import Colors from '@src/styles/Colors';
import {OAuth2Context} from '../environment/OAuth2Context';
import {WebClient} from '../modules/web-client/WebClient';
import colors from '@src/styles/Colors';
import {User} from '@models/User';

export default function UserScreen() {
  const [user, setUser] = useState<User>({});
  const {authorization} = useContext(OAuth2Context);
  const web_client = new WebClient();
  useEffect(() => {
    web_client
      .get<User>('/v1/auth/me', undefined, {
        Authorization: 'Bearer ' + authorization.access_token,
      })
      .then(response => {
        setUser(response);
        console.log(response);
      })
      .catch(e => console.log(e));
  }, []);

  const profileFoto = () => {
    if (!user.photo) {
      return (
        <Ionicons name="md-person-circle" color={colors.ACCENT} size={100} />
      );
    } else {
      return (
        <Image
          source={{uri: user.photo}}
          style={{width: 100, height: 100, borderRadius: 100}}
        />
      );
    }
  };

  const renderUser = () => {
    return user === undefined ? (
      <View style={{alignItems: 'center'}}>
        <Image source={require('@assets/loading.gif')} />
      </View>
    ) : (
      <>
        <Text
          style={{
            color: colors.PRIMARY,
            fontSize: 25,
            marginBottom: 25,
            textAlign: 'center',
          }}>
          {user.username}
        </Text>
        <View style={{alignItems: 'center'}}>{profileFoto()}</View>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            margin: 15,
            flexDirection: 'column',
          }}>
          Nombre completo:
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            margin: 15,
            flexDirection: 'column',
          }}>
          {user.fullName}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            margin: 15,
            flexDirection: 'column',
          }}>
          Email:
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            margin: 15,
            flexDirection: 'column',
          }}>
          {user.email}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            margin: 15,
            flexDirection: 'column',
          }}>
          Birthday:
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            margin: 15,
            flexDirection: 'column',
          }}>
          {user.birthday}
        </Text>
      </>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.BACKGROUND} />
      <View style={homeStyles.container}>{renderUser()}</View>
    </>
  );
}
