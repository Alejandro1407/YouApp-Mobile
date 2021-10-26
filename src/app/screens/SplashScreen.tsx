import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/General';
import Colors from '@styles/Colors';
import {WebClient} from '../modules/web-client/WebClient';
import {OAuth2Context} from '../environment/OAuth2Context';

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

  /*
  async validateLogin() {
    try {
      let refresh_token: string = undefined;
        //'HRmMg6-j7mTv3AKOZtpbLMhUHg-AxWv1ol6-xaUSzUKVMwaGhaXN_x58bB69LRUDQBjuz3BHlACOWIPNSYDnOJAqu-lUN2E2MTx-1bqqfSd-4ImXlOSvIUbYBxzNwx24';
      if (refresh_token !== undefined) {
        let d = this.web_client.post(
          '/oauth2/token',
          JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
          }),
          {'Content-Type': 'x-www-form-urlencoded'},
        );
        console.log(d);
        d.then(x => x.json()).then(y => console.log(y));
        let y = await x.json();
        console.log(y);

      }
      //const credentials = await Keychain.getGenericPassword();
      //if (!credentials) {
      //  console.warn('No credentials has been stored');
      // }
    } catch (ex) {
      console.log(ex);
    }
  }
*/
  componentDidMount() {
    setTimeout(
      () => {
        //his.validateLogin();
        this.goToScreen('Login');
      },
      3000,
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
