import { extend } from "lodash"
import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import './modalUpdateUser.scss'
import { emitter } from "../../utils/emitter";
import { useEffect } from "react";
import { updateUser } from '../../services/userService'

class ModalUpDateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            gender: '',
            isClose: true

        }
    }

    handleOnchange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleValidate = () => {
        let isValidate = true
        if (!this.state.email /*|| !this.state.email.includes("@gmail.com")*/) {
            alert("missng email")
            isValidate = false
            return isValidate
        }
        if (!this.state.lastName) {
            alert("mssing lastName")
            isValidate = false
            return isValidate
        }
        if (!this.state.firstName) {
            alert("mssing firstName")
            isValidate = false
            return isValidate
        }
        if (!this.state.address) {
            alert("mssing address")
            isValidate = false
            return isValidate
        }
        if (!this.state.gender) {
            alert("mssing gender")
            isValidate = false
            return isValidate
        }
        else {
            isValidate = true
            return isValidate
        }
    }

    getState = () => {
        this.setState({
            email: this.props.oneUser.email,
            firstName: this.props.oneUser.firstName,
            lastName: this.props.oneUser.lastName,
            address: this.props.oneUser.address,
            gender: this.props.oneUser.gender
        })

    }

    emptyAllParameter = () => {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        })
    }

    handleUpdateData = async () => {
        let isValidate = this.handleValidate()
        if (isValidate) {
            let response = await updateUser(this.state)
            if (response.response.errCode == 0) {
                alert(response.response.message)

            }
            else {
                alert(response.response.errorMessage)
            }
            console.log(response)
        }
    }

    render() {
        let { email, firstName, lastName, address, gender, isClose } = this.state

        return (
            <>
                <Modal
                    isOpen={(this.props.isOpenModalUpdateUser)}
                    toggle={this.toggle}
                    centered
                >
                    <ModalHeader toggle={this.toggle} charCode="Y">Update information</ModalHeader>
                    <ModalBody>
                        <div className="modal_user_body">
                            <div className="modal_user_input">
                                <label>Email</label>
                                <Input type="email"
                                    onChange={(event) => this.handleOnchange(event, 'email')}
                                    value={email}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="modal_user_input">
                                <label>First name</label>
                                <Input type="text"
                                    onChange={(event) => this.handleOnchange(event, 'firstName')}
                                    value={firstName}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="modal_user_input">
                                <label>Last name</label>
                                <Input type="text"
                                    onChange={(event) => this.handleOnchange(event, 'lastName')}
                                    value={lastName}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="modal_user_input">
                                <label>Address</label>
                                <Input type="text"
                                    onChange={(event) => this.handleOnchange(event, 'address')}
                                    value={address}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="modal_user_input">
                                <label>Male</label>
                                <Input type="radio"
                                    onChange={(event) => this.handleOnchange(event, 'gender')}
                                    value="1"
                                    name="gender"
                                />
                                <label>Female</label>
                                <Input type="radio"
                                    onChange={(event) => this.handleOnchange(event, 'gender')}
                                    value="0"
                                    name="gender"
                                />
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => this.handleUpdateData()}>Update</button>
                        <Button onClick={() => this.emptyAllParameter()}>Empty</Button>
                        <Button color="primary" onClick={() => this.getState()}>Refreash data</Button>{' '}
                        <Button color="secondary" onClick={this.props.handleCloseUpdateUser}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default ModalUpDateUser

