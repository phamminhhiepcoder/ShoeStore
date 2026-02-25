import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewSupplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/suppliers");
                setSuppliers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };

        fetchSuppliers();
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
                order: [[0, "desc"]],
            });
        }
    }, [suppliers]);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
            try {
                await axios.delete(`http://localhost:3000/api/suppliers/${id}`);

                const $ = window.$;
                const table = $(tableRef.current).DataTable();

                const row = table.row($(`tr:has(td.table-plus:contains("${id}"))`));
                row.remove().draw();

                toast.success("Nhà cung cấp đã được xóa thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa supplier:", error);
                toast.error("Đã xảy ra lỗi khi xóa!");
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title"><h4>Quản lý Nhà Cung Cấp</h4></div>
                        </div>
                    </div>
                </div>

                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="text-blue h4">Danh sách Nhà Cung Cấp</h4>
                    </div>

                    <div className="pb-20">
                        <table ref={tableRef} className="data-table table stripe hover">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">ID</th>
                                    <th>Tên NCC</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th className="datatable-nosort">Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {suppliers.map(s => (
                                    <tr key={s._id}>
                                        <td className="table-plus">{s._id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.email}</td>
                                        <td>{s.phone}</td>
                                        <td>{s.address}</td>
                                        <td>{s.created_at}</td>
                                        <td>{s.updated_at}</td>

                                        <td>
                                            <div className="d-flex" style={{ gap: "8px" }}>
                                                <Link
                                                    to={`/admin/supplier/edit/${s._id}`}
                                                    className="btn btn-success btn-sm"
                                                    title="Sửa"
                                                >
                                                    <i className="dw dw-edit2"></i>
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(s._id)}
                                                    title="Xóa"
                                                >
                                                    <i className="dw dw-delete-3"></i>
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

export default ViewSupplier;
