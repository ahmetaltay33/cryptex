import React, { Component } from 'react'
import { SelectBox, CheckBox, TextBox, TextArea, DateBox, Button, ValidationSummary } from 'devextreme-react';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule } from 'devextreme-react/validator';
import notify from 'devextreme/ui/notify';
import firebase from 'firebase'
import PropTypes from 'prop-types'

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false,
      numberOfGuests: 10,
      mode: this.props.mode,
      accountId: this.props.accountId,
      data: {
        AccountType: null,
        UserName: null,
        Password: null,
        WebSite: null,
        Email: null,
        Phone: null,
        Description: null,
        UpdateTime: null,
        Active: null
      }
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onValueChangedHandle = this.onValueChangedHandle.bind(this);
    this.onActiveValueChangedHandle = this.onActiveValueChangedHandle.bind(this);
    this.onUpdateTimeValueChangedHandle = this.onUpdateTimeValueChangedHandle.bind(this);
  }

  componentDidMount() {
    if (this.state.accountId) {
      const request = firebase.database().ref('vault/' + this.state.accountId);
      request.on('value', (snapshot) => {
        const fetchedData = snapshot.val();
        this.setState({
          data: fetchedData
        });
      });
    }
  }

  render() {
    let saveButton = null;
    if (this.state.mode === 'new' || this.state.mode === 'edit')
      saveButton = <Button text='Save' type='success' useSubmitBehavior={true} />
    return (
      <form onSubmit={this.onFormSubmit}>
        <SelectBox name='AccountType' placeholder='Account Type'>
        </SelectBox>
        <TextBox name='UserName' mode='text' placeholder='Enter user name' value={this.state.data.UserName} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle}>
          <Validator>
            <RequiredRule message={'User name is required'} />
          </Validator>
        </TextBox>
        <TextBox name='Password' mode='password' placeholder='Enter password' value={this.state.data.Password} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle}>
          <Validator>
            <RequiredRule message={'Password is required'} />
          </Validator>
        </TextBox>
        <TextBox name='WebSite' mode='url' placeholder='Web Site' value={this.state.data.WebSite} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle}>
        </TextBox>
        <TextBox name='Email' mode='email' placeholder='E-Mail' value={this.state.data.Email} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle}>
          <Validator>
            <EmailRule message={'Email is invalid'} />
          </Validator>
        </TextBox>
        <TextBox name='Phone' mode='tel' placeholder='Phone Number' value={this.state.data.Phone} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle}>
        </TextBox>
        <TextArea name='Description' mode='text' placeholder='Enter description' value={this.state.data.Description} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle}>
        </TextArea>
        <DateBox name='UpdateTime' placeholder='Updated Time' value={this.state.data.UpdateTime} onValueChanged={this.onUpdateTimeValueChangedHandle}>
        </DateBox>
        <CheckBox name='Active' text='Active' defaultValue={true} value={this.state.data.Active} onValueChanged={this.onActiveValueChangedHandle}>
        </CheckBox>
        <ValidationSummary id={'summary'}></ValidationSummary>
        {saveButton}
      </form>
    )
  }

  onUpdateTimeValueChangedHandle(e) {
    var newData = { ...this.state.data };
    newData.UpdateTime = e.value;
    this.setState({
      data: newData
    });
  }

  onActiveValueChangedHandle(e) {
    var newData = { ...this.state.data };
    newData.Active = e.value;
    this.setState({
      data: newData
    });
  }

  onValueChangedHandle(e) {
    const event = e.event;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var newData = { ...this.state.data };
    newData[name] = value;
    this.setState({
      data: newData
    });
  }

  onFormSubmit(e) {
    switch (this.state.mode) {
      case 'new': {
        const key = firebase.database().ref().child('vault').push().key;
        let data = {};
        data['/vault/' + key] = this.state.data;
        firebase.database().ref().update(data, (error) => {
          if (error)
            console.log(error);
          else {
            notify({
              message: 'You have submitted the form',
              position: {
                my: 'center top',
                at: 'center top'
              }
            }, 'success', 3000);
          }
        });
        e.preventDefault();
        break;
      }
      case 'edit': {
        break;
      }
      default: break;
    }
  }
}

Account.propTypes = {
  accountId: PropTypes.string,
  mode: PropTypes.oneOf(['open', 'edit', 'new']),
};

export default Account