import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../constants/colors';
import { CustomTextComponent } from './CustomTextComponent';
import { fontScale, horizontalScale, verticalScale } from '../commons/Scaling';

export const FeedBackErrorGeneric = ({ textTitle, textDesc, onClose }) => (
  <View style={{ marginTop: verticalScale(24) }}>
    <CustomTextComponent
      bold
      size={fontScale(18)}
      color={colors.black}
      style={{ marginVertical: verticalScale(5) }}
      text={textTitle}
    />
    <CustomTextComponent
      style={{ opacity: 0.5 }}
      size={fontScale(14)}
      text={textDesc}
    />
  </View>
);

FeedBackErrorGeneric.propTypes = {
  onClose: PropTypes.func,
  textTitle: PropTypes.string,
  textDesc: PropTypes.string,
  fullButtonText: PropTypes.string,
  topSpace: PropTypes.string,
  textButton: PropTypes.string
};

export default FeedBackErrorGeneric;
