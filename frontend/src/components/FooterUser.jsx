const FooterUser = () => {
    return (
        <footer id="footer" role="contentinfo">
            <div className="container">
                <div className="row row-pb-md">

                    {/* About */}
                    <div className="col footer-col footer-widget">
                        <h4>Web Bán Giày Hà Nội</h4>
                        <p>
                            Chuyên cung cấp các mẫu giày thời trang và thể thao chất lượng cao tại Hà Nội.
                        </p>
                        <ul className="footer-social-icons">
                            <li><a href="#"><i className="icon-twitter"></i></a></li>
                            <li><a href="#"><i className="icon-facebook"></i></a></li>
                            <li><a href="#"><i className="icon-linkedin"></i></a></li>
                            <li><a href="#"><i className="icon-dribbble"></i></a></li>
                        </ul>
                    </div>

                    {/* Customer care */}
                    <div className="col footer-col footer-widget">
                        <h4>Hỗ Trợ Khách Hàng</h4>
                        <ul className="footer-links">
                            <li><a href="#">Liên hệ</a></li>
                            <li><a href="#">Đổi trả / Bảo hành</a></li>
                            <li><a href="#">Mã giảm giá</a></li>
                            <li><a href="#">Yêu thích</a></li>
                            <li><a href="#">Khuyến mãi</a></li>
                            <li><a href="#">Dịch vụ khách hàng</a></li>
                            <li><a href="#">Sơ đồ website</a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="col footer-col footer-widget">
                        <h4>Thông Tin</h4>
                        <ul className="footer-links">
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Giao hàng</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Hỗ trợ</a></li>
                            <li><a href="#">Theo dõi đơn hàng</a></li>
                        </ul>
                    </div>

                    {/* News */}
                    <div className="col footer-col">
                        <h4>Tin Tức</h4>
                        <ul className="footer-links">
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Thông báo</a></li>
                            <li><a href="#">Sự kiện</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col footer-col">
                        <h4>Thông Tin Liên Hệ</h4>
                        <ul className="footer-links">
                            <li>123 Phố Huế, Hai Bà Trưng, Hà Nội</li>
                            <li><a href="tel://0123456789">0123 456 789</a></li>
                            <li><a href="mailto:info@giayhanoi.com">info@giayhanoi.com</a></li>
                            <li><a href="#">giayhanoi.com</a></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copy */}
            <div className="copy">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p>
                            <span>
                                © {new Date().getFullYear()} Web Bán Giày Hà Nội — Thiết kế & phát triển bởi đội ngũ Dev HN
                            </span>
                            <span className="block">
                                Hình ảnh minh họa từ Unsplash & Pexels
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterUser;
