import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Scrollbars from "react-custom-scrollbars";
import './SpecialDetail.scss'

class SpecialtyDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listClinic: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        if (this.props.propsClinic) {
            this.setState({
                listClinic: this.props.propsClinic
            })
        }

    }

    // componentDidUpdate = (prevProp, prevState,snapshot)=>{
    //     if(prevProp.propsClinic !== this.props.propsClinic){
    //         this.setState({
    //             listClinic: this.props.propsClinic
    //         })
    //     }
    // }

    toggle = () => {
        this.props.handleOpenModal()
    }

    render() {
        let listClinic = this.state.listClinic
        return (
            <div>
                <Modal
                    fade="true"
                    size='lg'
                    style={{ maxWidth: "90%" }}
                    centered
                    isOpen={this.props.isOpenModal}
                    toggle={() => this.toggle()}
                    className={this.props.className}>
                    {listClinic &&
                        <Scrollbars style={{ maxWidth: "100%", height: "650px", padding: "30px" }}>
                            <div className="clinic-container">
                                <div className="name-address">
                                    <div className="name">{listClinic.name}</div>
                                    <div className="address">{listClinic.address}</div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: listClinic.description }} style={{ fontSize: "17px", paddingRight: "15px" }}></div>
                            </div>

                        </Scrollbars>

                    }
                </Modal>
            </div>
        )
    }
}

export default SpecialtyDetail