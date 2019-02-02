import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import Box, { Item } from 'devextreme-react/box'
import classes from './Login.module.css';
import axios from 'axios';
import firebase from "firebase";

export class login extends Component {
    //static propTypes = {
    //}
    constructor(props) {
        super(props);
        this.state = {
            eMail: '',
            password: ''
        };
        this.eMailChangeHandle = this.eMailChangeHandle.bind(this);
        this.passwordChangeHandle = this.passwordChangeHandle.bind(this);
        this.loginClickHandle = this.loginClickHandle.bind(this);
    }

    eMailChangeHandle(e) {
        this.setState({
            eMail: e.value
        });
    }

    passwordChangeHandle(e) {
        this.setState({
            password: e.value
        });
    }

    loginClickHandle(e) {
        firebase.auth().signInWithEmailAndPassword(this.state.eMail, this.state.password)
            .then(response => {
                console.log(response);        
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Box direction={'col'} width={'100%'} height={125} crossAlign="center" align="center">
                    <Item ratio={1}>
                        <header>Login Form</header>
                    </Item>
                    <Item ratio={1}>
                        <TextBox
                            //value={this.state.userName}
                            onValueChanged={this.eMailChangeHandle}
                            valueChangeEvent='input'
                        />
                    </Item>
                    <Item ratio={1}>
                        <TextBox
                            //value={this.state.password}
                            onValueChanged={this.passwordChangeHandle}
                            valueChangeEvent='input'
                        />
                    </Item>
                    <Item ratio={1}>
                        <Button text='Login' onClick={this.loginClickHandle} />
                    </Item>
                </Box>
            </React.Fragment>
        )
    }
}

export default login
