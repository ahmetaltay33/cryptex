import React, { Component } from 'react'
import Login from './containers/Auth/Login/Login'
import Vault from './containers/Vault/Vault'

class App extends Component {
  render() {
    const IsAuthenticated = true;
    let content = <Login />;
    if(IsAuthenticated){
      content =  <Vault />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
