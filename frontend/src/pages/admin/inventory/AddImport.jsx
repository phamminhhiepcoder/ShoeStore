import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddImport = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [supplierId, setSupplierId] = useState("");
    const [note, setNote] = useState("");

    const getTotal = () => {
        return details.reduce((sum, d) => sum + d.quantity * d.import_price, 0);
    };
    const formatVND = (n) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);


    const [details, setDetails] = useState([
        { product: "", color: "", size: "", quantity: 1, import_price: 0 }
    ]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/suppliers").then(res => setSuppliers(res.data));
        axios.get("http://localhost:3000/api/products").then(res => setProducts(res.data));
        axios.get("http://localhost:3000/api/colors").then(res => setColors(res.data));
        axios.get("http://localhost:3000/api/sizes").then(res => setSizes(res.data));
    }, []);

    const addRow = () => {
        setDetails([...details, { product: "", color: "", size: "", quantity: 1, import_price: 0 }]);
    };

    const removeRow = (index) => {
        const updated = [...details];
        updated.splice(index, 1);
        setDetails(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = [...details];
        updated[index][field] = value;
        setDetails(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                supplier_id: supplierId,
                note,
                items: details.map(d => ({
                    product_id: d.product,
                    color_id: d.color,
                    size_id: d.size,
                    quantity: Number(d.quantity),
                    import_price: Number(d.import_price)
                }))
            };

            const res = await axios.post("http://localhost:3000/api/imports", payload);

            toast.success("Tạo phiếu nhập thành công!");

            setDetails([{ product: "", color: "", size: "", quantity: 1, import_price: 0 }]);
            setSupplierId("");
            setNote("");

        } catch (error) {
            console.error(error);
            toast.error("Có lỗi khi tạo phiếu nhập!");
        }
    };


    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <h4>Thêm Phiếu Nhập Hàng</h4>
                </div>

                <div className="card-box pd-20 mb-30">
                    <form onSubmit={handleSubmit}>

                        {/* Supplier */}
                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Nhà cung cấp</label>
                            <div className="col-md-6">
                                <select className="form-control" value={supplierId}
                                    onChange={(e) => setSupplierId(e.target.value)} required>
                                    <option value="">-- Chọn nhà cung cấp --</option>
                                    {suppliers.map(s => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <hr />

                        <h5>Chi tiết phiếu nhập</h5>

                        {/* Table */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Màu</th>
                                    <th>Size</th>
                                    <th>Số lượng</th>
                                    <th>Giá nhập</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((d, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <select className="form-control"
                                                value={d.product}
                                                onChange={(e) => handleChange(idx, "product", e.target.value)}
                                                required
                                            >
                                                <option value="">-- Chọn sản phẩm --</option>
                                                {products.map(p => (
                                                    <option key={p._id} value={p._id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </td>

                                        <td>
                                            <select className="form-control"
                                                value={d.color}
                                                onChange={(e) => handleChange(idx, "color", e.target.value)}
                                                required
                                            >
                                                <option value="">-- Chọn màu --</option>
                                                {colors.map(c => (
                                                    <option key={c._id} value={c._id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </td>

                                        <td>
                                            <select className="form-control"
                                                value={d.size}
                                                onChange={(e) => handleChange(idx, "size", e.target.value)}
                                                required
                                            >
                                                <option value="">-- Chọn size --</option>
                                                {sizes.map(s => (
                                                    <option key={s._id} value={s._id}>{s.name}</option>
                                                ))}
                                            </select>
                                        </td>

                                        <td>
                                            <input type="number" className="form-control" min={1}
                                                value={d.quantity}
                                                onChange={(e) => handleChange(idx, "quantity", e.target.value)}
                                            />
                                        </td>

                                        <td>
                                            <input type="number" className="form-control" min={0}
                                                value={d.import_price}
                                                onChange={(e) => handleChange(idx, "import_price", e.target.value)}
                                            />
                                        </td>

                                        <td>
                                            {details.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeRow(idx)}
                                                >
                                                    X
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="text-right mb-3">
                            <h5>
                                Tổng tiền nhập: <span className="text-danger fw-bold">{formatVND(getTotal())}</span>
                            </h5>
                        </div>


                        <button type="button" className="btn btn-secondary mb-3"
                            onClick={addRow}>+ Thêm dòng</button>

                        <div className="form-group row mb-3">
                            <label className="col-md-2 col-form-label">Ghi chú</label>
                            <div className="col-md-6">
                                <textarea className="form-control" rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <button className="btn btn-primary">Tạo phiếu nhập</button>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AddImport;
