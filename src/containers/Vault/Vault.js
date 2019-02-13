import React, { PureComponent } from 'react';
import { Item } from 'devextreme-react/toolbar';
import Account from '../../components/Account/Account';
import VaultGrid from '../../components/VaultGrid/VaultGrid';
import { Popup } from 'devextreme-react/popup';
import firebase from 'firebase';
import ScrollView from 'devextreme-react/scroll-view';
import { dxConfirm, dxNotify, dxAlert } from '../../shared/dxUtility';
import ToolbarButton from '../../components/UI/ToolbarButton/ToolbarButton';
import ToolbarSeparator from '../../components/UI/ToolbarSeparator/ToolbarSeparator';
import VaultList from '../../components/VaultList/VaultList';
import { Default, Mobile } from '../../components/UI/Responsive/Responsive';
import Toolbar from '../../components/UI/Toolbar/Toolbar';

export class Vault extends PureComponent {
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
    const accountContent =
      <ScrollView>
        <Account mode={this.state.openMode} accountId={this.state.accountId} onFormSubmitted={this.hideInfo} />
      </ScrollView>;
    return (
      <React.Fragment>
        <Toolbar>
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
        <Mobile>
          <VaultList onSelectedChanged={this.onSelectedChangedHandle} />
          <Popup
            visible={this.state.popupVisible}
            onHiding={this.hideInfo}
            dragEnabled={false}
            showCloseButton={true}
            closeOnBackButton={true}
            closeOnOutsideClick={true}
            title={'Account Detail'}
            showTitle={true}
            fullScreen={true}
          >
            {accountContent}
          </Popup>
        </Mobile>
        <Default>
          <VaultGrid onSelectedChanged={this.onSelectedChangedHandle} />
          <Popup
            visible={this.state.popupVisible}
            onHiding={this.hideInfo}
            dragEnabled={false}
            showCloseButton={true}
            closeOnBackButton={true}
            closeOnOutsideClick={true}
            title={'Account Detail'}
            showTitle={true}
            fullScreen={false}
            minHeight={'570'}
            height={'50%'}
            width={'50%'}
          >
            {accountContent}
          </Popup>
        </Default>
      </React.Fragment>
    );
  }

  hideInfo() {
    this.setState({
      popupVisible: false,
      accountId: null
    });
  }

  onSelectedChangedHandle(id) {
    this.setState({
      selectedId: id
    });
  }

  openAccountButtonClickHandle(e) {
    if (this.state.selectedId == null) {
      dxAlert('You must first select a record!', 'Record not found');
      return;
    }
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
    if (this.state.selectedId == null) {
      dxAlert('You must first select a record!', 'Record not found');
      return;
    }
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
    if (this.state.selectedId == null) {
      dxAlert('You must first select a record!', 'Record not found');
      return;
    }    
    dxConfirm('Do you want to delete selected record?', 'Delete record', this.deleteSelectedAccount);
  }

  signOut() {
    firebase.auth().signOut()
      .catch(error => {
        dxAlert(error.message, error.code);
      });
  }

  signOutButtonClickHandle(e) {
    dxConfirm('Do you want to sign ou from cryptex?', 'Sign Out', this.signOut);
  }
}

export default Vault;