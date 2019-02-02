import React, { Component } from 'react'
import classes from './Vault.module.css'
import Button from 'devextreme-react/button'
import Account from '../../components/Account/Account';
import VaultGrid from '../../components/Vault/Vault'

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
    this.onSelectedChangedHandle = this.onSelectedChangedHandle.bind(this);
  }

  render() {
    let accountPopup = null;
    if (this.state.openMode != null) {
      accountPopup = <Account mode={this.state.openMode} accountId={this.state.selectedId}/>
    }
    return (
      <React.Fragment>
        <div className={classes.Vault}>
          <Button text='Open Selected Account Detail' onClick={this.openAccountButtonCLickHandle} />
          <Button text='Add New Account' onClick={this.newAccountButtonCLickHandle} />
          <Button text='Edit Selected Account' onClick={this.editAccountButtonCLickHandle} />
          <Button text='Delete Selected Account' onClick={this.deleteAccountButtonCLickHandle} />
          <p>This is the vault page, mean is list of account informations.</p>
        </div>
        <VaultGrid onSelectedChanged={this.onSelectedChangedHandle}/>
        {accountPopup}
      </React.Fragment>
    )
  }

  onSelectedChangedHandle(data){
    console.log('grid selection changed', data);
    this.setState({
      selectedId: data.Id
    });
  }

  openAccountButtonCLickHandle(e) {
    this.setState({ openMode: 'open' });
  }

  newAccountButtonCLickHandle(e) {
    this.setState({ openMode: 'new' });
  }

  editAccountButtonCLickHandle(e) {
    this.setState({ openMode: 'edit' });
  }

  deleteAccountButtonCLickHandle(e) {
    //this.setState({ openMode: 'delete' });
  }
}

export default Vault