import React from 'react';
import PropTypes from 'prop-types';
import Button from 'devextreme-react/button';
import classes from './ToolbarButton.module.css';

const ToolbarButton = props => {
  let icon = null;
  if (props.icon) {
    icon =
      <React.Fragment>
        <i className={'dx-icon dx-icon-' + props.icon} />
        <br />
      </React.Fragment>;
  }
  if (props.iconUrl) {
    icon =
      <React.Fragment>
        <img className={'dx-icon'} src={props.iconUrl} />
        <br />
      </React.Fragment>;
  }
  return (
    <Button
      className={classes.Button}
      onClick={props.onClick}
      height={props.height ? props.height : '85px'}
      width={props.width ? props.width : '100%'}
      render={(btn) =>
        <div className={'dx-button-content ' + classes.ButtonText}>
          {icon}
          <span className={'dx-button-text'}>
            {props.text ? props.text : props.children}
          </span>
        </div>}
    />
  );
};

ToolbarButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  iconUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default ToolbarButton;
