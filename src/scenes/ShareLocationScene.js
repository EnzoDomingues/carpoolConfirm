import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import { confirmDriver, confirmPassenger } from '../../api';

//Components
import { CustomTextComponent } from '../components';

//Commons
import NavigationService from '../commons/navigation/NavigationService';
import { verticalScale, fontScale, horizontalScale } from '../commons/Scaling';
import Icon from '../commons/Icon';
import { get, post } from '../commons/http/httpRequest';

//constants
import colors from '../constants/colors';

const postConfirmCurDriver = (id, currenLocal) => {
  post(`${endpoint}/ride/${id}/confirm-driver`, {
    body: JSON.stringify({
      currenLocal
    })
  })
    .then(response => {
      const data = response.data;
      setId(data.id);
      setQrCode(data.qrCode);
    })
    .catch(error => {
      console.log(error);
    });
};

const postConfirmCurPassenger = (id, currenLocal) => {
  post(`${endpoint}/ride/${id}/confirm-passenger`, {
    body: JSON.stringify({
      currenLocal
    })
  })
    .then(response => {
      const data = response.data;
      setId(data.id);
      setQrCode(data.qrCode);
    })
    .catch(error => {
      console.log(error);
    });
};

export default function ShareLocationScene({ navigation }) {
  const user = navigation.getParam('user', '');
  const rideId = navigation.getParam('rideId', '');
  const currenLocalDriver = navigation.getParam('currenLocalDriver', '');
  const currenLocalPassenger = navigation.getParam('currenLocalPassenger', '');
  const distance = navigation.getParam('distance', '');

  console.log('drive', currenLocalDriver);
  console.log(currenLocalPassenger);

  const driverLatLng = {
    latitude: parseFloat(currenLocalDriver.split(',')[0]),
    longitude: parseFloat(currenLocalDriver.split(',')[1])
  };

  const passengerLatLng = {
    latitude: parseFloat(currenLocalPassenger.split(',')[0]),
    longitude: parseFloat(currenLocalPassenger.split(',')[1])
  };

  return (
    <View style={styles.container}>
      {user === 'Passenger' && (
        <>
          <CustomTextComponent
            text={'O id do seu motorista é'}
            size={fontScale(18)}
            color={colors.black}
          />
          <CustomTextComponent
            text={rideId}
            size={fontScale(18)}
            color={colors.blueViolet}
            style={{
              marginBottom: verticalScale(20)
            }}
          />
        </>
      )}

      <CustomTextComponent
        text={`Seu ${
          user === 'Driver' ? 'passageiro' : 'motorista'
        } está a ${distance} metros`}
        size={fontScale(18)}
        color={colors.black}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            ...(user === 'Driver' ? driverLatLng : passengerLatLng),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker
            coordinate={driverLatLng}
            title={
              user === 'Passenger' ? 'Você está aqui' : 'O motorista está aqui'
            }
          />
          <Marker
            coordinate={passengerLatLng}
            title={
              user === 'Driver' ? 'Você está aqui' : 'O passageiro está aqui'
            }
          />
        </MapView>
      </View>

      <TouchableOpacity
        onPress={() => NavigationService.navigate('ChooseHomeScene')}
        style={styles.buttonConfirm}
      >
        <CustomTextComponent
          text={'Finzalizar'}
          size={fontScale(18)}
          style={{ textAlign: 'center' }}
          color={colors.white}
          bold
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  mapContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 8,
    marginTop: 24
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8
  },
  textCenter: {
    textAlign: 'center'
  },

  buttonConfirm: {
    marginTop: verticalScale(60),
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(13),
    borderRadius: 8,
    backgroundColor: colors.blueViolet
  }
});
