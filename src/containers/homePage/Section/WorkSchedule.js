import React from "react";
import './WorkSchedule.scss'
import { toast } from "react-toastify";

class WorkSchedule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleAlert = () => {
        toast.error("Chức năng chưa hoàn thiện")
    }

    render() {
        return (
            <div className="big-container">
                <div className="work-schedule-container">
                    <div className="title-container">LỊCH KHÁM</div>
                    <div className="first-line">
                        <div className="time" onClick={() => this.handleAlert()}>
                            08:00 - 08:30
                        </div>
                        <div className="time" onClick={() => this.handleAlert()}>
                            08:00 - 08:30
                        </div>
                        <div className="time" onClick={() => this.handleAlert()}>
                            08:00 - 08:30
                        </div>
                        <div className="time" onClick={() => this.handleAlert()}>
                            08:00 - 08:30
                        </div>
                    </div>
                    <div className="second-line">
                        <div className="time">
                            08:00 - 08:30
                        </div>
                        <div className="time">
                            08:00 - 08:30
                        </div>
                        <div className="time">
                            08:00 - 08:30
                        </div>
                        <div className="time">
                            08:00 - 08:30
                        </div>
                    </div>
                    <div className="third-line">
                        <div className="time">
                            08:00 - 08:30
                        </div>
                        <div className="time">
                            08:00 - 08:30
                        </div>
                        <div className="time">
                            08:00 - 08:30
                        </div>
                        <div className="time">
                            08:00 - 08:30
                        </div>
                    </div>
                </div>

                <div className="work-address-container">
                    <div className="address">
                        <span className="span">ĐỊA CHỈ PHÒNG KHÁM<br /></span>
                        <span className="span2">Phòng khám bệnh viện đại học Y Dược 1<br /></span>
                        <span>20-22 Dương Quang Trung, Phường 12, Quận 10, TP.HCM</span>
                    </div>
                    <div className="price">
                        <span className="span"><span className="span1">GIÁ KHÁM:</span> 250.000Đ - 500.000Đ <br /></span>
                        <span className="span2"><span className="span3">LOẠI BẢO HIỂM ÁP DỤNG:</span>Đang cập nhập</span>
                    </div>
                </div>
            </div>

        )

    }
}

export default WorkSchedule