import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.dark.compact.css';
import firebase from 'firebase';

var config = {
    apiKey: 'AIzaSyBYU-IkqYqEhvL9QNFFUfPZF4DbjSTHnn0',
    authDomain: 'cryptex-72ee5.firebaseapp.com',
    databaseURL: 'https://cryptex-72ee5.firebaseio.com',
    projectId: 'cryptex-72ee5',
    storageBucket: 'cryptex-72ee5.appspot.com',
    messagingSenderId: '1022914030119'
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));