import React, { PureComponent } from 'react';
import DataGrid, { Column, ColumnChooser, ColumnFixing } from 'devextreme-react/data-grid';
import firebase from 'firebase';
import { generateIdFieldFetchedData } from '../../shared/utility';
import PropTypes from 'prop-types';

export class Vault extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      records: null,
      accountTypes: null,
      selectedItemKey: null
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
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
      this.setState({
        records: vaultData
      });
    });
  }

  render() {
    console.log('VaultGrid rendered');
    return (
      <React.Fragment>
        <DataGrid
          keyExpr={'Id'}
          dataSource={this.state.records}
          selection={{ mode: 'single' }}
          showBorders={true}
          hoverStateEnabled={true}
          allowColumnResizing={true}
          columnResizingMode='nextColumn'
          allowColumnReordering={true}
          columnAutoWidth={true}
          onSelectionChanged={this.onSelectionChanged}
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
        >
          <ColumnChooser enabled={true} />
          <ColumnFixing enabled={true} />
          <Column dataField={'Id'} caption={'Key'} visible={false} />
          <Column dataField={'AccountType'} caption={'Account Type'}
            lookup={{
              dataSource: this.state.accountTypes,
              displayExpr: 'Name',
              valueExpr: 'Id'
            }}
          >
          </Column>
          <Column dataField={'UserName'} caption={'User Name'} visible={false} />
          <Column dataField={'Password'} visible={false} />
          <Column dataField={'WebSite'} caption={'Web Site'} width={180} />
          <Column dataField={'Email'} caption={'E-Mail'} visible={false} />
          <Column dataField={'Phone'} visible={false} />
          <Column dataField={'Description'} />
          <Column dataField={'UpdateTime'} caption={'Update Time'} dataType={'datetime'} />
          <Column dataField={'Active'} dataType={'boolean'} />
        </DataGrid>
      </React.Fragment>
    );
  }

  onSelectionChanged({ selectedRowsData }) {
    const data = selectedRowsData[0];
    if(!data)
      return;
    this.setState({
      selectedItemKey: data.Id
    });
    if (this.props.onSelectedChanged)
      this.props.onSelectedChanged(this.state.selectedItemKey);
  }
}

Vault.propTypes = {
  onSelectedChanged: PropTypes.func.isRequired
};

export default Vault;