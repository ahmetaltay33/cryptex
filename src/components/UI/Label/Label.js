import React from 'react';

const Label = props => {
  return (
    <div className={'dx-widget ' + props.className}>
      {props.children}
    </div>
  );
};

export default Label;
