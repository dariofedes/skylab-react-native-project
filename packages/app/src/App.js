import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Register from './screens/Register'
import Login from './screens/Login'
import Home from './screens/Home'
import registerUser from '@skylab/client-logic/src/users/register-user';
import Context from '@skylab/services/src/Context';
import { API_URL } from '../config'

import { getAppBackgroundColor } from './utils/Colors'

Context.API_URL = API_URL

const App = () => {
  const [view, setView] = useState('register')

  function handleView(route) {
    setView(route)
  }

  async function onRegister(email, username, password) {
    // on submit: register and then go to login
      await registerUser(email, username, password)

      setView('login')
    
  }

  function onLogin(email, password) {
    // on submit: login and then go home
    setView('home')
  }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getAppBackgroundColor(view) }}>
      {view === 'register' && <Register
        goToLogin={() => handleView('login')}
        onSubmit={onRegister}
      />}
      {view === 'login' && <Login 
        goToRegister={() => handleView('register')}
        onSubmit={onLogin}
      />}
      {view === 'home' && <Home 
        goBack={() => handleView('register')}
      />}
    </SafeAreaView>
  );
};


export default App;
