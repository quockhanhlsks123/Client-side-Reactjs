import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import DetailDoctorTest from './DetailDoctorTest';



import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import Popup from 'reactjs-popup';



class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            showDetailDoctor: false,
            doctorDataDetail: []
        }

    }

    componentDidMount() {
        this.props.loadTopDoctor()

    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    HandleDetailDoctor = (item) => {
        console.log(item)
        this.setState({
            showDetailDoctor: true,
            doctorDataDetail: item
        })
    }

    handleCloseModal = () => {
        this.setState({
            showDetailDoctor: false
        })
    }

    render() {
        let arrDoctors = this.state.arrDoctors
        let { language } = this.props
        let showDetailDoctor = this.state.showDetailDoctor

        return (
            <div>
                <div className='section-share section-outstanding-doctor'>
                    {this.state.showDetailDoctor == true &&
                        <DetailDoctorTest
                            isOpenModal={this.state.showDetailDoctor}
                            closeModal={this.handleCloseModal}
                            doctorData={this.state.doctorDataDetail}
                        />
                    }

                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>
                                <FormattedMessage id="homepage.outstanding-doctor" />
                            </span>
                            <button className='btn-section'>
                                <FormattedMessage id="homepage.more-infor" />
                            </button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.setting}>

                                {arrDoctors && arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let imageBase64
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionRole.valueVi}, ${item.firstName} ${item.lastName}`
                                        let nameEn = `${item.positionRole.valueEn}, ${item.firstName} ${item.lastName}`
                                        return (
                                            <div className='section-customize' key={index}>
                                                <div className='customize-border'
                                                    onClick={() => this.HandleDetailDoctor(item)}
                                                    style={{ cursor: "pointer" }}>
                                                    <div className='outer-bg'>
                                                        <img className='bg-img section-outstanding-doctor'
                                                            style={{ backgroundImage: `url(${imageBase64})` }}

                                                        />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>{language === LANGUAGES.VI ?
                                                            nameVi : nameEn
                                                        }</div>
                                                        <div>Cơ sương khớp 1</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>

                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
