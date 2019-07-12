/* eslint-disable import/prefer-default-export */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import { CustomTextComponent } from './';
import NavigationService from '../commons/navigation/NavigationService';
import { verticalScale, fontScale, horizontalScale } from '../commons/Scaling';
import Icon from '../commons/Icon';

export const Header = props => {
  const { type } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          left: horizontalScale(-15)
        }}
        onPress={() => NavigationService.navigate('ChooseHomeScene')}
      >
        <Icon name="Back" style={{}} color={colors.blueViolet} size={40} />
        <CustomTextComponent
          text={'Home'}
          size={fontScale(14)}
          color={colors.blueViolet}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() =>
          type === 'Driver'
            ? NavigationService.navigate('PassengerScene')
            : NavigationService.navigate('DriverScene')
        }
      >
        <CustomTextComponent
          text={type === 'Driver' ? 'Passageiro' : 'Motorista'}
          size={fontScale(14)}
          color={colors.blueViolet}
        />
        <Icon name="Arrow-Right" color={colors.blueViolet} size={40} />
      </TouchableOpacity>
    </View>
  );
};

CustomTextComponent.defaultProps = {
  type: ''
};

CustomTextComponent.propTypes = {
  type: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(5),
    paddingLeft: horizontalScale(22),
    paddingRight: horizontalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
