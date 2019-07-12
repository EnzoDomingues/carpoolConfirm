import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TransitionConfiguration from '../commons/TransitionConfiguration';
import { Header } from '../components/Header';

//scenes
import ChooseHomeScene from '../scenes/ChooseHomeScene';
import DriverScene from '../scenes/DriverScene';
import PassengerScene from '../scenes/PassengerScene';
import ShareLocationScene from '../scenes/ShareLocationScene';

const Router = createStackNavigator(
  {
    ChooseHomeScene: {
      screen: ChooseHomeScene,
      navigationOptions: {
        header: null
      }
    },

    DriverScene: {
      screen: DriverScene,
      navigationOptions: {
        header: <Header type="Driver" />
      }
    },

    PassengerScene: {
      screen: PassengerScene,
      navigationOptions: {
        header: <Header />
      }
    },

    ShareLocationScene: {
      screen: ShareLocationScene,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    transitionConfig: TransitionConfiguration,
    initialRouteName: 'ChooseHomeScene'
  }
);

export default createAppContainer(Router);
