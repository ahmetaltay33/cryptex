import React, { Component } from 'react';
import classes from './Vault.module.css';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Account from '../../components/Account/Account';
import VaultGrid from '../../components/Vault/Vault';
import { Popup } from 'devextreme-react/popup';
import firebase from 'firebase';
import ScrollView from 'devextreme-react/scroll-view';
import { dxConfirm, dxNotify, dxAlert } from '../../shared/dxUtility';
import ToolbarButton from '../../components/UI/ToolbarButton/ToolbarButton';
import ToolbarSeparator from '../../components/UI/ToolbarSeparator/ToolbarSeparator';

export class Vault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      accountId: null,
      selectedId: null,
      openMode: null
    };
    this.openAccountButtonClickHandle = this.openAccountButtonClickHandle.bind(this);
    this.newAccountButtonClickHandle = this.newAccountButtonClickHandle.bind(this);
    this.editAccountButtonClickHandle = this.editAccountButtonClickHandle.bind(this);
    this.deleteAccountButtonClickHandle = this.deleteAccountButtonClickHandle.bind(this);
    this.signOutButtonClickHandle = this.signOutButtonClickHandle.bind(this);
    this.onSelectedChangedHandle = this.onSelectedChangedHandle.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
    this.deleteSelectedAccount = this.deleteSelectedAccount.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar height="100px">
          <Item>
            <ToolbarButton icon="folder" onClick={this.openAccountButtonClickHandle} >
              Open<br />Selected
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarSeparator />
          </Item>
          <Item>
            <ToolbarButton icon="add" onClick={this.newAccountButtonClickHandle} >
              Add<br />New
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarButton icon="edit" onClick={this.editAccountButtonClickHandle} >
              Edit<br />Selected
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarButton icon="remove" onClick={this.deleteAccountButtonClickHandle}>
              Delete<br />Selected
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarSeparator />
          </Item>
          <Item>
            <ToolbarButton icon="runner" onClick={this.signOutButtonClickHandle} type="danger">
              Sign<br />Out
            </ToolbarButton>
          </Item>
        </Toolbar>
        <VaultGrid onSelectedChanged={this.onSelectedChangedHandle} />
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.hideInfo}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showTitle={true}
          title={'Account Detail'}
          minHeight={'570'}
          height={'50%'}
          width={'50%'}
        >
          <ScrollView>
            <Account mode={this.state.openMode} accountId={this.state.accountId} onFormSubmitted={this.hideInfo} />
          </ScrollView>
        </Popup>
      </React.Fragment>
    );
  }

  hideInfo() {
    this.setState({
      popupVisible: false,
      accountId: null
    });
  }

  onSelectedChangedHandle(data) {
    if (data) {
      this.setState({
        selectedId: data.Id
      });
    }
  }

  openAccountButtonClickHandle(e) {
    this.setState({
      openMode: 'open',
      popupVisible: true,
      accountId: this.state.selectedId
    });
  }

  newAccountButtonClickHandle(e) {
    this.setState({
      openMode: 'new',
      popupVisible: true,
      accountId: this.state.selectedId
    });
  }

  editAccountButtonClickHandle(e) {
    this.setState({
      openMode: 'edit',
      popupVisible: true,
      accountId: this.state.selectedId
    });
  }

  deleteSelectedAccount() {
    firebase.database().ref('vault/' + this.state.selectedId).remove((error) => {
      if (error) {
        dxAlert(error);
      }
      else {
        dxNotify('Record deleted was successfully');
      }
    });
  }

  deleteAccountButtonClickHandle(e) {
    dxConfirm('Do you want to delete selected record?', 'Delete record', this.deleteSelectedAccount);
  }

  signOut() {
    firebase.auth().signOut()
      .then(dxAlert('Sign Out successfull'));
  }

  signOutButtonClickHandle(e) {
    dxConfirm('Do you want to sign ou from cryptex?', 'Sign Out', this.signOut);
  }

}

export default Vault;