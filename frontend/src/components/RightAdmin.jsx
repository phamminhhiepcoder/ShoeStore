import React from "react";

const RightAdmin = () => {
    return (
        <div className="right-sidebar">
            <div className="sidebar-title">
                <h3 className="weight-600 font-16 text-blue">
                    Layout
                    <span className="btn-block font-weight-400 font-12">Cài đặt</span>
                </h3>
                <div className="close-sidebar" data-toggle="right-sidebar-close">
                    <i className="icon-copy ion-close-round"></i>
                </div>
            </div>

            <div className="right-sidebar-body customscroll">
                <div className="right-sidebar-body-content">
                    <h4 className="weight-600 font-18 pb-10">Giao diện header</h4>
                    <div className="sidebar-btn-group pb-30 mb-10">
                        <button
                            type="button"
                            className="btn btn-outline-primary header-white"
                            onClick={() => console.log("Đổi header trắng")}
                        >
                            Trắng
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary header-dark"
                            onClick={() => console.log("Đổi header đen")}
                        >
                            Đen
                        </button>
                    </div>

                    <h4 className="weight-600 font-18 pb-10">Giao diện trái</h4>
                    <div className="sidebar-btn-group pb-30 mb-10">
                        <button
                            type="button"
                            className="btn btn-outline-primary sidebar-light"
                            onClick={() => console.log("Đổi sidebar trắng")}
                        >
                            Trắng
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary sidebar-dark"
                            onClick={() => console.log("Đổi sidebar đen")}
                        >
                            Đen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightAdmin;
