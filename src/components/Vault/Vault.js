import React, { Component } from 'react';
import DataGrid, { Column, ColumnChooser, ColumnFixing } from 'devextreme-react/data-grid';
import firebase from 'firebase';
import { generateIdFieldFetchedData } from '../../shared/utility';
import PropTypes from 'prop-types';

export class Vault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: {},
      accountTypes: {}
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
          <Column dataField={'Id'} caption={'Key'} visible={false}/>
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
    this.props.onSelectedChanged(data);
  }
}

Vault.propTypes = {
  onSelectedChanged: PropTypes.func.isRequired
};

export default Vault;