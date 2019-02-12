import React, { Component } from 'react';
import { TextBox, Button, ValidationSummary } from 'devextreme-react';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule } from 'devextreme-react/validator';
import classes from './Login.module.css';
import firebase from 'firebase';
import { dxAlert } from '../../../shared/dxUtility';
import Label from '../../../components/UI/Label/Label';

export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eMail: '',
      password: ''
    };
    this.eMailChangeHandle = this.eMailChangeHandle.bind(this);
    this.passwordChangeHandle = this.passwordChangeHandle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.signUpClickHandler = this.signUpClickHandler.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className={classes.Container}>
          <header className={classes.HeaderPanel}>
            <h5>Cryptex Login</h5>
          </header>
          <div className={classes.InputPanel}>
            <Label className={classes.Label}>E-Mail Address</Label>
            <TextBox
              className={classes.Input}
              stylingMode="filled"
              onValueChanged={this.eMailChangeHandle}
              valueChangeEvent="input"
              mode="email"
              placeholder="sample@domain.com"
              validationMessageMode="auto">
              <Validator>
                <RequiredRule message={'Email is required'} />
                <EmailRule message={'Email is invalid'} />
              </Validator>
            </TextBox>
          </div>
          <div className={classes.InputPanel}>
            <Label className={classes.Label}>Password</Label>
            <TextBox
              className={classes.Input}
              stylingMode="filled"
              onValueChanged={this.passwordChangeHandle}
              placeholder="Enter your password"
              valueChangeEvent="input"
              mode="password">
              <Validator>
                <RequiredRule message={'Password is required'} />
              </Validator>
            </TextBox>
          </div>
          <ValidationSummary />
          <div className={classes.ButtonPanel}>
            <Button
              className={classes.Button + ' ' + classes.SignIn}
              useSubmitBehavior={true}
              text='Sign In'
              type={'success'} />
            <Button
              className={classes.Button + ' ' + classes.SignUp}
              text='Sign Up'
              onClick={this.signUpClickHandler}
              type={'default'} />
          </div>
        </div>
      </form >
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

  onFormSubmit(e) {
    firebase.auth().signInWithEmailAndPassword(this.state.eMail, this.state.password)
      .then(response => {
        console.log('UID: ' + response.user.uid, 'Sign In Successfully');
      })
      .catch(error => {
        dxAlert(error.message, error.code);
      });
    e.preventDefault();
  }

  signUpClickHandler(e) {
    dxAlert('Users signs up here!!', 'Sign Up');
  }
}

export default login;