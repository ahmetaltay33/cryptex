import React, { Component } from 'react'
import classes from './Account.module.css'
import { SelectBox, CheckBox, TextBox, TextArea, DateBox, Button, ValidationSummary } from 'devextreme-react';
import {
  Validator,
  RequiredRule,
  CompareRule,
  EmailRule,
  PatternRule,
  StringLengthRule,
  RangeRule
} from 'devextreme-react/validator';
import notify from 'devextreme/ui/notify';
import { getFormData } from '../../shared/utility';
import firebase from 'firebase'

export class Account extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    notify({
      message: 'You have submitted the form',
      position: {
        my: 'center top',
        at: 'center top'
      }
    }, 'success', 3000);
    e.preventDefault();
    const obj = getFormData(e.target);
    const key = firebase.database().ref().child('vault').push().key;
    let data = {};
    data['/vault/'+key] = obj;
    firebase.database().ref().update(data, (error) => {
      if(error)
        console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <SelectBox name='AccountType' placeholder='Account Type'>
        </SelectBox>
        <TextBox name='UserName' mode='text' placeholder='Enter user name'>
          <Validator>
            <RequiredRule message={'User name is required'} />
          </Validator>
        </TextBox>
        <TextBox name='Password' mode='password' placeholder='Enter password'>
          <Validator>
            <RequiredRule message={'Password is required'} />
          </Validator>
        </TextBox>
        <TextBox name='WebSite' mode='url' placeholder='Web Site'>
        </TextBox>
        <TextBox name='Email' mode='email' placeholder='E-Mail'>
          <Validator>
            <EmailRule message={'Email is invalid'} />
          </Validator>
        </TextBox>
        <TextBox name='Phone' mode='tel' placeholder='Telephone'>
        </TextBox>
        <TextArea name='Description' mode='text' placeholder='Enter description'>
        </TextArea>
        <DateBox name='UpdateTime' placeholder='Updated Time'>
        </DateBox>
        <CheckBox name='Active' text='Active' defaultValue={true}>
        </CheckBox>
        <ValidationSummary id={'summary'}></ValidationSummary>
        <Button text='Save' type='success' useSubmitBehavior={true} />
      </form>
    )
  }
}

export default Account