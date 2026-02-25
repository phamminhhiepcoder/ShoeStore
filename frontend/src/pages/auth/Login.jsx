import { useState } from "react";
import axios from "axios";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                email: username,
                password,
            });

            const user = res.data;
            localStorage.setItem("user", JSON.stringify(user));

            await new Promise(resolve => setTimeout(resolve, 500));

            if (user.role === 1) {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (err) {
            setError(
                err.response?.data?.message || "Sai email hoặc mật khẩu"
            );
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
                                    Đăng nhập
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group custom">
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control form-control-lg"
                                        placeholder="Email của bạn"
                                        required
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="icon-copy dw dw-user1"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-group custom">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control form-control-lg"
                                        placeholder="**********"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="dw dw-padlock1"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* === ERROR GIỐNG $errors === */}
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
                                            Đăng nhập
                                        </button>
                                    </div>

                                    <div className="col-sm-12 text-center">
                                        <Link
                                            to="/register"
                                            className="text-primary"
                                        >
                                            Không có tài khoản? Đăng ký tại đây
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

export default Login;
