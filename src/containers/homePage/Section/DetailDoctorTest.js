import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './DetailDoctorTest.scss'
import { Scrollbars } from 'react-custom-scrollbars'
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import { Connect, connect } from 'react-redux';
import WorkSchedule from './WorkSchedule';
import Feddback from './Feddback';

class DetailDoctorTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorData) {
            let id = this.props.doctorData.id
            let response = await getDetailInforDoctor(id)
            if (response && response.errCode == 0) {
                this.setState({
                    detailDoctor: response.data
                })
            }
            console.log("hoidanit channel:", response.errCode)

        }

    }


    toggle = () => {
        this.props.closeModal()
    }

    render() {
        console.log("state: ", this.state)
        let detailDoctor = this.state.detailDoctor
        let language = this.props.language;
        console.log("check language: ", language)
        let nameVi = '', nameEn = ''
        console.log(detailDoctor?.positionRole?.valueEn)
        if (detailDoctor && detailDoctor?.positionRole?.valueVi && detailDoctor?.positionRole?.valueEn) {
            nameVi = `${detailDoctor?.positionRole?.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn = `${detailDoctor?.positionRole?.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <div>
                <div>
                    <Modal
                        size='lg'
                        style={{ maxWidth: "90%" }}
                        centered
                        isOpen={this.props.isOpenModal}
                        toggle={() => this.toggle()}
                    >

                        <ModalBody>
                            <Scrollbars
                                style={{ maxWidth: "100%", height: "620px", }}>
                                <div className="doctor-detail-container">
                                    <div className='intro-doctor'>
                                        <div className='content-left'
                                            style={{ backgroundImage: `url(${this.state.detailDoctor.image ? this.state.detailDoctor.image : ""})` }}
                                        >
                                        </div>
                                        <div className='content-right'>
                                            <div className='up'>
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </div>
                                            <div className='down'>
                                                {detailDoctor.Markdown && detailDoctor.Markdown.introduction &&
                                                    <span>
                                                        {detailDoctor.Markdown.introduction}
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='schedule-doctor'>
                                        <WorkSchedule />
                                    </div>
                                    <div className='detail-infor-doctor'>
                                        {detailDoctor && detailDoctor?.Markdown?.contentHTML &&
                                            <div dangerouslySetInnerHTML={{ __html: detailDoctor?.Markdown?.contentHTML }}>

                                            </div>
                                        }
                                    </div>
                                    <div className='comment-doctor'>
                                        <Feddback />
                                    </div>
                                </div>
                            </Scrollbars>
                        </ModalBody>

                        {/* <ModalFooter>
                            <Button color="primary" onClick={() => this.toggle()}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </ModalFooter> */}

                    </Modal>


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

export default connect(mapStateToProps)(DetailDoctorTest)
