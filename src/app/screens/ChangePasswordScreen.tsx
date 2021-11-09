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
import {WebClient} from '../modules/web-client/WebClient';

export default function ChangePasswordScreen(props: any) {
  const web_client: WebClient = new WebClient();

  //Datos a enviar
//   const [correo, setCorreo] = useState('');
    const [passwordA, setPasswordA] = useState('');
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');
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
            Cambiar Contraseña...
          </Text>
          <InputBox
            keyboardType={null}
            placeholder="Ingrese su contraseña actual"
            image="lock"
            secureTextEntry={true}
            value={passwordA}
            onChangeText={(pass: string) => setPasswordA(pass)}
          />
          <InputBox
            keyboardType={null}
            placeholder="Ingrese su nueva contraseña"
            image="lock"
            secureTextEntry={true}
            value={password}
            onChangeText={(pass: string) => setPassword(pass)}
          />
          <InputBox
            keyboardType={null}
            placeholder="Confirme su nueva contraseña"
            image="lock"
            secureTextEntry={true}
            value={passwordC}
            onChangeText={(pass2: string) => setPasswordC(pass2)}
          />

          <View style={loginStyles.btnMain}>
            <TouchableOpacity onPress={() => recoverPassword(password)}>
              <LinearGradient
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  borderRadius: 60,
                }}
                colors={colors.LINEARGRADIENT1}>
                <Text style={[loginStyles.btntxt, {textAlign: 'center'}]}>
                  Cambiar Contraseña
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
