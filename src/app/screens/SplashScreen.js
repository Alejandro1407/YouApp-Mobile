import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {imageBackgroundStyle} from '@styles/General';

export default class LoginScreen extends Component {
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
      <View style={imageBackgroundStyle.image}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            width: 200,
            height: 200,
            margin: 100,
          }}
          source={require('@assets/favicon.png')}
        />
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
            fontFamily: 'Poppins-Black',
            marginTop: '-25%',
          }}>
          Loading...
        </Animatable.Text>
      </View>
    );
  }
}
