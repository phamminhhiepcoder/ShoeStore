import React from "react";

const HeaderAdmin = () => {
    return (
        <div className="header">
            <div className="header-left">
                <div className="menu-icon bi bi-list"></div>
                <div
                    className="search-toggle-icon bi bi-search"
                    data-toggle="header_search"
                ></div>

                <div className="header-search">
                    <form>
                        <div className="form-group mb-0">
                            <i className="dw dw-search2 search-icon"></i>
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Tìm kiếm"
                            />
                            <div className="dropdown">
                                <a
                                    className="dropdown-toggle no-arrow"
                                    href="#"
                                    role="button"
                                    data-toggle="dropdown"
                                >
                                    <i className="ion-arrow-down-c"></i>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="form-group row">
                                        <label className="col-sm-12 col-md-2 col-form-label">
                                            From
                                        </label>
                                        <div className="col-sm-12 col-md-10">
                                            <input
                                                className="form-control form-control-sm form-control-line"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-12 col-md-2 col-form-label">
                                            To
                                        </label>
                                        <div className="col-sm-12 col-md-10">
                                            <input
                                                className="form-control form-control-sm form-control-line"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-12 col-md-2 col-form-label">
                                            Subject
                                        </label>
                                        <div className="col-sm-12 col-md-10">
                                            <input
                                                className="form-control form-control-sm form-control-line"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary">
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="header-right">
                {/* Cài đặt (Right Sidebar toggle) */}
                <div className="dashboard-setting user-notification">
                    <div className="dropdown">
                        <button
                            className="dropdown-toggle no-arrow btn btn-link p-0"
                            onClick={() => console.log("Mở sidebar cài đặt")}
                        >
                            <i className="dw dw-settings2"></i>
                        </button>
                    </div>
                </div>

                {/* Thông báo */}
                <div className="user-notification">
                    <div className="dropdown">
                        <a
                            className="dropdown-toggle no-arrow"
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                        >
                            <i className="icon-copy dw dw-notification"></i>
                            <span className="badge notification-active"></span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="notification-list mx-h-350 customscroll">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="/assets_admin/vendors/images/img.jpg" alt="" />
                                            <h3>John Doe</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit...
                                            </p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img
                                                src="/assets_admin/vendors/images/photo1.jpg"
                                                alt=""
                                            />
                                            <h3>Lea R. Frith</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit...
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin người dùng */}
                <div className="user-info-dropdown">
                    <div className="dropdown">
                        <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                        >
                            <span className="user-icon">
                                <img
                                    src="/assets_admin/vendors/images/photo1.jpg"
                                    alt="avatar"
                                />
                            </span>
                            <span className="user-name">Admin</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                            <a className="dropdown-item" href="/profile">
                                <i className="dw dw-user1"></i> Profile
                            </a>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => console.log("Đăng xuất")}
                            >
                                <i className="dw dw-logout"></i> Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderAdmin;
