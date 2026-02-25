import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewInventory = () => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [newQuantity, setNewQuantity] = useState(0);
    const [editingPriceId, setEditingPriceId] = useState(null);
    const [newPrice, setNewPrice] = useState(0);

    const tableRef = useRef(null);
    const formatVND = (n) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

    useEffect(() => {
        const fetchVariants = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/productVariants");
                setVariants(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };

        fetchVariants();
    }, []);

    useEffect(() => {
        if (tableRef.current && window.$) {
            const $ = window.$;

            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            $(tableRef.current).DataTable({
                responsive: true,
                autoWidth: false,
                order: [[0, 'desc']],
            });
        }
    }, [variants]);

    const updateQuantity = async (variantId) => {
        try {
            await axios.put(
                `http://localhost:3000/api/productVariants/${variantId}/quantity`,
                { quantity: Number(newQuantity) }
            );

            setVariants(prev =>
                prev.map(v =>
                    v.id === variantId ? { ...v, quantity: newQuantity } : v
                )
            );

            toast.success("Cập nhật tồn kho thành công");
            setEditingId(null);
            
        } catch (err) {
            toast.error("Lỗi khi cập nhật số lượng");
        }
    };

    const deleteVariant = async (variantId) => {
        if (!window.confirm("Bạn có chắc muốn xoá biến thể này?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/productVariants/${variantId}`);

            setVariants(prev => prev.filter(v => v.id !== variantId));

            toast.success("Xoá biến thể thành công");
        } catch (err) {
            toast.error("Lỗi khi xoá biến thể");
        }
    };


    const updatePrice = async (variantId) => {
        try {
            await axios.put(
                `http://localhost:3000/api/productVariants/${variantId}/price`,
                { price: Number(newPrice) }
            );

            setVariants(prev =>
                prev.map(v =>
                    v.id === variantId ? { ...v, price: Number(newPrice) } : v
                )
            );

            toast.success("Cập nhật giá bán thành công");
            setEditingPriceId(null);
        } catch {
            toast.error("Lỗi khi cập nhật giá bán");
        }
    };



    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title"><h4>Tồn kho</h4></div>
                        </div>
                    </div>
                </div>

                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="text-blue h4">Tồn kho sản phẩm</h4>
                    </div>
                    <div className="pb-20">
                        <table ref={tableRef} className="data-table table stripe hover">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">ID</th>
                                    <th className="table-plus datatable-nosort">Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Màu</th>
                                    <th>Size</th>
                                    <th>Giá nhập</th>
                                    <th>Giá bán</th>
                                    <th>Số lượng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variants.map(variant => (
                                    <tr key={variant.id}>
                                        <td className="table-plus">{variant.id}</td>
                                        <td>
                                            <img
                                                src={variant.image}
                                                alt="product"
                                                width="60"
                                                style={{ borderRadius: "6px", marginRight: "4px" }}
                                            />
                                        </td>
                                        <td>{variant.product_name}</td>
                                        <td>{variant.color}</td>
                                        <td>{variant.size}</td>
                                        <td>{formatVND(variant.import_price)}</td>
                                        <td>
                                            {editingPriceId === variant.id ? (
                                                <div style={{ display: "flex", gap: "5px" }}>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="form-control"
                                                        style={{ width: "100px" }}
                                                        value={newPrice}
                                                        onChange={e => setNewPrice(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => updatePrice(variant.id)}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => setEditingPriceId(null)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <span
                                                    style={{ cursor: "pointer", fontWeight: "bold" }}
                                                    onClick={() => {
                                                        setEditingPriceId(variant.id);
                                                        setNewPrice(variant.price);
                                                    }}
                                                >
                                                    {formatVND(variant.price)}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {editingId === variant.id ? (
                                                <div style={{ display: "flex", gap: "5px" }}>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="form-control"
                                                        style={{ width: "80px" }}
                                                        value={newQuantity}
                                                        onChange={e => setNewQuantity(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => updateQuantity(variant.id)}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => setEditingId(null)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <span
                                                    style={{ cursor: "pointer", fontWeight: "bold" }}
                                                    onClick={() => {
                                                        setEditingId(variant.id);
                                                        setNewQuantity(variant.quantity);
                                                    }}
                                                >
                                                    {variant.quantity}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteVariant(variant.id)}
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ViewInventory;
