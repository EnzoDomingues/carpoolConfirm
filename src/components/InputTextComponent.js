/* eslint-disable import/prefer-default-export */
import React from 'react';
import { View, StyleSheet, Platform, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { CustomTextComponent } from './CustomTextComponent';
import colors from '../constants/colors';

export const InputTextComponent = props => (
  <View style={props.containerStyle}>
    {props.title && (
      <CustomTextComponent
        text={props.title}
        style={{
          fontSize: 18,
          color: props.titleColor || colors.black,
          ...props.titleStyle
        }}
        bold={props.titleStyle && props.titleStyle.fontWeight !== 'normal'}
      />
    )}
    <TextInput {...props} style={[props.style, styles.textInput]} />
  </View>
);

InputTextComponent.defaultProps = {
  style: {},
  placeholder: '',
  valid: false,
  titleStyle: {
    fontWeight: 'normal'
  }
};

InputTextComponent.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  showErrorFieldRequired: PropTypes.bool,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  titleStyle: PropTypes.object
};

const styles = StyleSheet.create({
  textInput: {
    alignItems: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: colors.black,
    marginTop: Platform.OS === 'ios' ? 12 : 0
  },
  errorTextView: {
    marginTop: 5
  }
});
