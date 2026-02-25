import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/brands/${id}`);
                const b = response.data;
                setName(b.name);
                setDescription(b.description);
                setImageUrl(b.img || "");
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu brand:", err);
                toast.error("Không tìm thấy brand!");
                setLoading(false);
            }
        };

        fetchBrand();
    }, [id]);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            if (imageFile) formData.append("img", imageFile);

            await axios.put(`http://localhost:3000/api/brands/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Thương hiệu đã được cập nhật thành công!", { autoClose: 2000 });
            setTimeout(() => navigate("/admin/brand"), 1000);

        } catch (err) {
            console.error("Lỗi khi cập nhật brand:", err);
            toast.error("Đã xảy ra lỗi khi cập nhật brand!");
        }
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <h4>Chỉnh sửa thương hiệu</h4>
                </div>

                <div className="pd-20 card-box mb-30">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Tên thương hiệu</label>
                            <div className="col-md-6">
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
                            <label className="col-md-2 col-form-label">Mô tả</label>
                            <div className="col-md-6">
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows={4}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Ảnh minh hoạ</label>
                            <div className="col-md-6">
                                {imageUrl && !imageFile && (
                                    <img src={imageUrl} alt="brand" style={{ width: 120, marginBottom: 10 }} />
                                )}
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-10 offset-md-2">
                                <button type="submit" className="btn btn-success">Cập nhật thương hiệu</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditBrand;
