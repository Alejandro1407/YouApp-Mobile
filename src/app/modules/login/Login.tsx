import React, {Component} from 'react';
import {authorize} from 'react-native-app-auth';
import {
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {OAuth2Credentials} from '@environment/OAuth2Credentials';
import {OAuth2Type} from '@enums/OAuth2Type';
import {OAuth2Configuration} from '@models/OAuth2Configuration';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//Styles
import {loginStyles} from '@styles/General';
import Colors from '@src/styles/Colors';
('@styles/Colors');
import LinearGradient from 'react-native-linear-gradient';
import {GoogleAuthorizationRequest} from '@src/app/models/GoogleAuthorizationRequest';
import {WebClient} from '../web-client/web-client';

export class Login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {accessToken: null};
    this.register_google = this.register_google.bind(this);
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/user.gender.read',
      ],
      webClientId:
        '594103153319-gm26n3kirsecq2kfl52fsh2p5ejd09qp.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  _getConfig(_oauth2Type: OAuth2Type): OAuth2Configuration {
    const v = OAuth2Credentials.find(x => x.registration === _oauth2Type);
    if (v === undefined) {
      throw new TypeError('Not OAuthConfiguration found?');
    }
    console.log(v);
    return v;
  }

  _onLogin = async (_oauthType: OAuth2Type): Promise<void> => {
    let _oauth2: OAuth2Configuration = this._getConfig(_oauthType);
    console.debug('OAuth Login with:', _oauth2);
    try {
      const result = await authorize(_oauth2.configuration);
      this.setState({accessToken: result.accessToken});
      console.log(result.accessToken);
      this.goToScreen('Home');
    } catch (error) {
      console.log(error);
    }
  };

  _onLogout = async (_oauthType: OAuth2Type): Promise<void> => {
    let _oauth2: OAuth2Configuration = this._getConfig(_oauthType);
    let accessToken = this.state.accessToken;
    console.debug('OAuth Logout with:', _oauth2);
    if (accessToken == null) {
      return;
    }
    try {
      //await revoke(_oauth2.configuration, {
      //  tokenToRevoke: accessToken,
      //});
      console.log('has been revoked');
      this.setState({accessToken: null});
    } catch (error) {
      console.log(error);
    }
  };

  async google_oauth() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      //console.log(tokens);
      var auth: GoogleAuthorizationRequest = {
        idToken: tokens.idToken,
        accessToken: tokens.accessToken,
        principal: userInfo.user,
      };
      //console.log(auth);
      await this.register_google(auth);
    } catch (err) {
      console.error(err);
    }
  }

  async register_google(request: GoogleAuthorizationRequest) {
    try {
      let promise = await WebClient.getInstance().post(
        'http://auth-server:8083/v1/auth/google',
        JSON.stringify(request),
      );
      let json = await promise.json();
      console.log(json);
      this.goToScreen('Home');
    } catch (e) {
      console.error(e);
    }
  }

  goToScreen(routeName) {
    this.props.navigation.navigate(routeName);
  }

  render() {
    const start = {x: 0, y: 0};
    const end = {x: 1, y: 0};
    let loggedIn = this.state.accessToken === null ? false : true;
    return (
      <View style={[loginStyles.container, {padding: 50}]}>
        <StatusBar backgroundColor={Colors.BACKGROUND} translucent={true} />
        <View style={loginStyles.logo}>
          <Image
            source={require('@assets/favicon.png')}
            style={{height: 100, width: 100}}
          />
          <Text style={loginStyles.txtTittle}>
            Iniciar Sesión
          </Text>
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
                marginLeft: 20,
              }}
            />
            <Text style={loginStyles.btntxt}>Ingresa con Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 15}}>
          <TouchableOpacity>
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

  private styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    header: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });
}
