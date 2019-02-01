import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import Box, { Item } from 'devextreme-react/box'
import classes from './Login.module.css';

export class login extends Component {
    //static propTypes = {
    //}
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
        this.userNameChangeHandle = this.userNameChangeHandle.bind(this);
        this.passwordChangeHandle = this.passwordChangeHandle.bind(this);
    }

    userNameChangeHandle(e) {
        this.setState({
            userName: e.value
        });
    }

    passwordChangeHandle(e) {
        this.setState({
            password: e.value
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
                            onValueChanged={this.userNameChangeHandle}
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
                        <Button text='Login' />
                    </Item>
                </Box>
            </React.Fragment>
        )
    }
}

export default login
