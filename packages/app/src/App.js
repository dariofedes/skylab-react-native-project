import React, { useState } from 'react';
import {View} from 'react-native';
import Register from './compos/Register'
import Login from './compos/Login'

import registerUser from '@skylab/client-logic/src/users/registerUser'

const App = () => {
  const [view, setView] = useState('register')

  function handleOnToLogin() {
    setView('login')
  }

  function handleOnSubmit(email, username, password) {
    // on submit
  }
  

  return (
    <View style={{ flex: 1 }}>
       {view === 'register' && <Register
        onToLogin={handleOnToLogin}
        onSubmit={handleOnSubmit}
       />}
       {view === 'login' && <Login />}
    </View>
  );
};


export default App;
