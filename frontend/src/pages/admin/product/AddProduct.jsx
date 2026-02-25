import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brandId, setBrandId] = useState("");
    const [status, setStatus] = useState("active");

    const [brands, setBrands] = useState([]);

    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/brands")
            .then(res => setBrands(res.data))
            .catch(err => console.log(err));
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        const previewFiles = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setImages(prev => [...prev, ...previewFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        onDrop,
        multiple: true,
    });

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("brandId", brandId);
            formData.append("status", status);

            images.forEach(img => formData.append("images", img));

            await axios.post("http://localhost:3000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Product created!");
            setTimeout(() => navigate("/admin/product"), 1200);

        } catch (err) {
            console.log(err);
            toast.error("Error creating product!");
        }
    };

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <h4>Thêm Sản Phẩm Mới</h4>
                </div>

                <div className="pd-20 card-box mb-30">
                    <form onSubmit={handleSubmit}>

                        {/* NAME */}
                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Tên sản phẩm</label>
                            <div className="col-md-6">
                                <input className="form-control" value={name}
                                    onChange={(e) => setName(e.target.value)} required />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Mô tả</label>
                            <div className="col-md-6">
                                <textarea className="form-control"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Danh mục</label>
                            <div className="col-md-6">
                                <input className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Thương hiệu</label>
                            <div className="col-md-6">
                                <select className="form-control"
                                    value={brandId}
                                    onChange={(e) => setBrandId(e.target.value)}
                                    required
                                >
                                    <option value="">-- Chọn Brand --</option>
                                    {brands.map(b => (
                                        <option key={b._id} value={b._id}>
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Trạng thái</label>
                            <div className="col-md-6">
                                <select className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Ảnh sản phẩm</label>
                            <div className="col-md-6">

                                <div {...getRootProps()} style={{
                                    border: "2px dashed #999",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    background: isDragActive ? "#eee" : "#fafafa",
                                    cursor: "pointer"
                                }}>
                                    <input {...getInputProps()} />
                                    {isDragActive
                                        ? <p>Kéo thả ảnh vào đây...</p>
                                        : <p>Kéo ảnh vào hoặc bấm để chọn</p>}
                                </div>

                                <div className="mt-3 d-flex flex-wrap">
                                    {images.map((f, i) => (
                                        <img key={i}
                                            src={f.preview}
                                            width={100}
                                            height={100}
                                            alt=""
                                            style={{ objectFit: "cover", marginRight: 10, borderRadius: 6 }}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-10 offset-md-2">
                                <button className="btn btn-primary">Thêm sản phẩm</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AddProduct;
