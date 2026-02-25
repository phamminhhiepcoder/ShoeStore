import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="bread">
                                <span><a href="/">Trang chủ</a></span> / <span>Liên hệ</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="colorlib-contact">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Thông tin liên hệ</h3>
                            <div className="row contact-info-wrap">
                                <div className="col-md-3">
                                    <p>
                                        <span><i className="icon-location"></i></span>
                                        123 Phố Huế,<br /> Hai Bà Trưng, Hà Nội
                                    </p>
                                </div>

                                <div className="col-md-3">
                                    <p>
                                        <span><i className="icon-phone3"></i></span>
                                        <a href="tel://0987654321">0987 654 321</a>
                                    </p>
                                </div>

                                <div className="col-md-3">
                                    <p>
                                        <span><i className="icon-paperplane"></i></span>
                                        <a href="mailto:support@hanoishoes.vn">support@hanoishoes.vn</a>
                                    </p>
                                </div>

                                <div className="col-md-3">
                                    <p>
                                        <span><i className="icon-globe"></i></span>
                                        <a href="https://hanoishoes.vn">hanoishoes.vn</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form liên hệ */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="contact-wrap">
                                <h3>Gửi tin nhắn cho chúng tôi</h3>
                                <form className="contact-form">
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="fname">Họ</label>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    className="form-control"
                                                    placeholder="Nhập họ của bạn"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="lname">Tên</label>
                                                <input
                                                    type="text"
                                                    id="lname"
                                                    className="form-control"
                                                    placeholder="Nhập tên của bạn"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-100"></div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Địa chỉ email"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-100"></div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="subject">Tiêu đề</label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    className="form-control"
                                                    placeholder="Tiêu đề tin nhắn"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-100"></div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="message">Nội dung</label>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    cols="30"
                                                    rows="10"
                                                    className="form-control"
                                                    placeholder="Nhập nội dung tin nhắn"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="w-100"></div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input
                                                    type="submit"
                                                    value="Gửi tin nhắn"
                                                    className="btn btn-primary"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="colorlib-map" style={{ width: "100%", height: "100%" }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.436086587781!2d105.84920917598544!3d21.015230180630763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8ccfff9a27%3A0x8b1c88cd4b76cf66!2zMTIzIFAuIEh14bq_LCBOZ8O0IFRow6wgTmjhuq1tLCBIYWkgQsOgIFRyxrBuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1764924996286!5m2!1svi!2s"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
