import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.handleCloseModal()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkInputValidate = () => {
        let isValidate = true
        let arrInput = ['email', 'password', 'lastName', 'firstName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            console.log("arrInput: ", arrInput[i])
            console.log("check :", this.state[arrInput[i]])
            if (!this.state[arrInput[i]]) {
                isValidate = false
                alert("missing parameter: " + arrInput[i])
                break;
            }
        }
        return isValidate
    }

    checkInputValidate2 = () => {
        let isValidate = true
        if (!this.state.email) {
            isValidate = false
            alert("missing parameter: email")
            return isValidate
        }
        if (!this.state.password) {
            isValidate = false
            alert("missing parameter: password")
            return isValidate

        }
        if (!this.state.firstName) {
            isValidate = false
            alert("missing parameter: firstName")
            return isValidate
        }
        if (!this.state.lastName) {
            isValidate = false
            alert("missing parameter: lastName")
            return isValidate
        }
        if (!this.state.address) {
            isValidate = false
            alert("missing parameter: address")
            return isValidate
        }
    }

    handleAddNewUser = () => {
        let isValidate = this.checkInputValidate()
        console.log(isValidate)
        if (isValidate == true) {
            this.props.createNewUser(this.state)
        }
    }
    handleClose = () => {
        this.props.handleCloseModal()
    }

    // emptyAllParameter = () => {
    //     this.setState({
    //         email: '',
    //         password: '',
    //         firstName: '',
    //         lastName: '',
    //         address: ''
    //     })
    // }

    render() {
        let { email, password, lastName, firstName, address } = this.state
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-user-container"}
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Pasword</label>
                            <input
                                type='password'
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name:</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                value={firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                value={lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                value={address}
                            />
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    >Add new</Button>{'  '}
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={() => this.handleClose()}>Close</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





