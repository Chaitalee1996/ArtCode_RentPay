
import React from 'react'
import AppContainer from './src/navigation/AppContainer'
import { store } from './src/services/redux/reduxStore'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
   
  )
}

export default App
