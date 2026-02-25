import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const ViewSize = () => {
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/sizes");
                setSizes(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };

        fetchSizes();
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
    }, [sizes]);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa size này?")) {
            try {
                await axios.delete(`http://localhost:3000/api/sizes/${id}`);

                const $ = window.$;
                const table = $(tableRef.current).DataTable();

                const row = table.row($(`tr:has(td.table-plus:contains("${id}"))`));
                row.remove().draw();

                toast.success("Size đã được xóa thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa size:", error);
                toast.error("Đã xảy ra lỗi khi xóa size!");
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
                            <div className="title"><h4>Quản lý size</h4></div>
                        </div>
                    </div>
                </div>

                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="text-blue h4">Danh sách size</h4>
                    </div>
                    <div className="pb-20">
                        <table ref={tableRef} className="data-table table stripe hover">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">ID</th>
                                    <th>Tên size</th>
                                    <th>Mô tả</th>
                                    <th className="datatable-nosort">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sizes.map(size => (
                                    <tr key={size._id}>
                                        <td className="table-plus">{size._id}</td>
                                        <td>{size.name}</td>
                                        <td>{size.description}</td>
                                        <td>
                                            <div className="d-flex" style={{ gap: "8px" }}>
                                                <Link
                                                    to={`/admin/size/edit/${size._id}`}
                                                    className="btn btn-success btn-sm"
                                                    title="Sửa"
                                                >
                                                    <i className="dw dw-edit2"></i>
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(size._id)}
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

export default ViewSize;
