import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/General';
import Colors from '@styles/Colors';

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
      <View style={splashStyles.image}>
        <StatusBar backgroundColor={Colors.BACKGROUND} />
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            width: 166,
            height: 166,
            marginTop: 164,
          }}
          source={require('@assets/favicon.png')}

        />
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            fontWeight: "900",
            fontFamily: 'Poppins-Black',
            fontSize: 24,
            color: Colors.PRIMARY,
            marginTop: 28,
          }}>
          YouApp The sound of life
        </Animatable.Text>
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            fontWeight: "500",
            fontSize: 18,
            fontFamily: 'Poppins-Black',
            color: Colors.GRAY4,
            marginTop: 8,
          }}>
          Loading...
        </Animatable.Text>
      </View>
    )
  }
}
