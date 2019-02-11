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
    this.deleteSelectedAccount = this.deleteSelectedAccount.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar height="100px">
          <Item>
            <ToolbarButton text="Open Selected Account Detail" icon="folder" onClick={this.openAccountButtonCLickHandle} >
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarButton text="Add New Account" icon="add" onClick={this.newAccountButtonCLickHandle} >
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarButton text="Edit Selected Account" icon="edit" onClick={this.editAccountButtonCLickHandle} >
            </ToolbarButton>
          </Item>
          <Item>
            <ToolbarButton text="Delete Selected Account" icon="remove" onClick={this.deleteAccountButtonCLickHandle} >
            </ToolbarButton>
          </Item>
        </Toolbar>
        <VaultGrid onSelectedChanged={this.onSelectedChangedHandle} />
        <Popup
          className={classes.Popup}
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

  deleteAccountButtonCLickHandle(e) {
    dxConfirm('Do you want to delete selected record?', 'Delete record', this.deleteSelectedAccount);
  }

}

export default Vault;