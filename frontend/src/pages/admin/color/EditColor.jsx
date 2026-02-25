import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditColor = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchmàu = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/colors/${id}`);
                setName(response.data.name);
                setDescription(response.data.description);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu màu:", error);
                toast.warning("Không tìm thấy màu.");
                setLoading(false);
            }
        };

        fetchmàu();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/colors/${id}`, { name, description });

            toast.success("Màu đã được cập nhật thành công!", {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate("/admin/color");
            }, 1000);

        } catch (error) {
            console.error("Lỗi khi cập nhật màu:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật màu!");
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
                                <h4>Chỉnh sửa màu</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-20 card-box mb-30">
                    <h4 className="text-blue h4 mb-20">Form Chỉnh Sửa màu</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-sm-12 col-md-2 col-form-label" htmlFor="name">Tên màu</label>
                            <div className="col-sm-12 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-success">Cập nhật màu</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditColor;
