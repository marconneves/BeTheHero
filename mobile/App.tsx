/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';

import * as Sentry from '@sentry/react-native';

import Routes from './src/routes';

Sentry.init({
  dsn: 'https://ad6d0b5b7846468f82caf666f3109199@o497854.ingest.sentry.io/5576280',
});

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default App;
