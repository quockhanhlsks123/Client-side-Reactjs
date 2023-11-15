import React from "react";

class HomeFooter extends React.Component {


    render() {
        return (
            <div className="home-footer">
                <div className="home-footer-left">
                    <div className="up">
                        <span className="title">Công ty cổ phần Công nghệ BookingCare<br /></span>
                        <span className="mall-content">Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam<br /></span>
                        <span className="mall-content">ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015<br /></span>
                    </div>

                    <div className="down">
                        <span className="title">Văn phòng tại TP Hồ Chí Minh<br /></span>
                        <span className="mall-content">Số 01, Hồ Bá Kiện, Phường 15, Quận 10<br /></span>
                    </div>

                </div>

                <div className="home-footer-right">
                    <div className="left">
                        <span className="left-span">Liên hệ hợp tác</span>
                        <span className="left-span">Danh bạ y tế</span>
                        <span className="left-span">Sức khỏe Doanh nghiệp</span>
                        <span className="left-span">Tuyển dụng</span>
                        <span className="left-span">Câu hỏi thường gặp</span>
                    </div>

                    <div className="right">
                        <div className="right-up">
                            <span style={{ fontWeight: "600" }}>Đối tác bảo trợ nôi dung<br /></span>
                            <span>Bảo trợ chuyên mục nội dung "Sức khỏe tinh thần"</span>

                        </div>
                        <div className="right-down">
                            <span style={{ fontWeight: "600" }}>Hệ Thống y khoa chuyên sâu quốc tế Bernard<br /></span>
                            <span>Bảo trợ chuyên mục nôi dung "y khoa chuyên khoe"</span>
                        </div>

                    </div>
                </div>
                {/* <p>&copy; 2023 HoiDanItWithEric. More information, please visit my channel. &#8594;<a href="http://localhost:3000/login"> Click here</a> &#8592;</p> */}
            </div>
        )
    }
}

export default HomeFooter
