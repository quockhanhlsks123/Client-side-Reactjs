import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'

import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import SpecialtyDetail from './SpecicaltyDetail';



class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listClinic: [],
            isOpenModal: false,
            propsClinic: []
        }
    }

    componentDidMount() {
        this.props.getAllClinic()
    }

    componentDidUpdate(prevProp, prevState, snapshot) {
        if (prevProp.allClinic !== this.props.allClinic) {
            let clinic = this.props.allClinic
            this.setState({
                listClinic: clinic
            })
        }
    }

    handleOpenModal = (item) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            propsClinic: item
        })
    }

    handleCloseModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {
        let isOpenModal = this.state.isOpenModal
        let listClinic = this.state.listClinic
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyen khoa pho bien</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    {isOpenModal == true &&
                        <SpecialtyDetail
                            isOpenModal={isOpenModal}
                            handleOpenModal={this.handleOpenModal}
                            propsClinic={this.state.propsClinic}
                        />
                    }
                    <div className='section-body'>

                        <Slider {...this.props.setting}>

                            {listClinic && listClinic.length > 0 &&
                                listClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize'
                                            key={index}
                                            onClick={() => this.handleOpenModal(item)}

                                        >
                                            <img className='bg-img section-specialty' />
                                            <div className='title-specialty'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinic: () => dispatch(actions.fetchAllClinic())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
