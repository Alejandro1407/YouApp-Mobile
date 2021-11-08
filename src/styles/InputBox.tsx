/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from './Colors';

export default function InputBox(props: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: colors.ACCENT,
        width: 325,
        marginTop: 15,
      }}>
      <Icon
        type="font-awesome"
        name={props.image}
        color={colors.ACCENT}
        size={24}
        style={{marginRight: 20}}
      />
      <TextInput
        style={{color: colors.ACCENT, width: 250, fontSize: 20}}
        placeholderTextColor={colors.ACCENT}
        placeholder={props.placeholder}
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnVisibility: {
    height: 40,
    width: 35,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});
