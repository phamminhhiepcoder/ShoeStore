import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/products");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };

        fetchProducts();
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
    }, [products]);

    const handleToggleStatus = async (id) => {
        try {
            const res = await axios.patch(`http://localhost:3000/api/products/${id}/toggle-status`);

            setProducts(prev =>
                prev.map(p => (p._id === id ? { ...p, status: res.data.status } : p))
            );

            toast.success(`Sản phẩm đã được ${res.data.status === "active" ? "kích hoạt" : "tạm ẩn"}!`);
        } catch (error) {
            console.error("Lỗi khi đổi trạng thái:", error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái sản phẩm!");
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title"><h4>Quản lý sản phẩm</h4></div>
                        </div>
                    </div>
                </div>

                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="text-blue h4">Danh sách sản phẩm</h4>
                    </div>
                    <div className="pb-20">
                        <table ref={tableRef} className="data-table table stripe hover">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">ID</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thương hiệu</th>
                                    <th>Danh mục</th>
                                    <th>Ảnh</th>
                                    <th>Trạng thái</th>
                                    <th className="datatable-nosort">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id}>
                                        <td className="table-plus">{p._id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.brandId.name || "N/A"}</td>
                                        <td>{p.category}</td>
                                        <td>
                                            {p.images && p.images.length > 0 ? (
                                                p.images.map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img.url}
                                                        alt="product"
                                                        width="60"
                                                        style={{ borderRadius: "6px", marginRight: "4px" }}
                                                    />
                                                ))
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td>{p.status === "active" ? "Hoạt động" : "Không hoạt động"}</td>
                                        <td>
                                            <div className="d-flex" style={{ gap: "8px" }}>
                                                <Link
                                                    to={`/admin/product/edit/${p._id}`}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    <i className="dw dw-edit2"></i>
                                                </Link>

                                                <button
                                                    className={`btn btn-sm ${p.status ? "btn-warning" : "btn-primary"}`}
                                                    onClick={() => handleToggleStatus(p._id)}
                                                >
                                                    {p.status ? "Ẩn" : "Kích hoạt"}
                                                </button>
                                            </div>
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

export default ViewProduct;
