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
    console.log('Vault render', this.state.selectedId);
    let accountPopup = null;
    if (this.state.openMode != null) {
      accountPopup =
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
          <Account mode={this.state.openMode} accountId={this.state.selectedId} onFormSubmitted={this.hideInfo}/>
        </Popup>
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
        <VaultGrid onSelectedChanged={this.onSelectedChangedHandle} />
        {accountPopup}
      </React.Fragment>
    )
  }

  hideInfo() {
    this.setState({
      popupVisible: false
    });
  }

  onSelectedChangedHandle(data) {
    console.log('Vault onSelectedChangedHandle', data.Id);
    this.setState({
      selectedId: data.Id
    });
  }

  openAccountButtonCLickHandle(e) {
    this.setState({
      openMode: 'open',
      popupVisible: true
    });
  }

  newAccountButtonCLickHandle(e) {
    this.setState({
      openMode: 'new',
      popupVisible: true
    });
  }

  editAccountButtonCLickHandle(e) {
    this.setState({
      openMode: 'edit',
      popupVisible: true
    });
  }

  deleteAccountButtonCLickHandle(e) {
    //this.setState({ openMode: 'delete' });
  }
}

export default Vault