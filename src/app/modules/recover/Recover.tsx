/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {loginStyles} from '@src/styles/General';
import InputBox from '@src/styles/InputBox';
import colors from '@src/styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {WebClient} from '../web-client/WebClient';

export default function recoverPasswordScreen(props: any) {
  const web_client: WebClient = new WebClient();

  //Datos a enviar
  const [correo, setCorreo] = useState('');
  const {navigation} = props;

  const recoverPassword = (correo: String) => {
    web_client
      .get(`/v1/auth/reset-password/${correo}`)
      .then(response => {
        console.log(response);
        ToastAndroid.show(
          'Se ha enviado su nueva contraseña',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Login');
      })
      .catch(e => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={[loginStyles.container, {padding: 50, height: 1000}]}>
          <Text style={{color: colors.PRIMARY, fontSize: 25, marginBottom: 25}}>
            Recuperar Contraseña...
          </Text>
          <InputBox
            keyboardType="email-address"
            placeholder="Correo"
            image="envelope-o"
            value={correo}
            onChangeText={(email: string) => setCorreo(email)}
          />

          <View style={loginStyles.btnMain}>
            <TouchableOpacity onPress={() => recoverPassword(correo)}>
              <LinearGradient
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  borderRadius: 60,
                }}
                colors={colors.LINEARGRADIENT1}>
                <Text style={[loginStyles.btntxt, {textAlign: 'center'}]}>
                  Recuperar Contraseña
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
