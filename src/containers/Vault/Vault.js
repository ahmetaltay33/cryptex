import React, { Component } from 'react';
import classes from './Vault.module.css';
import Button from 'devextreme-react/button';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Account from '../../components/Account/Account';
import VaultGrid from '../../components/Vault/Vault';
import { Popup } from 'devextreme-react/popup';
import notify from 'devextreme/ui/notify';
import firebase from 'firebase';
import dxDialog from 'devextreme/ui/dialog';
import ScrollView from 'devextreme-react/scroll-view';

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
        <Toolbar>
          <Item>
            <Button text='Open Selected Account Detail' onClick={this.openAccountButtonCLickHandle} />
          </Item>
          <Item>
            <Button text='Add New Account' onClick={this.newAccountButtonCLickHandle} />
          </Item>
          <Item>
            <Button text='Edit Selected Account' onClick={this.editAccountButtonCLickHandle} />
          </Item>
          <Item>
            <Button text='Delete Selected Account' onClick={this.deleteAccountButtonCLickHandle} />
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

  deleteAccountButtonCLickHandle(e) {
    dxDialog.confirm('Do you want to delete selected record?', 'Delete record')
      .done((dialogResult) => {
        if (!dialogResult)
          return;
        firebase.database().ref('vault/' + this.state.selectedId).remove((error) => {
          if (error) {
            dxDialog.alert((error));
          }
          else {
            notify({
              message: 'Record deleted was successfully',
              position: {
                my: 'center top',
                at: 'center top'
              }
            }, 'success', 3000);
          }
        });
      });
  }
}

export default Vault;