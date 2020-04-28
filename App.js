// App.js

import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux';
import Store from './Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native';
import codePush from "react-native-code-push";

class App extends React.Component {

  componentDidMount() {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE
    })
  }
  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}

let codePushOptions = {
  checkFrequency : codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE
}

export default App = codePush(codePushOptions)(App)