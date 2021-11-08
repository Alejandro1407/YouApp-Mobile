/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import colors from './Colors';

export default function MyTextInput(props: any) {
  return (
    <Input
      style={{
        alignItems: 'center',
      }}
      containerStyle={{marginBottom: 10}}
      inputStyle={{
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 12,
        color: colors.ACCENT,
        fontFamily: 'Poppins-Light',
        borderBottomColor: colors.ACCENT,
      }}
      placeholderTextColor={colors.ACCENT}
      placeholder={props.placeholder}
      leftIconContainerStyle={{marginLeft: 0}}
      leftIcon={
        <Icon
          size={24}
          color={colors.ACCENT}
          type="font-awesome"
          name={props.image}
        />
      }
      rightIcon={
        props.bolgone ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnVisibility}
            onPress={props.onPress}>
            <Image
              style={styles.btnImage}
              tintColor={colors.ACCENT}
              source={
                props.secureTextEntry
                  ? require('@src/assets/eye.png')
                  : require('@src/assets/invisible.png')
              }
            />
          </TouchableOpacity>
        ) : (
          <Icon
            size={24}
            color={colors.GRAY2}
            type={'font-awesome'}
            name={props.imageRight}
          />
        )
      }
      errorStyle={{color: colors.GRAY2}}
      errorMessage={props.bolError ? props.strError : ''}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      value={props.value}
    />
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
