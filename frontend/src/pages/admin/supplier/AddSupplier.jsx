import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSupplier = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/suppliers", {
                name,
                email,
                phone,
                address
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Nhà cung cấp đã được thêm thành công!", {
                    position: "top-right",
                    autoClose: 1500,
                });

                setTimeout(() => {
                    navigate("/admin/supplier");
                }, 1200);
            }
        } catch (error) {
            console.error("Lỗi khi tạo nhà cung cấp:", error);
            toast.error("Đã xảy ra lỗi khi thêm nhà cung cấp.");
        }
    };

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title">
                                <h4>Thêm Nhà Cung Cấp</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-20 card-box mb-30">
                    <h4 className="text-blue h4 mb-20">Form Thêm Supplier</h4>
                    <form onSubmit={handleSubmit}>

                        {/* Name */}
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Tên nhà cung cấp</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Email</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Số điện thoại</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Địa chỉ</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập địa chỉ"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="form-group row">
                            <div className="col-sm-12 col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-primary">Thêm Nhà Cung Cấp</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddSupplier;
