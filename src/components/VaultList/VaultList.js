import React, { PureComponent } from 'react';
import List from 'devextreme-react/list';
import firebase from 'firebase';
import { generateIdFieldFetchedData } from '../../shared/utility';
import VaultListItem from '../VaultListItem/VaultListItem';
import PropTypes from 'prop-types';
import ArrayStore from 'devextreme/data/array_store';

export class VaultList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
      accountTypes: null,
      selectedItemKeys: []
    };

    this.onSelectedItemKeysChange = this.onSelectedItemKeysChange.bind(this);
  }

  componentDidMount() {
    const accountTypesReq = firebase.database().ref('account_types');
    accountTypesReq.once('value', (snapshot) => {
      const accountTypesData = generateIdFieldFetchedData(snapshot.val());
      this.setState({
        accountTypes: accountTypesData
      });
    });
    const uid = firebase.auth().currentUser.uid;
    const vaultReq = firebase.database().ref('vault').child(uid);
    vaultReq.on('value', (snapshot) => {
      const vaultData = generateIdFieldFetchedData(snapshot.val());
      const dataSrc = new ArrayStore({key: 'Id', data: vaultData});
      this.setState({
        dataSource: dataSrc
      });
    });
  }

  render() {
    return (
      <List
        dataSource={this.state.dataSource}
        itemComponent={VaultListItem}
        searchExpr="Description"
        searchEnabled={true}
        searchMode="contains"
        selectionMode="single"
        //showSelectionControls={true}
        selectedItemKeys={this.state.selectedItemKeys}
        onOptionChanged={this.onSelectedItemKeysChange} />
    );
  }

  onSelectedItemKeysChange(args) {
    if(args.name === 'selectedItemKeys' && args.value != this.state.selectedItemKeys) {
      this.setState({
        selectedItemKeys: args.value
      });
      if(this.props.onSelectedChanged)
        this.props.onSelectedChanged(this.state.selectedItemKeys[0]);
    }
  }
}

VaultList.propTypes = {
  onSelectedChanged: PropTypes.func.isRequired
};

export default VaultList;
