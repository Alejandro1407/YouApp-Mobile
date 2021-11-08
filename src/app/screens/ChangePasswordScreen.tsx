/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
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
import {OAuth2Context} from '../environment/OAuth2Context';

export default function ChangePasswordScreen() {
  const web_client: WebClient = new WebClient();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const {authorization} = useContext(OAuth2Context);

  const recoverPassword = () => {
    if (
      password.length < 3 ||
      newPassword.length < 3 ||
      repeatPassword.length < 3
    ) {
      ToastAndroid.show('Invalid password', ToastAndroid.SHORT);
      return;
    }
    if (newPassword !== repeatPassword) {
      ToastAndroid.show('Contraeñas no coinciden', ToastAndroid.SHORT);
      return;
    }
    setDisabled(true);
    web_client
      .post(
        '/v1/auth/reset-password/',
        JSON.stringify({
          oldPassword: password,
          newPassword: newPassword,
          repeatPassword: repeatPassword,
        }),
        undefined,
        {
          Authorization: 'Bearer ' + authorization.access_token,
        },
      )
      .then(response => {
        console.log(response);
        ToastAndroid.show(
          'Se ha actualizado su contraseña',
          ToastAndroid.SHORT,
        );
      })
      .catch(e => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      })
      .finally(() => setDisabled(false));
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
            value={password}
            onChangeText={(pass: string) => setPassword(pass)}
          />
          <InputBox
            keyboardType={null}
            placeholder="Ingrese su nueva contraseña"
            image="lock"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(pass: string) => setNewPassword(pass)}
          />
          <InputBox
            keyboardType={null}
            placeholder="Confirme su nueva contraseña"
            image="lock"
            secureTextEntry={true}
            value={repeatPassword}
            onChangeText={(pass2: string) => setRepeatPassword(pass2)}
          />

          <View style={loginStyles.btnMain}>
            <TouchableOpacity
              onPress={() => recoverPassword()}
              disabled={disabled}>
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
