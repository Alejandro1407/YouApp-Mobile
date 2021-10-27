import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/General';
import Colors from '@styles/Colors';
import {WebClient} from '../modules/web-client/WebClient';
import {OAuth2Context} from '../environment/OAuth2Context';
import {OAuth2Credentials} from '../environment/OAuth2Credentials';
import {OAuth2Type} from '../enums/OAuth2Type';

export default class SplashScreen extends Component {
  private web_client: WebClient;

  static contextType = OAuth2Context;
  context: React.ContextType<typeof OAuth2Context>;

  constructor(props: any) {
    super(props);
    this.web_client = new WebClient();
  }

  goToScreen(routeName: string) {
    this.props.navigation.replace(routeName);
  }

  async validateLogin() {
    try {
      let refresh_token: string | undefined =
        this.context.authorization.refresh_token;
      const v = OAuth2Credentials.find(
        x => x.registration === OAuth2Type.YOUAPP,
      );
      if (refresh_token !== undefined) {
        let request: Promise<Response> = this.web_client.post_x_encoded(
          '/oauth2/token',
          {
            client_id: v?.configuration.clientId!,
            client_secret: v?.configuration.clientSecret!,
            grant_type: 'refresh_token',
            refresh_token: refresh_token!,
            ClientAuthenticationMethod: 'client_secret_post',
          },
          undefined,
          {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        );
        request
          .then(y => console.log(y))
          .catch(e => e.then((z: Promise<any>) => console.log(z)));
      }
      console.log('asd');
      this.goToScreen('Login');
    } catch (ex) {
      console.log(ex);
    }
  }

  componentDidMount() {
    setTimeout(
      () => {
        console.log('trying to re-authenticate');
        this.validateLogin();
        //this.goToScreen('Login');
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
