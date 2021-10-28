import React, {Component} from 'react';
import {View, StatusBar, ToastAndroid} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/General';
import Colors from '@styles/Colors';
import {WebClient} from '@modules/web-client/WebClient';
import {OAuth2Context} from '@environment/OAuth2Context';
import {YouAppCredentials} from '@environment/OAuth2Credentials';
import {OAuth2TokenResponse} from '@src/app/models/OAuth2TokenResponse';

export default class SplashScreen extends Component {
  private web_client: WebClient;

  static contextType = OAuth2Context;
  context!: React.ContextType<typeof OAuth2Context>;

  constructor(props: any) {
    super(props);
    this.web_client = new WebClient();
  }

  goToScreen(routeName: string) {
    this.props.navigation.replace(routeName);
  }

  async validateLogin() {
    let refresh_token: string | undefined =
      this.context.authorization.refresh_token;
    if (refresh_token !== undefined) {
      this.web_client
        .post_x_encoded<OAuth2TokenResponse>(
          '/oauth2/token',
          {
            client_id: YouAppCredentials.configuration.clientId!,
            client_secret: YouAppCredentials.configuration.clientSecret!,
            grant_type: 'refresh_token',
            refresh_token: refresh_token!,
            ClientAuthenticationMethod: 'client_secret_post',
          },
          undefined,
          {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        )
        .then(y => {
          ToastAndroid.show('Bienvenido', ToastAndroid.SHORT);
          this.context.setAuthorization({
            loggedIn: true,
            access_token: y.access_token!,
            refresh_token: y.refresh_token!,
          });
        })
        .catch(e => {
          console.log('unable to renovate credentials ' + e);
          this.goToScreen('Login');
        });
    } else {
      console.log('no credentials was found');
      this.goToScreen('Login');
    }
  }

  componentDidMount() {
    setTimeout(
      () => {
        console.log('trying to re-authenticate');
        this.validateLogin();
      },
      1000,
      this,
    );
  }

  render() {
    return (
      <View style={splashStyles.image}>
        <StatusBar backgroundColor={Colors.BACKGROUND} />
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={splashStyles.animated_image}
          source={require('@assets/favicon.png')}
        />
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={splashStyles.animated_text_margin}>
          YouApp
        </Animatable.Text>
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={splashStyles.animated_text}>
          The sound of life
        </Animatable.Text>
      </View>
    );
  }
}
