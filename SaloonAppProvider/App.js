import { View, Text } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash'
import { Provider } from 'react-redux';
import configureStore from "./src/Data/Local/Store/redux";

const store = configureStore()
const App = () => {
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  )
}

export default App