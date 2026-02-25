import React from "react";

const About = () => {
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="bread">
                                <span><a href="/">Trang chủ</a></span> / <span>Giới thiệu</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="colorlib-about">
                <div className="container">
                    <div className="row row-pb-lg">
                        <div className="col-sm-6 mb-3">
                            <div
                                className="video colorlib-video"
                                style={{ backgroundImage: "url('/assets/images/about.jpg')" }}
                            >
                                <a
                                    href="https://vimeo.com/channels/staffpicks/93951774"
                                    className="popup-vimeo"
                                >
                                    <i className="icon-play3"></i>
                                </a>
                                <div className="overlay"></div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="about-wrap">
                                <h2>Hanoi Shoes – Cửa hàng giày thời trang hàng đầu tại Hà Nội</h2>

                                <p>
                                    Hanoi Shoes được thành lập với mục tiêu mang đến cho khách hàng những đôi giày
                                    đẹp, bền và thời trang nhất. Chúng tôi hiểu rằng mỗi bước đi đều quan trọng,
                                    vì vậy từng sản phẩm đều được lựa chọn kỹ lưỡng từ chất liệu, màu sắc cho đến
                                    kiểu dáng để đảm bảo sự thoải mái và phong cách cho người sử dụng.
                                </p>

                                <p>
                                    Với nhiều năm kinh nghiệm trong lĩnh vực thời trang giày dép, Hanoi Shoes tự hào
                                    là điểm đến tin cậy của hàng nghìn khách hàng tại Hà Nội và trên toàn quốc. Chúng
                                    tôi cung cấp đa dạng mẫu mã: giày thể thao, sneaker, giày tây, giày lười, sandal,
                                    với mức giá hợp lý và chất lượng vượt trội.
                                </p>

                                <p>
                                    Sứ mệnh của chúng tôi là mang đến trải nghiệm mua sắm tuyệt vời – nhanh chóng,
                                    hiện đại và thân thiện. Chúng tôi cam kết không ngừng cải tiến chất lượng dịch vụ,
                                    cập nhật xu hướng mới nhất và đem đến cho khách hàng sự hài lòng tuyệt đối.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
