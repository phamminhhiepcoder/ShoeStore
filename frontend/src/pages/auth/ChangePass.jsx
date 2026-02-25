import { useState } from "react";
import axios from "axios";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ChangePass = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("Bạn cần đăng nhập trước!");
            navigate("/login");
            return;
        }

        await axios.put(`http://localhost:3000/api/auth/change-password/${user._id}`, {
            currentPassword,
            newPassword
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        toast.success("Đổi mật khẩu thành công!");
        setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
        }, 1500);


    };

    return (
        <AuthLayout>
            <div className="container">
                <div className="row align-items-center">
                    {/* Cột ảnh bên trái */}
                    <div className="col-md-6 col-lg-7">
                        <img
                            src="/assets_admin/vendors/images/login-page-img.png"
                            alt="Change Password"
                        />
                    </div>

                    {/* Cột form bên phải */}
                    <div className="col-md-6 col-lg-5">
                        <div className="login-box bg-white box-shadow border-radius-10">
                            <div className="login-title">
                                <h2 className="text-center text-primary">
                                    Đổi mật khẩu
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group custom mb-3">
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu hiện tại"
                                        className="form-control form-control-lg"
                                        required
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="dw dw-padlock1"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-group custom mb-3">
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu mới"
                                        className="form-control form-control-lg"
                                        required
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="dw dw-padlock1"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-group custom mb-3">
                                    <input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu mới"
                                        className="form-control form-control-lg"
                                        required
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="dw dw-padlock1"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* Hiển thị lỗi */}
                                {error && (
                                    <div className="text-danger mb-2">
                                        {error}
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-sm-12 mb-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-block"
                                        >
                                            Đổi mật khẩu
                                        </button>
                                    </div>

                                    <div className="col-sm-12 text-center">
                                        <button
                                            type="button"
                                            className="text-primary btn btn-link"
                                            onClick={() => navigate("/")}
                                        >
                                            Quay về trang chủ
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </AuthLayout>
    );
};

export default ChangePass;
