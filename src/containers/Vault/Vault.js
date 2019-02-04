import React, { Component } from 'react'
import classes from './Vault.module.css'
import Button from 'devextreme-react/button'
import Account from '../../components/Account/Account'
import VaultGrid from '../../components/Vault/Vault'
import { Popup } from 'devextreme-react/popup'

export class Vault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      accountId: null,
      selectedId: null,
      openMode: null
    };
    this.openAccountButtonCLickHandle = this.openAccountButtonCLickHandle.bind(this);
    this.newAccountButtonCLickHandle = this.newAccountButtonCLickHandle.bind(this);
    this.editAccountButtonCLickHandle = this.editAccountButtonCLickHandle.bind(this);
    this.deleteAccountButtonCLickHandle = this.deleteAccountButtonCLickHandle.bind(this);
    this.onSelectedChangedHandle = this.onSelectedChangedHandle.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.Vault}>
          <Button text='Open Selected Account Detail' onClick={this.openAccountButtonCLickHandle} />
          <Button text='Add New Account' onClick={this.newAccountButtonCLickHandle} />
          <Button text='Edit Selected Account' onClick={this.editAccountButtonCLickHandle} />
          <Button text='Delete Selected Account' onClick={this.deleteAccountButtonCLickHandle} />
          <p>This is the vault page, mean is list of account informations.</p>
        </div>
        <VaultGrid onSelectedChanged={this.onSelectedChangedHandle} />
        <Popup
          className={classes.Popup}
          visible={this.state.popupVisible}
          onHiding={this.hideInfo}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showTitle={true}
          title={'Account Detail'}
          width={300}
          height={350}
        >
          <Account mode={this.state.openMode} accountId={this.state.accountId} onFormSubmitted={this.hideInfo}/>
        </Popup>        
      </React.Fragment>
    )
  }

  hideInfo() {
    this.setState({
      popupVisible: false,
      accountId: null
    });
  }

  onSelectedChangedHandle(data) {
    console.log('Vault onSelectedChangedHandle', data.id);
    this.setState({
      selectedId: data.Id
    });
  }

  openAccountButtonCLickHandle(e) {
    this.setState({
      openMode: 'open',
      popupVisible: true,
      accountId: this.state.selectedId
    });
  }

  newAccountButtonCLickHandle(e) {
    this.setState({
      openMode: 'new',
      popupVisible: true,
      accountId: this.state.selectedId
    });
  }

  editAccountButtonCLickHandle(e) {
    this.setState({
      openMode: 'edit',
      popupVisible: true,
      accountId: this.state.selectedId
    });
  }

  deleteAccountButtonCLickHandle(e) {
    //this.setState({ openMode: 'delete' });
  }
}

export default Vault
