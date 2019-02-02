import React, { Component } from 'react'
import classes from './Vault.module.css'
import Button from 'devextreme-react/button'

export class Vault extends Component {
  constructor(props){
    super(props);
    this.openAccountButtonCLickHandle = this.openAccountButtonCLickHandle.bind(this);
    this.newAccountButtonCLickHandle = this.newAccountButtonCLickHandle.bind(this);
    this.editAccountButtonCLickHandle = this.editAccountButtonCLickHandle.bind(this);
    this.deleteAccountButtonCLickHandle = this.deleteAccountButtonCLickHandle.bind(this);
  }

  openAccountButtonCLickHandle(e){
    console.log('Open Account was clicked', e);
  }

  newAccountButtonCLickHandle(e){
    console.log('New Account was clicked', e);
  }

  editAccountButtonCLickHandle(e){
    console.log('Edit Account was clicked', e);
  }

  deleteAccountButtonCLickHandle(e){
    console.log('Delete Account was clicked', e);
  }

  render() {
    return (
      <div className={classes.Vault}>
        <Button text='Open Selected Account Detail' onClick={this.openAccountButtonCLickHandle}/>
        <Button text='Add New Account' onClick={this.newAccountButtonCLickHandle}/>
        <Button text='Edit Selected Account' onClick={this.editAccountButtonCLickHandle}/>
        <Button text='Delete Selected Account' onClick={this.deleteAccountButtonCLickHandle}/>
        <p>This is the vault page, mean is list of accounts.</p>
      </div>
    )
  }
}

export default Vault