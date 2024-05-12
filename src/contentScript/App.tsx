import React from 'react'
import { store } from './redux'
import { Provider } from 'react-redux'
import DraggableButton from './components/DraggableButton/DraggableButton'

const App = () => {
  return (
    <Provider store={store}>
      <DraggableButton />
    </Provider>
  )
}

export default App
