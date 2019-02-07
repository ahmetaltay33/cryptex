import React, { Component } from 'react';
import { TextBox, Button } from 'devextreme-react';
import Box, { Item } from 'devextreme-react/box';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule } from 'devextreme-react/validator';
import classes from './Login.module.css';
import firebase from 'firebase';
import { dxAlert } from '../../../shared/dxUtility';

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

  render() {
    return (
      <React.Fragment>
        <Box direction={'col'} width={'100%'} height={125} crossAlign="center" align="center">
          <Item ratio={1}>
            <header>Login Form</header>
          </Item>
          <Item ratio={1}>
            <TextBox
              className={classes.Input}
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
              className={classes.Input}
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
              className={classes.Button}
              text='Login'
              onClick={this.loginClickHandle}
              type={'success'} />
          </Item>
        </Box>
      </React.Fragment>
    );
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
        dxAlert('UID: ' + response.user.uid, 'Login Successfully');
      })
      .catch(error => {
        dxAlert(error.message, error.code);
      });
  }
}

export default login;