import React, {Component} from 'react';
import {authorize, revoke} from 'react-native-app-auth';
import {Button, StyleSheet, Text, View} from 'react-native';
import {credentials} from '@youapp/resources/clientRegister';
import {OAuth2Type} from './enums/OAuth2Type';
import {OAuth2Configuration} from './enums/OAuth2Configuration';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';

export class Login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {accessToken: null};

    GoogleSignin.configure({
      //copes: ['openid', 'profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '594103153319-e0i9iua675j9q6pe27k2oil8ojq3p8oo.apps.googleusercontent.com',
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER 
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      //forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      //googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });
  }

  _getConfig(_oauth2Type: OAuth2Type): OAuth2Configuration {
    const v = credentials.find(x => x.registration === _oauth2Type);
    if (v === undefined) {
      throw new TypeError('Not OAuthConfiguration found?');
    }
    return v;
  }

  _onLogin = async (_oauthType: OAuth2Type): Promise<void> => {
    let _oauth2: OAuth2Configuration = this._getConfig(_oauthType);
    console.debug('OAuth Login with:', _oauth2);
    try {
      const result = await authorize(_oauth2.configuration);
      this.setState({accessToken: result.accessToken});
      console.log(result.accessToken);
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

  async test() {
    try {
      await GoogleSignin.hasPlayServices();
      console.log("google services are available");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let loggedIn = this.state.accessToken === null ? false : true;
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.header}> Auth0Sample - Login </Text>
        <Button
          onPress={() => {
            loggedIn
              ? this._onLogout(OAuth2Type.YOUAPP)
              : this._onLogin(OAuth2Type.YOUAPP);
          }}
          title="Log with username and password"
        />
        <Button
          onPress={() => {
            loggedIn
              ? this._onLogout(OAuth2Type.GOOGLE)
              : this._onLogin(OAuth2Type.GOOGLE);
          }}
          title="Log with google"
        />
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.test}
          disabled={this.state.isSigninInProgress}
        />
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
