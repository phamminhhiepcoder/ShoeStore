import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users");
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi lấy user:", err);
                setLoading(false);
            }
        };

        fetchUsers();
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
    }, [users]);

    const handleToggleStatus = async (id) => {
        try {
            const res = await axios.put(
                `http://localhost:3000/api/users/toggle-status/${id}`
            );

            setUsers(prev =>
                prev.map(u =>
                    u._id === id ? { ...u, status: res.data.status } : u
                )
            );

            toast.success(
                `Tài khoản đã được ${res.data.status ? "kích hoạt" : "khóa"}`
            );
        } catch (err) {
            console.error("Lỗi toggle status:", err);
            toast.error("Không thể thay đổi trạng thái user!");
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title">
                                <h4>Quản lý người dùng</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="text-blue h4">Danh sách người dùng</h4>
                    </div>

                    <div className="pb-20">
                        <table
                            ref={tableRef}
                            className="data-table table stripe hover"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Họ tên</th>
                                    <th>SĐT</th>
                                    <th>Vai trò</th>
                                    <th>Trạng thái</th>
                                    <th className="datatable-nosort">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id}>
                                        <td>{u._id}</td>
                                        <td>{u.email}</td>
                                        <td>{u.fullName || "—"}</td>
                                        <td>{u.phone || "—"}</td>
                                        <td>
                                            {u.role === 1 ? (
                                                <span className="badge badge-danger">
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="badge badge-secondary">
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {u.status ? (
                                                <span className="badge badge-success">
                                                    Hoạt động
                                                </span>
                                            ) : (
                                                <span className="badge badge-warning">
                                                    Bị khóa
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className={`btn btn-sm ${u.status
                                                        ? "btn-warning"
                                                        : "btn-primary"
                                                    }`}
                                                onClick={() =>
                                                    handleToggleStatus(u._id)
                                                }
                                            >
                                                {u.status
                                                    ? "Khóa"
                                                    : "Kích hoạt"}
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

export default ViewUser;
