import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/store'
import RouterProviderAB from './components/providers/RouterProviderAB'

function App() {

  return (
    <Provider store={store}>
        <RouterProviderAB/>
    </Provider>
  )
}

export default App
