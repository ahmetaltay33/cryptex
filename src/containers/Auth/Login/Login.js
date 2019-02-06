import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { TextBox, Button } from 'devextreme-react';
import Box, { Item } from 'devextreme-react/box';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule } from 'devextreme-react/validator';
import classes from './Login.module.css';
import axios from 'axios';
import firebase from 'firebase';

export class login extends Component {
  //static propTypes = {
  //}
  constructor(props) {
    super(props);
    this.state = {
      eMail: '',
      password: ''
    };
    this.eMailChangeHandle = this.eMailChangeHandle.bind(this);
    this.passwordChangeHandle = this.passwordChangeHandle.bind(this);
    this.loginClickHandle = this.loginClickHandle.bind(this);
  }

  eMailChangeHandle(e) {
    this.setState({
      eMail: e.value
    });
  }

  passwordChangeHandle(e) {
    this.setState({
      password: e.value
    });
  }

  loginClickHandle() {
    firebase.auth().signInWithEmailAndPassword(this.state.eMail, this.state.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Box direction={'col'} width={'100%'} height={125} crossAlign="center" align="center">
          <Item ratio={1}>
            <header>Login Form</header>
          </Item>
          <Item ratio={1}>
            <TextBox
              //value={this.state.userName}
              onValueChanged={this.eMailChangeHandle}
              valueChangeEvent='input'
              mode='email'
              //validationError='E-mail address is not valid!'
              validationMessageMode='auto'
              maxLength='100'>
              <Validator>
                <RequiredRule message={'Email is required'} />
                <EmailRule message={'Email is invalid'} />
              </Validator>
            </TextBox>
          </Item>
          <Item ratio={1}>
            <TextBox
              //value={this.state.password}
              onValueChanged={this.passwordChangeHandle}
              valueChangeEvent='input'
              mode='password'
              maxLength='10'>
              <Validator>
                <RequiredRule message={'Password is required'} />
              </Validator>
            </TextBox>
          </Item>
          <Item ratio={1}>
            <Button
              text='Login'
              onClick={this.loginClickHandle}
              type={'success'} />
          </Item>
        </Box>
      </React.Fragment>
    );
  }
}

export default login;