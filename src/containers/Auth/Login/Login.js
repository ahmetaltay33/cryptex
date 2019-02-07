import React, { Component } from 'react';
import { TextBox, Button } from 'devextreme-react';
import Box, { Item } from 'devextreme-react/box';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule } from 'devextreme-react/validator';
import classes from './Login.module.css';
import firebase, { auth } from 'firebase';
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
    this.checkUserClickHandle = this.checkUserClickHandle.bind(this);
    this.checkSignOutClickHandle = this.checkSignOutClickHandle.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <Box direction={'col'} width={'100%'} height={230} crossAlign="center" align="center">
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
              text='Sign In'
              onClick={this.loginClickHandle}
              type={'success'} />
          </Item>
          <Item ratio={1}>
            <Button
              className={classes.Button}
              text='Current User'
              onClick={this.checkUserClickHandle}
              type={'default'} />
          </Item>
          <Item ratio={1}>
            <Button
              className={classes.Button}
              text='Sign Out'
              onClick={this.checkSignOutClickHandle}
              type={'danger'} />
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

  loginClickHandle(e) {
    firebase.auth().signInWithEmailAndPassword(this.state.eMail, this.state.password)
      .then(response => {
        dxAlert('UID: ' + response.user.uid, 'Sign In Successfully');
      })
      .catch(error => {
        dxAlert(error.message, error.code);
      });
  }

  checkUserClickHandle(e) {
    if(firebase.auth().currentUser)
      dxAlert('UID: ' + firebase.auth().currentUser.uid, 'Current User');
    else 
      dxAlert('Not found', 'Current User');
  }

  checkSignOutClickHandle(e) {
    firebase.auth().signOut()
      .then(response => {
        console.log(response);
        dxAlert('Successfully', 'Sign Out');
      })
      .catch(error => {
        dxAlert(error.message, error.code);
      });
  }
}

export default login;