import React, {Component} from 'react';
import {authorize} from 'react-native-app-auth';
import {Button, StyleSheet, Text, View} from 'react-native';
import {OAuth2Credentials} from '@environment/OAuth2Credentials';
import {OAuth2Type} from '@enums/OAuth2Type';
import {OAuth2Configuration} from '@models/OAuth2Configuration';
import {
  GoogleSignin,
  GoogleSigninButton} from '@react-native-google-signin/google-signin';

export class Login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {accessToken: null};

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
      console.log('google services are available');
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const dd = await GoogleSignin.getTokens();
      console.log(dd);
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
