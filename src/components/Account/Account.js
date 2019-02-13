import React, { Component } from 'react';
import { SelectBox, CheckBox, TextBox, TextArea, DateBox, Button, ValidationSummary } from 'devextreme-react';
import { Validator, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule, NumericRule } from 'devextreme-react/validator';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import classes from './Account.module.css';
import { generateIdFieldFetchedData, getFormData } from '../../shared/utility';
import { dxNotify, dxAlert } from '../../shared/dxUtility';

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountTypes: null,
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
      UpdateTime: new Date(),
      Active: true
    };
  }

  componentDidUpdate(prevProps) {
    if ((this.props.mode === 'new') && (this.props.mode != prevProps.mode)) {
      this.setState({
        data: this.getEmptyData()
      });
    }
    if ((this.props.mode !== 'new') && (this.props.accountId != null) && (prevProps.accountId != this.props.accountId)) {
      const uid = firebase.auth().currentUser.uid;
      const request = firebase.database().ref('vault').child(uid).child(this.props.accountId);
      request.once('value', (snapshot) => {
        const fetchedData = snapshot.val();
        this.setState({
          data: fetchedData
        });
      });
    }
  }

  componentDidMount() {
    if (this.state.accountTypes == null) {
      const request = firebase.database().ref('account_types');
      request.once('value', (snapshot) => {
        const fetchedData = generateIdFieldFetchedData(snapshot.val());
        this.setState({
          accountTypes: fetchedData
        });
      });
    }
  }

  render() {
    const readOnlyMode = !(this.props.mode === 'new' || this.props.mode === 'edit');
    return (
      <form className={classes.Account} onSubmit={this.onFormSubmit}>
        <SelectBox className={classes.Input} name='AccountType' 
          //defaultValue={this.state.accountTypes[0].Id}
          placeholder={'Choose Account Type'}
          dataSource={this.state.accountTypes}
          displayExpr={'Name'}
          valueExpr={'Id'}
          value={this.state.data.AccountType}
          onValueChanged={this.onAccountTypeValueChangedHandle}
          readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}
        >
          <Validator>
            <RequiredRule message={'Account type is required'} />
          </Validator>
        </SelectBox>
        <TextBox className={classes.Input} name='UserName' mode='text' placeholder='Enter user name' value={this.state.data.UserName} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}>
          <Validator>
            <RequiredRule message={'User name is required'} />
          </Validator>
        </TextBox>
        <TextBox className={classes.Input} name='Password' mode='text' placeholder='Enter password' value={this.state.data.Password} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}>
          <Validator>
            <RequiredRule message={'Password is required'} />
          </Validator>
        </TextBox>
        <TextBox className={classes.Input} name='WebSite' mode='url' placeholder='Web Site' value={this.state.data.WebSite} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}>
        </TextBox>
        <TextBox className={classes.Input} name='Email' mode='email' placeholder='E-Mail' value={this.state.data.Email} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}>
          <Validator>
            <EmailRule message={'Email is invalid'} />
          </Validator>
        </TextBox>
        <TextBox className={classes.Input} name='Phone' mode='tel' placeholder='Phone Number' maxLength={10} value={this.state.data.Phone} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}>
          <Validator>
            <NumericRule message={'Phone number is invalid. You should enter only numeric value.'} />
          </Validator>
        </TextBox>
        <TextArea className={classes.Input} name='Description' mode='text' placeholder='Enter description' value={this.state.data.Description} valueChangeEvent='input' onValueChanged={this.onValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}/>
        <DateBox className={classes.Input} name='UpdateTime' placeholder='Updated Time' displayFormat={'dd.MM.yyyy HH:mm'} type={'datetime'} showClearButton={true} useMaskBehavior={true} value={this.state.data.UpdateTime} onValueChanged={this.onUpdateTimeValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}/>
        <CheckBox className={classes.Input} name='Active' text='Active' defaultValue={true} value={this.state.data.Active} onValueChanged={this.onActiveValueChangedHandle} readOnly={readOnlyMode} hoverStateEnabled={!readOnlyMode}/>
        <ValidationSummary id={'summary'} />
        <Button className={classes.Button} text='Save' type='success' useSubmitBehavior={true} disabled={readOnlyMode}/>
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
    const uid = firebase.auth().currentUser.uid;
    let key;
    switch (this.props.mode) {
      case 'new': {
        key = firebase.database().ref('vault').child(uid).push().key;
        break;
      }
      case 'edit': {
        key = this.props.accountId;
        break;
      }
      default:
        return;
    }
    const data = { ...this.state.data };
    firebase.database().ref('vault').child(uid).child(key).update(data, (error) => {
      if (error)
        dxAlert(error);
      else {
        dxNotify('You have saved changes successfully.');
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