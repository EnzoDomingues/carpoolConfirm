import React, { useEffect, useState } from 'react';
import RNLocation from 'react-native-location';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';

//Components
import { CustomTextComponent, InputTextComponent } from '../components';

//Commons
import { verticalScale, fontScale, horizontalScale } from '../commons/Scaling';
import Icon from '../commons/Icon';
import NavigationService from '../commons/navigation/NavigationService';

//constants
import colors from '../constants/colors';

const nextScene = (typeChoose, name) => {
  if (typeChoose == 'Motorista') {
    NavigationService.navigate('DriverScene', {
      name
    });
  } else {
    NavigationService.navigate('PassengerScene');
  }
};

const ChooseQuantityScene = () => {
  useEffect(() => {
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'Nós precisamos de acesso à sua localização',
          message: '',
          buttonPositive: 'OK',
          buttonNegative: 'Cancelar'
        }
      }
    });
    RNLocation.configure({ distanceFilter: 0 });
  }, []);
  const [name, setName] = useState('');
  const [typeChoose, setTypeChoose] = useState('');
  const [active, setActive] = useState(false);
  return (
    <View style={styles.container}>
      <CustomTextComponent
        text={'Bem Vindo ao Teste Bynd :)'}
        size={fontScale(18)}
        style={{ marginBottom: verticalScale(20) }}
        color={colors.black}
      />

      {!active && (
        <InputTextComponent
          title="Qual é o seu nome?"
          placeholder="Digite seu nome"
          titleColor={colors.black}
          containerStyle={styles.containerInput}
          onChangeText={text => setName(text)}
          onEndEditing={() => setActive(true)}
          value={name}
        />
      )}

      {active && (
        <>
          <CustomTextComponent
            text={`Seja Bem Vindo: `}
            size={fontScale(18)}
            style={{ marginTop: verticalScale(40) }}
            color={colors.blueViolet}
          />
          <CustomTextComponent
            text={`${name}`}
            size={fontScale(18)}
            style={styles.textWelcome}
            color={colors.blueViolet}
            bold
          />
          <CustomTextComponent
            text={`Por favor, selecione a sua Categoria!`}
            size={fontScale(18)}
            style={{ marginBottom: verticalScale(40) }}
            color={colors.black}
          />
          <View style={styles.buttonsChoose}>
            <TouchableOpacity
              onPress={() => setTypeChoose('Motorista')}
              style={
                typeChoose == 'Motorista'
                  ? [styles.buttonChoose, { borderColor: colors.blueViolet }]
                  : styles.buttonChoose
              }
            >
              <CustomTextComponent
                text={'Motorista'}
                size={fontScale(22)}
                style={{ textAlign: 'center' }}
                color={colors.black}
                bold
              />
              <Icon name="Onibus" color={colors.blueViolet} size={115} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTypeChoose('Caroneiro')}
              style={
                typeChoose == 'Caroneiro'
                  ? [styles.buttonChoose, { borderColor: colors.blueViolet }]
                  : styles.buttonChoose
              }
            >
              <CustomTextComponent
                text={'Caroneiro'}
                size={fontScale(22)}
                style={{ textAlign: 'center' }}
                color={colors.black}
                bold
              />
              <Icon name="User" color={colors.blueViolet} size={115} />
            </TouchableOpacity>
          </View>

          {typeChoose != '' && (
            <TouchableOpacity
              onPress={() => nextScene(typeChoose, name)}
              style={styles.buttonConfirm}
            >
              <CustomTextComponent
                text={'Confirmar'}
                size={fontScale(18)}
                style={{ textAlign: 'center' }}
                color={colors.white}
                bold
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: horizontalScale(32),
    paddingRight: horizontalScale(32),
    paddingTop: verticalScale(100),
    backgroundColor: colors.blackAlpha30
  },

  textWelcome: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10)
  },

  buttonsChoose: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonChoose: {
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: verticalScale(10),
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(15),
    borderColor: colors.blackAlpha50
  },

  buttonConfirm: {
    marginTop: verticalScale(60),
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(13),
    borderRadius: 8,
    backgroundColor: colors.blueViolet
  }
});

export default ChooseQuantityScene;
