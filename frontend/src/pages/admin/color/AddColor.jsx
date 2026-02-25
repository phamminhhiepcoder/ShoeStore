import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const AddColor = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/colors", {
                name,
                description
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("màu đã được thêm thành công!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                setTimeout(() => {
                    navigate("/admin/color");
                }, 1000);
            }
        } catch (error) {
            console.error("Lỗi khi tạo màu:", error);
            toast.error("Đã xảy ra lỗi khi thêm màu.");
        }
    };

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title">
                                <h4>Thêm màu mới</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-20 card-box mb-30">
                    <h4 className="text-blue h4 mb-20">Form Thêm màu</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="name">Tên màu</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nhập tên màu"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="description">Mô tả</label>
                            <div className="col-sm-12 col-md-6">
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Nhập mô tả"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-primary">Thêm màu</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddColor;
