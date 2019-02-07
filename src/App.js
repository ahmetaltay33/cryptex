import React, { Component } from 'react';
import Login from './containers/Auth/Login/Login';
import Vault from './containers/Vault/Vault';
import firebase from 'firebase';

class App extends Component {
  render() {
    console.log(firebase.auth().currentUser);
    let content = firebase.auth().currentUser ? <Vault /> : <Login />;
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
