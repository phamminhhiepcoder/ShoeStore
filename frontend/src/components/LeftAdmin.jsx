import React from "react";
import { Link } from "react-router-dom";

const LeftAdmin = () => {
    return (
        <div className="left-side-bar">
            <div className="brand-logo d-flex justify-content-between align-items-center p-3">
                <Link to="/admin" className="text-decoration-none text-dark">
                    <img
                        src="/assets_admin/vendors/images/logo.png"
                        alt="WebAdmin"
                        style={{ height: "40px" }}
                    />
                </Link>
                <div className="close-sidebar" data-toggle="left-sidebar-close">
                    <i className="bi bi-x-lg"></i>
                </div>
            </div>

            <div className="menu-block customscroll">
                <div className="sidebar-menu">
                    <ul id="accordion-menu">
                        <li>
                            <Link to="/admin" className="dropdown-toggle no-arrow">
                                <span className="micon bi bi-house-door-fill"></span>
                                <span className="mtext">Trang chủ</span>
                            </Link>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-people"></span>
                                <span className="mtext">Đơn hàng</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/order">Danh sách</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-tags-fill"></span>
                                <span className="mtext">Thương hiệu</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/brand">Danh sách</Link></li>
                                <li><Link to="/admin/brand/add">Thêm mới</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-arrows-expand"></span>
                                <span className="mtext">Size</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/size">Danh sách</Link></li>
                                <li><Link to="/admin/size/add">Thêm mới</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-palette-fill"></span>
                                <span className="mtext">Màu</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/color">Danh sách</Link></li>
                                <li><Link to="/admin/color/add">Thêm mới</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-bag-fill"></span>
                                <span className="mtext">Sản phẩm</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/product">Danh sách</Link></li>
                                <li><Link to="/admin/product/add">Thêm mới</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-bag-fill"></span>
                                <span className="mtext">Tồn kho</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/inventory">Danh sách</Link></li>
                                <li><Link to="/admin/inventory/add">Thêm phiếu</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-ticket-fill"></span>
                                <span className="mtext">Voucher</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/voucher">Danh sách</Link></li>
                                <li><Link to="/admin/voucher/add">Thêm mới</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-truck"></span>
                                <span className="mtext">Nhà cung cấp</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/supplier">Danh sách</Link></li>
                                <li><Link to="/admin/supplier/add">Thêm mới</Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="javascript:;" className="dropdown-toggle">
                                <span className="micon bi bi-people"></span>
                                <span className="mtext">Người dùng</span>
                            </a>
                            <ul className="submenu">
                                <li><Link to="/admin/user">Danh sách</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeftAdmin;
