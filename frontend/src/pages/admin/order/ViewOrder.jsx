import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ViewOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(null);
    const tableRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/orders")
            .then(res => setOrders(res.data));
    }, []);

    useEffect(() => {
        if (tableRef.current && window.$) {
            const $ = window.$;
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            $(tableRef.current).DataTable({
                order: [[0, "desc"]]
            });
        }
    }, [orders]);

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.put(
                `http://localhost:3000/api/orders/${id}/status`,
                { status }
            );

            setOrders(prev =>
                prev.map(o => o._id === id ? res.data : o)
            );

            toast.success("Cập nhật trạng thái thành công");
        } catch {
            toast.error("Lỗi cập nhật trạng thái");
        }
    };

    const openDetail = async (id) => {
        const res = await axios.get(
            `http://localhost:3000/api/orders/${id}/detail`
        );
        setSelected(res.data);
    };

    const deleteOrder = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xoá đơn hàng này?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/orders/${id}`);

            if (window.$ && $.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            setOrders(prev => prev.filter(o => o._id !== id));

            toast.success("Đã xoá đơn hàng");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Không thể xoá đơn hàng"
            );
        }
    };



    return (
        <div className="card-box">
            <h4 className="mb-3">Quản lý đơn hàng</h4>

            <table ref={tableRef} className="table data-table">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Ngày</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td>{o.code}</td>
                            <td>{o.full_name}</td>
                            <td>{o.total_price.toLocaleString()}đ</td>
                            <td>
                                <select
                                    value={o.status}
                                    onChange={e =>
                                        updateStatus(o._id, e.target.value)
                                    }
                                    className="form-control"
                                >
                                    <option value="pending">Chờ</option>
                                    <option value="confirmed">Xác nhận</option>
                                    <option value="shipping">Đang giao</option>
                                    <option value="completed">Hoàn thành</option>
                                    <option value="cancelled">Huỷ</option>
                                </select>
                            </td>
                            <td>
                                {new Date(o.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <button
                                    className="btn btn-info btn-sm mr-1"
                                    onClick={() => openDetail(o._id)}
                                >
                                    Xem
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteOrder(o._id)}
                                >
                                    Xoá
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL DETAIL */}
            {selected && (
                <div className="modal show d-block">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Hoá đơn {selected.order.code}</h5>
                                <button
                                    className="close"
                                    onClick={() => setSelected(null)}
                                >×</button>
                            </div>

                            <div className="modal-body">
                                <p><b>Khách:</b> {selected.order.full_name}</p>
                                <p><b>SĐT:</b> {selected.order.phone}</p>
                                <p><b>Địa chỉ:</b> {selected.order.address}</p>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>SL</th>
                                            <th>Giá</th>
                                            <th>Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selected.details.map(d => (
                                            <tr key={d._id}>
                                                <td>
                                                    {d.product_variant_id.product_id.name}
                                                    <br />
                                                    <small>
                                                        {d.product_variant_id.size_id.name} /
                                                        {d.product_variant_id.color_id.name}
                                                    </small>
                                                </td>
                                                <td>{d.quantity}</td>
                                                <td>{d.price.toLocaleString()}đ</td>
                                                <td>{d.subtotal.toLocaleString()}đ</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <h5 className="text-right">
                                    Tổng: {selected.order.total_price.toLocaleString()}đ
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ViewOrder;
