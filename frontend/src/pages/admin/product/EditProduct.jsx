import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brandId, setBrandId] = useState("");
    const [status, setStatus] = useState("active");

    const [brands, setBrands] = useState([]);

    const [oldImages, setOldImages] = useState([]);

    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/products/${id}`);
                const p = res.data;

                setProduct(p);
                setName(p.name);
                setDescription(p.description || "");
                setCategory(p.category || "");
                setBrandId(p.brandId?._id || "");
                setStatus(p.status || "active");
                setOldImages(p.images || []);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/brands")
            .then(res => setBrands(res.data))
            .catch(err => console.log(err));
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        const mapped = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setNewImages(prev => [...prev, ...mapped]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        onDrop,
        multiple: true
    });

    const removeOldImage = (idToRemove) => {
        setOldImages(oldImages.filter(img => img._id !== idToRemove));
    };
    const removeNewImage = (index) => {
        const updated = [...newImages];
        updated.splice(index, 1);
        setNewImages(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("brandId", brandId);
            formData.append("status", status);

            const oldIds = oldImages.map(img => img._id);
            formData.append("oldImages", JSON.stringify(oldIds));

            newImages.forEach(img => formData.append("images", img));

            await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Sản phẩm được cập nhật thành công!");
            setTimeout(() => navigate("/admin/product"), 1200);

        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi cập nhật!");
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <h4>Sửa Sản Phẩm</h4>
                </div>

                <div className="pd-20 card-box mb-30">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Tên sản phẩm</label>
                            <div className="col-md-6">
                                <input className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Mô tả</label>
                            <div className="col-md-6">
                                <textarea
                                    className="form-control"
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
                                >
                                    <option value="">-- Chọn Brand --</option>
                                    {brands.map(b => (
                                        <option key={b._id} value={b._id}>{b.name}</option>
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
                            <label className="col-md-2 col-form-label">Ảnh hiện tại</label>
                            <div className="col-md-10 d-flex flex-wrap">
                                {oldImages.map(img => (
                                    <div key={img._id} style={{ position: "relative", marginRight: 10 }}>
                                        <img
                                            src={img.url}
                                            width={100}
                                            height={100}
                                            style={{ objectFit: "cover", borderRadius: 6 }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeOldImage(img._id)}
                                            style={{
                                                position: "absolute",
                                                top: -5,
                                                right: -5,
                                                background: "red",
                                                color: "#fff",
                                                borderRadius: "50%",
                                                border: "none",
                                                width: 22,
                                                height: 22,
                                                cursor: "pointer"
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Thêm ảnh mới</label>
                            <div className="col-md-6">
                                <div
                                    {...getRootProps()}
                                    style={{
                                        border: "2px dashed #999",
                                        padding: "20px",
                                        borderRadius: "8px",
                                        textAlign: "center",
                                        background: isDragActive ? "#eee" : "#fafafa",
                                        cursor: "pointer"
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive ? <p>Thả ảnh vào...</p> : <p>Kéo ảnh vào hoặc click để chọn</p>}
                                </div>

                                <div className="mt-3 d-flex flex-wrap">
                                    {newImages.map((img, index) => (
                                        <div key={index} style={{ position: "relative", marginRight: 10 }}>
                                            <img
                                                src={img.preview}
                                                width={100}
                                                height={100}
                                                style={{ objectFit: "cover", borderRadius: 6 }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                style={{
                                                    position: "absolute",
                                                    top: -5,
                                                    right: -5,
                                                    background: "red",
                                                    color: "#fff",
                                                    borderRadius: "50%",
                                                    border: "none",
                                                    width: 22,
                                                    height: 22,
                                                    cursor: "pointer"
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-10 offset-md-2">
                                <button className="btn btn-primary">Cập nhật sản phẩm</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditProduct;
