import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVoucher = () => {
    const { id } = useParams(); // _id của MongoDB
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [discountValue, setDiscountValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [minAmount, setMinAmount] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vouchers/${id}`);
                const v = response.data;
                setName(v.name);
                setCode(v.code);
                setDiscountValue(v.discount_value);
                setStartDate(v.start_date);
                setMinAmount(v.min_amount);
                setEndDate(v.end_date);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu voucher:", err);
                toast.error("Không tìm thấy voucher!");
                setLoading(false);
            }
        };

        fetchVoucher();
    }, [id]);

    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for (let i = 0; i < 6; i++) {
            randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCode(randomCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/vouchers/${id}`, {
                name,
                code,
                discount_value: Number(discountValue),
                min_amount: Number(minAmount),
                start_date: startDate,
                end_date: endDate
            });

            toast.success("Voucher đã được cập nhật thành công!", { autoClose: 2000 });
            setTimeout(() => navigate("/admin/voucher"), 1000);

        } catch (err) {
            console.error("Lỗi khi cập nhật voucher:", err);
            toast.error("Đã xảy ra lỗi khi cập nhật voucher!");
        }
    };


    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title">
                                <h4>Chỉnh sửa Voucher</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-20 card-box mb-30">
                    <h4 className="text-blue h4 mb-20">Form Chỉnh sửa Voucher</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Tên voucher</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Mã voucher</label>
                            <div className="col-sm-12 col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-sm-12 col-md-2">
                                <button type="button" className="btn btn-secondary" onClick={generateCode}>
                                    Gen Code
                                </button>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Giảm (%)</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={discountValue}
                                    onChange={e => setDiscountValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">
                                Giá trị tối thiểu
                            </label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Đơn hàng tối thiểu (VNĐ)"
                                    value={minAmount}
                                    onChange={e => setMinAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>


                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Ngày bắt đầu</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label">Ngày kết thúc</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-success">Cập nhật Voucher</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditVoucher;
