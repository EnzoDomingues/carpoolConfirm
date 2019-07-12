import React, { Component } from 'react';
import Routes from './routes/Routes';
import NavigationService from './commons/navigation/NavigationService';

export default class App extends Component {
  render() {
    return (
      <Routes
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
    );
  }
}
