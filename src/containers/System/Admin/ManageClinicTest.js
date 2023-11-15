import React from "react";
import { connect } from "react-redux";
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './MangeClinicTest.scss'
import * as actions from '../../../store/actions'


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinicTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            markdownHTML: "",
            markdownText: "",

            name: "",
            address: ""

        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            markdownHTML: html,
            markdownText: text
        })
    }

    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    checkValidateInput = () => {
        let isValidate = true
        let name = this.state.name
        let address = this.state.address
        let markdownHTML = this.state.markdownHTML
        if (!name || !address || !markdownHTML) {
            isValidate = false
            alert("missing pamameter!")
        }
        else {
            isValidate = true
        }
        return isValidate
    }

    handleCreateClinic = () => {
        let isValidate = this.checkValidateInput()
        if (isValidate) {
            this.props.createClinic({
                name: this.state.name,
                address: this.state.address,
                description: this.state.markdownHTML
            })
        }
    }

    handleEmptyAll = () => {
        this.setState({
            name: "",
            address: "",
            markdownHTML: "",
            markdownText: ""
        })
    }


    render() {


        return (
            <div className="Clinic-container">
                <div className="input_Name_Address">
                    <div className="form-group col-6">
                        <label for="usr">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="usr"
                            style={{ width: "600px" }}
                            placeholder="Enter clinic's name"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeName(event)}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label for="comment">Address</label>
                        <textarea
                            class="form-control"
                            rows="7" id="comment"
                            style={{ width: "600px" }}
                            value={this.state.address}
                            placeholder="Enter clinic's address"
                            onChange={(event) => this.handleOnChangeAddress(event)}
                        ></textarea>
                    </div>
                    <div className="button-container">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.handleCreateClinic()}
                        >Create new Clinic</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.handleEmptyAll()}
                        >Empty all</button>
                    </div>

                </div>
                <MdEditor
                    className="MdEditor"
                    value={this.state.markdownText}
                    placeholder="Enter clinic's description"
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listClinic: state.admin.allClinic
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createClinic: (data) => dispatch(actions.createClinic(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinicTest)
