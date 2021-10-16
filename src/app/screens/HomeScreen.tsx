import React, {Component} from 'react';
import {Text, View} from 'react-native';
//Styles
import { loginStyles } from '@src/styles/General';
import Colors from '@src/styles/Colors';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={[loginStyles.container, {padding: 50}]}>
        <Text style={{color: Colors.PRIMARY, fontSize: 25}}> Wenas </Text>
      </View>
    );
  }
}
