import React, { PureComponent } from 'react';

export class VaultListItem extends PureComponent {
  render() {
    return (
      <div className="dx-widget">
        {this.props.Description}
      </div>
    );
  }
}

export default VaultListItem;
