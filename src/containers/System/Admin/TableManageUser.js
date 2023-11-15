import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'
// import ModalUser from './modalUser';
// import { emitter } from '../../utils/emitter';
// import ModalUpDateUser from './modalUpdateUser';
// import ModalEditUser from './modalEditUser';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(preProps, preState) {
        if (preProps.listUsesrs !== this.props.listUsesrs) {
            this.setState({
                userRedux: this.props.listUsesrs
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteAUser(user)
        this.props.fetchUserRedux()
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {

        let arrUsers = this.state.userRedux

        return (
            <>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>phoneNumber</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className='btn_edit'
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                className='btn_delete'
                                                onClick={() => this.handleDeleteUser(item.id)}
                                            ><i className='fas fa-trash' ></i></button>
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsesrs: state.admin.users,
        backUpData: state.admin.backUpData

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
