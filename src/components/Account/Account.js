import React, { Component } from 'react'
import classes from './Account.module.css'

export class Account extends Component {
  render() {
    return (
      <div className={classes.Account}>
        <p>This is the single account information component.</p>
      </div>
    )
  }
}

export default Account