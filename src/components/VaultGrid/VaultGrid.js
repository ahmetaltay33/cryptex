import React, { PureComponent } from 'react';
import DataGrid, { Column, ColumnChooser, ColumnFixing, SearchPanel, GroupPanel, Grouping, LoadPanel, Export } from 'devextreme-react/data-grid';
import firebase from 'firebase';
import { generateIdFieldFetchedData } from '../../shared/utility';
import PropTypes from 'prop-types';

export class Vault extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      records: null,
      accountTypes: null,
      focusedRowKey: null
    };

    this.onFocusedRowChanged = this.onFocusedRowChanged.bind(this);
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
          showBorders={true}
          hoverStateEnabled={true}
          allowColumnResizing={true}
          columnResizingMode='nextColumn'
          allowColumnReordering={true}
          columnAutoWidth={true}
          focusedRowEnabled={true}
          focusedRowKey={this.state.focusedRowKey}
          onFocusedRowChanged={this.onFocusedRowChanged}
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
        >
          <Export enabled={true} fileName="vault"/>
          <LoadPanel enabled={true} />
          <ColumnChooser enabled={true} mode="select"/>
          <GroupPanel visible={true} />
          <Grouping autoExpandAll={false} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
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

  onFocusedRowChanged(e) {
    const focusedRowKey = e.component.option('focusedRowKey');
    if (focusedRowKey != this.state.focusedRowKey) {
      this.setState({
        focusedRowKey: focusedRowKey
      });
      if (this.props.onSelectedChanged)
        this.props.onSelectedChanged(this.state.focusedRowKey);
    }
  }
}

Vault.propTypes = {
  onSelectedChanged: PropTypes.func.isRequired
};

export default Vault;