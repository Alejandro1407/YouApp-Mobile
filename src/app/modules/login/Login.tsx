/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {authorize} from 'react-native-app-auth';
import {
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import {
  YouAppCredentials,
  GoogleCredentials,
} from '@environment/OAuth2Credentials';
import {OAuth2Type} from '@enums/OAuth2Type';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//Styles
import {loginStyles} from '@styles/General';
import Colors from '@src/styles/Colors';
('@styles/Colors');
import LinearGradient from 'react-native-linear-gradient';
import {GoogleAuthorizationRequest} from '@src/app/models/GoogleAuthorizationRequest';
import {WebClient} from '@src/app/modules/web-client/WebClient';
import {OAuth2Context} from '@src/app/environment/OAuth2Context';
import {OAuth2TokenResponse} from '@src/app/models/OAuth2TokenResponse';

export class Login extends Component {
  private web_client: WebClient;

  static contextType = OAuth2Context;
  context!: React.ContextType<typeof OAuth2Context>;

  constructor(props: any) {
    super(props);
    this.web_client = new WebClient();
    this.register_google = this.register_google.bind(this);
    GoogleSignin.configure(GoogleCredentials);
  }

  _onLogin = async (_oauthType: OAuth2Type): Promise<void> => {
    console.debug('OAuth Login with:', YouAppCredentials);
    try {
      const auth = await authorize(YouAppCredentials.configuration);
      ToastAndroid.show('Bienvenido', ToastAndroid.LONG);
      this.context.setAuthorization({
        access_token: auth.accessToken,
        refresh_token: auth.refreshToken,
        loggedIn: true,
      });
    } catch (ex: unknown) {
      this._show(ex.message);
      console.log(ex);
    }
  };

  _show(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  async google_oauth() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      var auth: GoogleAuthorizationRequest = {
        idToken: tokens.idToken,
        accessToken: tokens.accessToken,
        principal: userInfo.user,
      };
      await this.register_google(auth);
    } catch (err) {
      this._show(err.message);
      console.error(err);
    }
  }

  async register_google(request: GoogleAuthorizationRequest) {
    this.web_client
      .post<OAuth2TokenResponse>('/v1/auth/google/', JSON.stringify(request))
      .then(data => {
        ToastAndroid.show('Bienvenido', ToastAndroid.LONG);
        this.context.setAuthorization({
          access_token: data.access_token!,
          refresh_token: data.refresh_token!,
          loggedIn: true,
        });
      })
      .catch(e => {
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      });
  }

  goToScreen(routeName: string) {
    this.props.navigation.navigate(routeName);
  }

  render() {
    const start = {x: 0, y: 0};
    const end = {x: 1, y: 0};
    return (
      <View style={[loginStyles.container, {padding: 50}]}>
        <StatusBar backgroundColor={Colors.BACKGROUND} translucent={true} />
        <View style={loginStyles.logo}>
          <Image
            source={require('@assets/favicon.png')}
            style={{height: 100, width: 100}}
          />
          <Text style={loginStyles.txtTittle}>Iniciar Sesión</Text>
        </View>
        <View style={loginStyles.btnMain}>
          <TouchableOpacity
            onPress={() => {
              this._onLogin(OAuth2Type.YOUAPP);
            }}>
            <LinearGradient
              start={start}
              end={end}
              style={{
                flexDirection: 'row',
                padding: 15,
                borderRadius: 60,
              }}
              colors={Colors.LINEARGRADIENT1}>
              <Image
                source={require('@assets/iniciar-sesion.png')}
                tintColor={Colors.ACCENT}
                style={{
                  width: 32,
                  height: 32,
                  marginLeft: 40,
                }}
              />
              <Text style={loginStyles.btntxt}>Iniciar Sesion</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.btnTransparent}>
          <TouchableOpacity
            style={{flexDirection: 'row', padding: 15}}
            onPress={() => {
              this.goToScreen('Register');
            }}>
            <Image
              source={require('@assets/add.png')}
              tintColor={Colors.ACCENT}
              style={{
                width: 32,
                height: 32,
                marginLeft: 50,
              }}
            />
            <Text style={loginStyles.btntxt}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.btnTransparent}>
          <TouchableOpacity
            onPress={() => {
              this.google_oauth();
            }}
            style={{flexDirection: 'row', padding: 15}}>
            <Image
              source={require('@assets/google.png')}
              style={{
                width: 32,
                height: 32,
                marginLeft: 15,
              }}
            />
            <Text style={loginStyles.btntxt}>Ingresa con Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 15}}>
          <TouchableOpacity onPress={() => this.goToScreen('Recover')}>
            <Text
              style={[
                loginStyles.txtTransparent,
                {textDecorationLine: 'underline'},
              ]}>
              Olvide mi Contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
