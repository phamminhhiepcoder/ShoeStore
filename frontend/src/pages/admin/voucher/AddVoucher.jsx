import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddVoucher = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [discountValue, setDiscountValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [minAmount, setMinAmount] = useState("");

    const navigate = useNavigate();

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
            const response = await axios.post("http://localhost:3000/api/vouchers", {
                name,
                code,
                discount_value: Number(discountValue),
                min_amount: Number(minAmount),
                start_date: startDate,
                end_date: endDate
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Voucher đã được thêm thành công!", {
                    position: "top-right",
                    autoClose: 2000,
                });

                setTimeout(() => {
                    navigate("/admin/voucher");
                }, 1000);
            }
        } catch (error) {
            console.error("Lỗi khi tạo voucher:", error);
            toast.error("Đã xảy ra lỗi khi thêm voucher.");
        }
    };


    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title">
                                <h4>Thêm Voucher Mới</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-20 card-box mb-30">
                    <h4 className="text-blue h4 mb-20">Form Thêm Voucher</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="name">Tên voucher</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nhập tên voucher"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="code">Mã voucher</label>
                            <div className="col-sm-12 col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    placeholder="Nhập mã hoặc gen ngẫu nhiên"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
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
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="discount">Giảm (%)</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="discount"
                                    placeholder="Nhập giá trị giảm (%)"
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="minAmount">
                                Giá trị tối thiểu
                            </label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="minAmount"
                                    placeholder="Đơn hàng tối thiểu (VNĐ)"
                                    value={minAmount}
                                    onChange={(e) => setMinAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="startDate">Ngày bắt đầu</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="endDate">Ngày kết thúc</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-primary">Thêm Voucher</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddVoucher;
