import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/store'
import RouterProviderAB from './components/providers/RouterProviderAB'
import { useEffect } from 'react';
import { getAuth } from './services/authorization/auth-service';

function App() {


  // Check user authorizations every 20 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAuth();
    }, 20000); // 20 segundos

    return () => clearInterval(intervalId);
  }, []);

  // Set a token in local storage
  useEffect(() => {
    localStorage.setItem('token', '1c525638-d6a2-4e0b-bdd6-f36f1d957201');
  }, []);

  return (
    <Provider store={store}>
        <RouterProviderAB/>
    </Provider>
  )
}

export default App
