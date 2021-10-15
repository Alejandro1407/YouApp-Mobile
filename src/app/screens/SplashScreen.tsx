import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/General';
import Colors from '@styles/Colors';
import {Text} from 'react-native-animatable';

export default class SplashScreen extends Component {
  goToScreen(routeName) {
    this.props.navigation.navigate(routeName);
  }

  componentDidMount() {
    setTimeout(
      () => {
        this.goToScreen('Login');
      },
      5000,
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
    )
  }
}
