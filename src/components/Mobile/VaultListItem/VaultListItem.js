import React, { PureComponent } from 'react';

export class VaultListItem extends PureComponent {
  render() {
    console.log('VaultListItem rendered');
    return (
      <div>
        {this.props.Description}
      </div>
    );
  }
}

export default VaultListItem;
