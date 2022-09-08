import { View, Text } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash'
import { Provider } from 'react-redux';
import configureStore from "./src/Data/Local/Store/redux";
import FlashMessage from "react-native-flash-message";

const store = configureStore()
const App = () => {
  return (
    <Provider store={store}>
      <Splash />
      <FlashMessage position="top" />
    </Provider>
  )
}

export default App