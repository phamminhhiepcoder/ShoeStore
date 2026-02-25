import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderHistory = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (!user) return;

        axios
            .get(`http://localhost:3000/api/orders/user/${user._id}`)
            .then(res => setOrders(res.data))
            .catch(() => toast.error("Không tải được đơn hàng"));
    }, []);

    const openDetail = async (id) => {
        const res = await axios.get(
            `http://localhost:3000/api/orders/${id}/detail`
        );
        setSelected(res.data);
    };

    const cancelOrder = async (id) => {
        if (!window.confirm("Bạn muốn huỷ đơn hàng này?")) return;

        try {
            const res = await axios.put(
                `http://localhost:3000/api/orders/${id}/cancel`
            );

            setOrders(prev =>
                prev.map(o => o._id === id ? res.data : o)
            );

            toast.success("Đã huỷ đơn hàng");
        } catch {
            toast.error("Không thể huỷ đơn");
        }
    };

    const statusText = (s) => {
        switch (s) {
            case "pending": return "Chờ xử lý";
            case "confirmed": return "Đã xác nhận";
            case "shipping": return "Đang giao";
            case "completed": return "Hoàn thành";
            case "cancelled": return "Đã huỷ";
            default: return s;
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Lịch sử đơn hàng</h3>

            {orders.length === 0 ? (
                <p>Bạn chưa có đơn hàng nào</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Ngày</th>
                            <th>Phương thức thanh toán</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id}>
                                <td>{o.code}</td>
                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td>{o.method === 'vnpay' ? 'VNPay' : 'COD'}</td>
                                <td>{o.total_price.toLocaleString()}đ</td>
                                <td>{statusText(o.status)}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm mr-1"
                                        onClick={() => openDetail(o._id)}
                                    >
                                        Xem
                                    </button>

                                    {(o.status === "pending" ||
                                        o.status === "confirmed") && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => cancelOrder(o._id)}
                                            >
                                                Huỷ
                                            </button>
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            {/* MODAL DETAIL */}
            {selected && (
                <div className="modal show d-block">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Chi tiết đơn {selected.order.code}</h5>
                                <button
                                    className="close"
                                    onClick={() => setSelected(null)}
                                >×</button>
                            </div>

                            <div className="modal-body">
                                <p><b>Người nhận:</b> {selected.order.full_name}</p>
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
        </div>
    );
};

export default OrderHistory;
