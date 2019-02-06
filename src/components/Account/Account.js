import React, { Component } from 'react';
import { SelectBox, CheckBox, TextBox, TextArea, DateBox, Button, ValidationSummary } from 'devextreme-react';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule } from 'devextreme-react/validator';
import notify from 'devextreme/ui/notify';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import classes from './Account.module.css';
import dxDialog from 'devextreme/ui/dialog';
import { generateIdFieldFetchedData } from '../../shared/utility';

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountTypes: [{ Id: 0, Name: 'Empty', Description: 'Empty' }],
      data: this.getEmptyData()
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onValueChangedHandle = this.onValueChangedHandle.bind(this);
    this.onActiveValueChangedHandle = this.onActiveValueChangedHandle.bind(this);
    this.onUpdateTimeValueChangedHandle = this.onUpdateTimeValueChangedHandle.bind(this);
    this.onAccountTypeValueChangedHandle = this.onAccountTypeValueChangedHandle.bind(this);
  }

  getEmptyData() {
    return {
      AccountType: null,
      UserName: null,
      Password: null,
      WebSite: null,
      Email: null,
      Phone: null,
      Description: null,
      UpdateTime: null,
      Active: null
    };
  }

  componentDidUpdate(prevProps) {
    if ((this.props.mode === 'new') && (this.props.mode != prevProps.mode)) {
      this.setState({
        data: this.getEmptyData()
      });
    }
    if ((this.props.mode !== 'new') && (this.props.accountId != null) && (prevProps.accountId != this.props.accountId)) {
      const request = firebase.database().ref('vault/' + this.props.accountId);
      request.once('value', (snapshot) => {
        const fetchedData = snapshot.val();
        this.setState({
          data: fetchedData
        });
      });
    }
  }

  componentDidMount() {
    const request = firebase.database().ref('account_types');
    request.once('value', (snapshot) => {
      const fetchedData = generateIdFieldFetchedData(snapshot.val());
      this.setState({
        accountTypes: fetchedData
      });
    });
  }

  render() {
    const saveDisabled = !(this.props.mode === 'new' || this.props.mode === 'edit');
    return (
      <form className={classes.Account} onSubmit={this.onFormSubmit}>
        <SelectBox name='AccountType'
          //defaultValue={this.state.accountTypes[0].Id}
          placeholder={'Choose Account Type'}
          dataSource={this.state.accountTypes}
          displayExpr={'Name'}
          valueExpr={'Id'}
          value={this.state.data.AccountType}
          onValueChanged={this.onAccountTypeValueChangedHandle}
        >
          <Validator>
            <RequiredRule message={'Account type is required'} />
          </Validator>
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
        <Button text='Save' type='success' useSubmitBehavior={true} disabled={saveDisabled} />
      </form>
    );
  }

  onAccountTypeValueChangedHandle(e) {
    var newData = { ...this.state.data };
    newData.AccountType = e.value;
    this.setState({
      data: newData
    });
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
    let key;
    switch (this.props.mode) {
      case 'new': {
        key = firebase.database().ref().child('vault').push().key;
        break;
      }
      case 'edit': {
        key = this.props.accountId;
        break;
      }
      default:
        return;
    }
    let data = {};
    data['/vault/' + key] = this.state.data;
    firebase.database().ref().update(data, (error) => {
      if (error)
        dxDialog.alert(error);
      else {
        notify({
          message: 'You have submitted the form',
          position: {
            my: 'center top',
            at: 'center top'
          }
        }, 'success', 3000);
        this.props.onFormSubmitted();
      }
    });
    e.preventDefault();
  }
}

Account.propTypes = {
  accountId: PropTypes.string,
  mode: PropTypes.oneOf(['open', 'edit', 'new']),
  onFormSubmitted: PropTypes.func.isRequired
};

export default Account;