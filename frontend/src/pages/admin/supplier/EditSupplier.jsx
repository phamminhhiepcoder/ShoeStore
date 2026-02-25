import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSupplier = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/suppliers/${id}`);
                const s = response.data;
                setName(s.name);
                setEmail(s.email);
                setPhone(s.phone);
                setAddress(s.address);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu supplier:", err);
                toast.error("Không tìm thấy nhà cung cấp!");
                setLoading(false);
            }
        };

        fetchSupplier();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/suppliers/${id}`, {
                name,
                email,
                phone,
                address
            });

            toast.success("Nhà cung cấp đã được cập nhật thành công!", { autoClose: 1500 });
            setTimeout(() => navigate("/admin/supplier"), 1200);

        } catch (err) {
            console.error("Lỗi khi cập nhật supplier:", err);
            toast.error("Đã xảy ra lỗi khi cập nhật nhà cung cấp!");
        }
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <h4>Chỉnh sửa Nhà Cung Cấp</h4>
                </div>

                <div className="pd-20 card-box mb-30">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Tên nhà cung cấp</label>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Email</label>
                            <div className="col-md-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Số điện thoại</label>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Địa chỉ</label>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-success">Cập nhật Nhà Cung Cấp</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditSupplier;
