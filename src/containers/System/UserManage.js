import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss'
import { getAllUsers, createNewUserService, deleteUser, getOneUser, editUserService } from '../../services/userService';
import ModalUser from './modalUser';
import { emitter } from '../../utils/emitter';
import ModalUpDateUser from './modalUpdateUser';
import ModalEditUser from './modalEditUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUser: [],
            isOpenModal: false,

            //ModalUpdateUser
            oneUser: '',
            isOpenModalUpdateUser: false,
            transferState: '',

            //ModalEditUser
            isOpenEditUser: false,
            userEdit: {}


        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact()
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers("ALL")
        if (response && response.errCode === 0) {
            this.setState({
                arrayUser: response.users,
                oneUser: response.users
            })
        }
    }

    getOneUserFromServer = async () => {
        let response = await getOneUser()
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            console.log("Check response: ", response.response.errorMessage)
            if (response && response.response.errCode !== 0) {
                alert(response.response.errorMessage)
            }
            else {
                alert("Create new user completed!")
                await this.getAllUserFromReact()
                this.handleCloseModal()
                emitter.emit('EVENT_CLEAR_MODAL_DATA')

            }
        } catch (error) {
            console.log(error)
        }
        console.log("check data from child: ", data)
    }

    handleDeleteUser = async (item) => {
        try {
            let response = await deleteUser(item.id)
            if (response && response.response.errCode == 0) {
                await this.getAllUserFromReact()
            }
            else {
                alert("response.response.message")
            }
        } catch (error) {
            console.log(error)
        }

    }

    // handleUpdateUser = async (item) => {
    //     let response = await getOneUser(item.id)
    //     if (response) {
    //         console.log(response.response.user)
    //         this.setState({
    //             oneUser: response.response.user
    //         })

    //     }
    //     else {
    //         console.log("Error")
    //     }
    //     console.log("Check oneUser: ", this.state.oneUser)
    //     this.setState({
    //         isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser
    //         // transferState: item.id
    //     })
    // }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditUser: true,
            userEdit: user
        })
    }

    handleCloseUpdateUser = () => {
        this.setState({
            isOpenModalUpdateUser: false
        })
    }

    ToggleUserEditModal = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user)
            if (response.response && response.response.errCode == 0) {
                this.setState({
                    isOpenEditUser: false
                })
                await this.getAllUserFromReact()
            }
            else {
                alert(response.response.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrayUser = this.state.arrayUser
        return (
            <div className="user_container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    handleCloseModal={this.handleCloseModal}
                    createNewUser={this.createNewUser}
                />
                {/* <ModalUpDateUser
                    isOpenModalUpdateUser={this.state.isOpenModalUpdateUser}
                    handleCloseUpdateUser={this.handleCloseUpdateUser}
                    transferState={this.state.transferState}
                    oneUser={this.state.oneUser}
                /> */}
                {this.state.isOpenEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUser}
                        ToggleUserEditModal={this.ToggleUserEditModal}
                        currentUser={this.state.userEdit}

                        editUser={this.doEditUser}
                    />
                }

                <div className='title text-center'>
                    Manage users with Eric
                </div>
                <div
                    className='btn btn-primary px-2'
                    onClick={() => this.handleAddNewUser()}><i className='fas fa-plus px-1'></i>Add new user</div>
                <div className='users_table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrayUser &&
                                arrayUser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className='btn_edit'
                                                    onClick={() => this.handleEditUser(item)}
                                                ><i className='fas fa-pencil-alt'></i></button>
                                                <button
                                                    className='btn_delete'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                ><i className='fas fa-trash' ></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
