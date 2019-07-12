import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNLocation from 'react-native-location';

//Commons
import NavigationService from '../commons/navigation/NavigationService';
import { verticalScale, fontScale, horizontalScale } from '../commons/Scaling';
import { get, post } from '../commons/http/httpRequest';

//constants
import colors from '../constants/colors';
import defaultConfig from '../constants/defaultConfig';

const endpoint = `${defaultConfig.API_URL}`;

export default function PassengerScreen({ navigation }) {
  const postScanner = (id, currenLocal) => {
    return fetch(`${endpoint}/ride/${id}/scan-passenger`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currenLocal
      })
    });
  };

  const onQrCode = async e => {
    const location = await RNLocation.getLatestLocation({ timeout: 60000 });
    const currenLocal = `${location.latitude},${location.longitude}`;
    const response = await postScanner(e.data, currenLocal);

    const {
      id,
      currenLocalDriver,
      currenLocalPassenger,
      distance
    } = await response.json();

    NavigationService.navigate('ShareLocationScene', {
      user: 'Passenger',
      currenLocalDriver,
      currenLocalPassenger,
      distance,
      rideId: id
    });
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner onRead={onQrCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(50),
    backgroundColor: colors.blackAlpha30
  }
});
