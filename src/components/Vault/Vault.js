import React, { Component } from 'react'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import firebase from 'firebase'
import { generateIdFieldFetchedData } from '../../shared/utility';
import PropTypes from 'prop-types'

export class Vault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: {},
      //selectedId: null
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  componentDidMount() {
    const request = firebase.database().ref('vault');
    request.on('value', (snapshot) => {
      const data = generateIdFieldFetchedData(snapshot.val());
      this.setState({
        records: data
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
          columnAutoWidth={true}
          onSelectionChanged={this.onSelectionChanged}
        >
          <Column dataField={'Id'} caption={'Key'} width={70} />
          <Column dataField={'AccountType'} caption={'Account Type'} />
          <Column dataField={'UserName'} caption={'User Name'} />
          <Column dataField={'Password'} />
          <Column dataField={'WebSite'} caption={'Web Site'} width={180} />
          <Column dataField={'Email'} caption={'E-Mail'} />
          <Column dataField={'Phone'} />
          <Column dataField={'Description'} />
          <Column dataField={'Active'} dataType={'boolean'} />
          <Column dataField={'UpdateTime'} caption={''} dataType={'date'} />
        </DataGrid>
      </React.Fragment>
    );
  }

  onSelectionChanged({ selectedRowsData }) {
    const data = selectedRowsData[0];
    /*this.setState({
      selectedId: data.Id
    });*/
    this.props.onSelectedChanged(data);
  }
}

Vault.propTypes = {
  //selectedId: PropTypes.string,
  onSelectedChanged: PropTypes.func.isRequired
};

export default Vault