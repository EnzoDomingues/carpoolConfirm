import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import RNLocation from 'react-native-location';

//Components
import {
  CustomTextComponent,
  FeedBackErrorGeneric,
  ModalGeneric
} from '../components';

//Commons
import NavigationService from '../commons/navigation/NavigationService';
import { verticalScale, fontScale, horizontalScale } from '../commons/Scaling';
import Icon from '../commons/Icon';
import { get, post } from '../commons/http/httpRequest';

//constants
import colors from '../constants/colors';
import defaultConfig from '../constants/defaultConfig';

const endpoint = `${defaultConfig.API_URL}`;

const { height } = Dimensions.get('window');

// const postFirstRide = (currenLocal) => {
//   post(`${endpoint}/newRide`, {
//     body: JSON.stringify({
//       currenLocal
//     })
//   })
//     .then(response => {
//       const data = response.data;
//       setId(data.id);
//       setQrCode(data.qrCode);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

const postFirstRide = currenLocal => {
  return fetch(`${endpoint}/newRide`, {
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

const ErroSelectedModal = ({ erroSelected, setErroSelected }) => (
  <ModalGeneric
    typeAnimation="slide"
    isTransparent
    paddingScroll={32}
    isOpacity
    isVisible={erroSelected}
    onClose={() => setErroSelected(false)}
    mTop={height * 0.4}
  >
    <FeedBackErrorGeneric
      textTitle={`Xiii!`}
      textDesc={`Você ainda nao escaneiou o QrCode,\npor favor, volte e escaneie para continuar..`}
    />
  </ModalGeneric>
);

const getRide = id => {
  return fetch(`${endpoint}/newRide/${id}`);
};

const onPress = async (id, setErroSelected) => {
  const response = await getRide(id);
  const {
    scanned,
    currenLocalDriver,
    currenLocalPassenger,
    distance
  } = await response.json();

  if (!scanned) {
    setErroSelected(true);
  } else {
    NavigationService.navigate('ShareLocationScene', {
      user: 'Driver',
      currenLocalDriver,
      currenLocalPassenger,
      distance,
      rideId: id
    });
  }
};

export default function DriverScene({ navigation }) {
  const name = navigation.state.params.name ? navigation.state.params.name : '';

  const [id, setId] = useState(null);
  const [erroSelected, setErroSelected] = useState(false);
  const [qrCodin, setQrCode] = useState('');

  useEffect(() => {
    (async () => {
      const location = await RNLocation.getLatestLocation({ timeout: 60000 });
      const currenLocal = `${location.latitude},${location.longitude}`;
      const response = await postFirstRide(currenLocal);
      const { qrCode, id } = await response.json();
      console.log(qrCode);

      setId(id);
      setQrCode(qrCode);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <CustomTextComponent
        text={`${name}, `}
        size={fontScale(18)}
        style={{
          marginBottom: verticalScale(10)
        }}
        color={colors.black}
      />
      {id && (
        <>
          <CustomTextComponent
            text={'Seu id é: '}
            size={fontScale(18)}
            color={colors.black}
          />
          <CustomTextComponent
            text={id}
            size={fontScale(18)}
            color={colors.blueViolet}
            style={{
              marginBottom: verticalScale(20)
            }}
          />
        </>
      )}
      <CustomTextComponent
        text={'Por favor peça ao passageiro que\nescaneie o QrCode abaixo.'}
        size={fontScale(14)}
        style={{
          marginBottom: verticalScale(20)
        }}
        color={colors.blackAlpha80}
      />
      {qrCodin ? (
        <Image source={{ uri: qrCodin }} style={styles.qrCode} />
      ) : (
        <View style={styles.qrCode} />
      )}

      <TouchableOpacity
        onPress={() => onPress(id, setErroSelected)}
        style={styles.buttonConfirm}
      >
        <CustomTextComponent
          text={'Continuar'}
          size={fontScale(18)}
          style={{ textAlign: 'center' }}
          color={colors.white}
          bold
        />
      </TouchableOpacity>
      <ErroSelectedModal
        setErroSelected={setErroSelected}
        erroSelected={erroSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: horizontalScale(32),
    paddingRight: horizontalScale(32),
    paddingTop: verticalScale(50),
    backgroundColor: colors.blackAlpha30
  },
  title: {
    textAlign: 'center'
  },
  qrCode: {
    width: 300,
    height: 300,
    marginTop: verticalScale(20)
  },
  driverId: {
    textAlign: 'center',
    marginTop: verticalScale(20)
  },
  buttonConfirm: {
    marginTop: verticalScale(60),
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(13),
    borderRadius: 8,
    backgroundColor: colors.blueViolet
  }
});
