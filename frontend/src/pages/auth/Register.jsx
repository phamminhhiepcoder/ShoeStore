import { useState } from "react";
import axios from "axios";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password || !form.fullName) {
            toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc");
            return;
        }

        try {
            setLoading(true);

            await axios.post("http://localhost:3000/api/auth/register", form);

            toast.success("Đăng ký thành công! Vui lòng đăng nhập");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Đăng ký thất bại"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-lg-7">
                        <img
                            src="/assets_admin/vendors/images/login-page-img.png"
                            alt=""
                        />
                    </div>

                    <div className="col-md-6 col-lg-5">
                        <div className="login-box bg-white box-shadow border-radius-10">
                            <div className="login-title">
                                <h2 className="text-center text-primary">
                                    Đăng ký
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Họ tên */}
                                <div className="input-group custom">
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control form-control-lg"
                                        placeholder="Họ và tên"
                                        required
                                        value={form.fullName}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="icon-copy dw dw-user1"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="input-group custom">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="icon-copy dw dw-email"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="input-group custom">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control form-control-lg"
                                        placeholder="**********"
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="dw dw-padlock1"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="input-group custom">
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control form-control-lg"
                                        placeholder="Số điện thoại"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="icon-copy dw dw-phone"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="input-group custom">
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control form-control-lg"
                                        placeholder="Địa chỉ"
                                        value={form.address}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="icon-copy dw dw-map"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 mb-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-block"
                                            disabled={loading}
                                        >
                                            {loading ? "Đang xử lý..." : "Đăng ký"}
                                        </button>
                                    </div>

                                    <div className="col-sm-12 text-center">
                                        <Link to="/login" className="text-primary">
                                            Đã có tài khoản? Đăng nhập
                                        </Link>
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

export default Register;
