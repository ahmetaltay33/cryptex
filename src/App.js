import React, { Component } from 'react';
import Login from './containers/Auth/Login/Login';
import Vault from './containers/Vault/Vault';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialize: true,
      authenticatied: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        authenticatied: user ? true : false,
      });
    });
  }

  render() {
    let content = this.state.authenticatied ? <Vault /> : <Login />;
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

export default App;
