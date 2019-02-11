import React from 'react';

const Label = props => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
};

export default Label;
