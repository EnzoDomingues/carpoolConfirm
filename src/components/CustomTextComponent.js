/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

export const CustomTextComponent = (props) => {
  const {
    bold, text, size, color, style, maxLimit, ultra
  } = props;
  const isStyleAnArray = style instanceof Array;
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: bold ? 'AmsiPro-Black' : ultra ? 'AmsiPro-Ultra' : 'Inter-Regular', fontSize: size, color
        },
        ...(isStyleAnArray ? style : [style])
      ]}
    >
      {maxLimit ? `${text.substring(0, maxLimit - 3)}...` : text}
    </Text>
  );
};

CustomTextComponent.defaultProps = {
  bold: false,
  ultra: false,
  size: 18,
  color: colors.black,
  autoCorrect: false,
  value: '',
  placeholder: '',
  placeholderTextColor: colors.black,
  underlineColorAndroid: 'transparent'
};

CustomTextComponent.propTypes = {
  bold: PropTypes.bool,
  ultra: PropTypes.bool,
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  maxLimit: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
