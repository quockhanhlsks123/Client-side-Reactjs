import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginapi } from '../../services/userService';
import handleUserLogin from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errorMessage: ""
        }
    }

    handleUserName = (event) => {
        this.setState({
            username: event.target.value,

        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {

        this.setState({
            errorMessage: ""
        })
        try {
            let data = await handleLoginapi(this.state.username, this.state.password)
            console.log("errorCode: ", data.errorCode)
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log("login success!", data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {

                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }

        }
    }

    handleShowPassword = () => {
        let check = this.state.isShowPassword
        this.setState({
            isShowPassword: !check
        })
    }
    render() {
        let isShowPassword = this.state.isShowPassword
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={(event) => this.handleUserName(event)}

                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    className='form-control'
                                    placeholder='Enter password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span
                                ><i className={isShowPassword ? "far fa-eye" : "far fa-eye-slash"}
                                    onClick={() => this.handleShowPassword()}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: "red" }}>
                            {this.state.errorMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Forget your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className="text-other-login">Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};


const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
