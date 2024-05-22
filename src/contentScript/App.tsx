import React from 'react'
import { store } from './redux'
import { Provider } from 'react-redux'
import DraggableButton from './components/DraggableButton/DraggableButton'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

const App = () => {
  return (
    <Provider store={store}>
      <DraggableButton />
    </Provider>
  )
}

const LDProvider = withLDProvider({
  clientSideID: '664e2331dfb5350fc5ee4ddc',
})(App)

export default LDProvider
