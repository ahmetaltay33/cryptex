import React from 'react';
import DxToolbar from 'devextreme-react/toolbar';
import { Mobile, Default } from '../Responsive/Responsive';

const Toolbar = props => {
  return (
    <React.Fragment>
      <Mobile>
        <DxToolbar>
          {props.children}
        </DxToolbar>
      </Mobile>
      <Default>
        <DxToolbar height="100px">
          {props.children}
        </DxToolbar>
      </Default>
    </React.Fragment>
  );
};

export default Toolbar;
