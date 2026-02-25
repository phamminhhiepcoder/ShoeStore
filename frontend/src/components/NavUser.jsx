import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="colorlib-nav" role="navigation">
            <div className="top-menu">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7 col-md-9">
                            <div id="colorlib-logo">
                                <Link to="/">Footwear</Link>
                            </div>
                        </div>

                        <div className="col-sm-5 col-md-3">
                            <form className="search-wrap">
                                <div className="form-group">
                                    <input
                                        type="search"
                                        className="form-control search"
                                        placeholder="Search"
                                    />
                                    <button className="btn btn-primary submit-search">
                                        <i className="icon-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 text-left menu-1">
                            <ul>
                                <li><Link to="/">Trang chủ</Link></li>
                                <li><Link to="/products">Sản phẩm</Link></li>
                                <li><Link to="/about">Về chúng tôi</Link></li>
                                <li><Link to="/contact">Liên hệ</Link></li>

                                {!user ? (
                                    <li className="cart">
                                        <Link to="/login">Đăng nhập</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="cart">
                                            <Link to="/history">Lịch sử</Link>
                                        </li>
                                        <li className="cart">
                                            <Link to="/changePass">Đổi mật khẩu</Link>
                                        </li>
                                        <li className="cart">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLogout();
                                                }}
                                            >
                                                Đăng xuất
                                            </a>
                                        </li>
                                    </>
                                )}

                                <li className="cart">
                                    <Link to="/cart">
                                        <i className="icon-shopping-cart"></i> Giỏ hàng
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sale">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2 text-center">
                            <div className="owl-carousel2">
                                <div className="item">
                                    <h3>
                                        <Link to="/products">
                                            Giảm giá 25% cho (gần như) mọi thứ! Mã: WINTER01
                                        </Link>
                                    </h3>
                                </div>
                                <div className="item">
                                    <h3>
                                        <Link to="/products">
                                            Giảm giá 50% cho tất cả giày mùa đông
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavUser;
