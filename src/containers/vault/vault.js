import React, { Component } from 'react'
import classes from './Vault.module.css'
import Button from 'devextreme-react/button'
import Account from '../../components/Account/Account';

export class Vault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      openMode: null
    };
    this.openAccountButtonCLickHandle = this.openAccountButtonCLickHandle.bind(this);
    this.newAccountButtonCLickHandle = this.newAccountButtonCLickHandle.bind(this);
    this.editAccountButtonCLickHandle = this.editAccountButtonCLickHandle.bind(this);
    this.deleteAccountButtonCLickHandle = this.deleteAccountButtonCLickHandle.bind(this);
  }

  openAccountButtonCLickHandle(e) {
    this.setState({ selectedId: 1, openMode: 'open' });
    console.log('Open Account was clicked', e);
  }

  newAccountButtonCLickHandle(e) {
    this.setState({ selectedId: 1, openMode: 'new' });
    console.log('New Account was clicked', e);
  }

  editAccountButtonCLickHandle(e) {
    this.setState({ selectedId: 1, openMode: 'edit' });
    console.log('Edit Account was clicked', e);
  }

  deleteAccountButtonCLickHandle(e) {
    this.setState({ selectedId: 1, openMode: 'delete' });
    console.log('Delete Account was clicked', e);
  }

  render() {
    let accountPopup = null;
    if (this.state.openMode != null) {
      accountPopup = <Account />
    }
    return (
      <React.Fragment>
        <div className={classes.Vault}>
          <Button text='Open Selected Account Detail' onClick={this.openAccountButtonCLickHandle} />
          <Button text='Add New Account' onClick={this.newAccountButtonCLickHandle} />
          <Button text='Edit Selected Account' onClick={this.editAccountButtonCLickHandle} />
          <Button text='Delete Selected Account' onClick={this.deleteAccountButtonCLickHandle} />
          <p>This is the vault page, mean is list of accounts.</p>
        </div>
        {accountPopup}
      </React.Fragment>
    )
  }
}

export default Vault