import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [method, setMethod] = useState("cod");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const [addressForm, setAddressForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        isDefault: false
    });

    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        email: "",
        address: "",
        note: ""
    });
    const openAddModal = () => {
        setEditingAddress(null);
        setAddressForm({
            fullName: "",
            phone: "",
            email: "",
            address: "",
            isDefault: false
        });
        setShowModal(true);
    };

    const openEditModal = (addr) => {
        setEditingAddress(addr);
        setAddressForm({
            fullName: addr.fullName,
            phone: addr.phone,
            email: addr.email || "",
            address: addr.address,
            isDefault: addr.isDefault || false
        });
        setShowModal(true);
    };
    const saveAddress = async () => {
        try {
            if (editingAddress) {
                await axios.put(
                    `http://localhost:3000/api/address/${editingAddress._id}`,
                    {
                        userId,
                        ...addressForm
                    }
                );
            } else {
                await axios.post(
                    "http://localhost:3000/api/address",
                    {
                        userId,
                        ...addressForm
                    }
                );
            }

            setShowModal(false);

            const res = await axios.get(
                `http://localhost:3000/api/address?userId=${userId}`
            );
            setAddresses(res.data);

        } catch (err) {
            toast.error("Không thể lưu địa chỉ");
        }
    };

    const deleteAddress = async (id) => {
        if (!window.confirm("Xoá địa chỉ này?")) return;

        try {
            await axios.delete(
                `http://localhost:3000/api/address/${id}?userId=${userId}`
            );

            setAddresses(prev => prev.filter(a => a._id !== id));
        } catch (err) {
            toast.error("Không thể xoá địa chỉ");
        }
    };


    const formatVND = (n) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(n);

    useEffect(() => {
        if (!user) return;

        axios.get(`http://localhost:3000/api/address?userId=${userId}`)
            .then(res => {
                setAddresses(res.data);
                const defaultAddr = res.data.find(a => a.isDefault);
                if (defaultAddr) handleSelectAddress(defaultAddr);
            });

    }, []);

    const handleSelectAddress = (addr) => {
        setSelectedAddressId(addr._id);

        setForm({
            full_name: addr.fullName,
            phone: addr.phone,
            email: addr.email || "",
            address: addr.address,
            note: ""
        });
    };

    useEffect(() => {

        if (user) {
            setForm(prev => ({
                ...prev,
                full_name: user.fullName || "",
                phone: user.phone || "",
                email: user.email || "",
                address: user.address || ""
            }));
        }
    }, []);


    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
        axios.get("http://localhost:3000/api/vouchers")
            .then(res => setVouchers(res.data));
    }, []);

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const discount =
        selectedVoucher && subtotal >= selectedVoucher.min_amount
            ? (subtotal * selectedVoucher.discount_value) / 100
            : 0;

    const total = Math.max(subtotal - discount, 0);

    const handleSubmit = async () => {
        try {

            const res = await axios.post("http://localhost:3000/api/orders", {
                user_id: user._id,
                voucher_id: selectedVoucher?._id || null,
                ...form,
                method,
                items: cart.map(i => ({
                    product_id: i.productId,
                    quantity: i.qty,
                    size: i.size,
                    color: i.color,
                    price: i.price
                }))
            });

            if (method === "cod") {
                toast.success("Đặt hàng thành công!");
                localStorage.removeItem("cart");
                window.location.href = "/";
            }

            if (method === "vnpay") {
                const payment = await axios.post(
                    "http://localhost:3000/api/orders/vnpay/create",
                    { order_id: res.data.order_id }
                );
                window.location.href = payment.data.paymentUrl;
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi đặt hàng");
        }
    };

    return (
        <div className="container my-5">
            <h3 className="mb-4">Thanh toán</h3>

            <div className="row">
                {/* LEFT: THÔNG TIN */}


                <div className="col-md-6">
                    <h5>Thông tin người nhận</h5>

                    <input
                        className="form-control mb-2"
                        placeholder="Họ tên"
                        value={form.full_name}
                        onChange={e => setForm({ ...form, full_name: e.target.value })}
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Số điện thoại"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Địa chỉ"
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                    />

                    <textarea
                        className="form-control"
                        placeholder="Ghi chú"
                        rows={3}
                        value={form.note}
                        onChange={e => setForm({ ...form, note: e.target.value })}
                    />
                </div>

                <div className="col-md-6 mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5>Địa chỉ của tôi</h5>
                        <button className="btn btn-sm btn-outline-primary" onClick={openAddModal}>
                            + Thêm địa chỉ
                        </button>
                    </div>

                    {addresses.map(addr => (
                        <div
                            key={addr._id}
                            className={`border rounded p-2 mb-2 
            ${selectedAddressId === addr._id ? "border-primary bg-light" : ""}`}
                        >
                            <div
                                onClick={() => handleSelectAddress(addr)}
                                style={{ cursor: "pointer" }}
                            >
                                <strong>{addr.fullName}</strong> | {addr.phone}
                                {addr.isDefault && (
                                    <span className="badge bg-primary ms-2">Mặc định</span>
                                )}
                                <div className="text-muted small">{addr.address}</div>
                            </div>

                            <div className="mt-2 d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => openEditModal(addr)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deleteAddress(addr._id)}
                                >
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ))}
                </div>




                {/* RIGHT: GIỎ HÀNG */}
                <div className="col-md-6">
                    <h5>Đơn hàng của bạn</h5>

                    <div className="border p-3 mb-3">
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center mb-2"
                            >
                                <img
                                    src={item.image}
                                    alt=""
                                    width="60"
                                    className="me-3"
                                />
                                <div className="flex-grow-1">
                                    <div>{item.name}</div>
                                    <small>
                                        {item.size} / {item.color} × {item.qty}
                                    </small>
                                </div>
                                <strong>
                                    {formatVND(item.price * item.qty)}
                                </strong>
                            </div>
                        ))}
                    </div>

                    {/* Tổng tiền */}
                    <p>Tạm tính: <strong>{formatVND(subtotal)}</strong></p>
                    <p>Giảm giá: <strong>{formatVND(discount)}</strong></p>
                    <h5>Tổng thanh toán: {formatVND(total)}</h5>

                    {/* Voucher */}
                    <select
                        className="form-control my-2"
                        onChange={(e) =>
                            setSelectedVoucher(
                                vouchers.find(v => v._id === e.target.value)
                            )
                        }
                    >
                        <option value="">-- Chọn voucher --</option>
                        {vouchers.map(v => (
                            <option key={v._id} value={v._id}>
                                {v.code} (-{v.discount_value}%)
                            </option>
                        ))}
                    </select>

                    {/* Method */}
                    <div className="my-3">
                        <label className="d-block">
                            <input
                                type="radio"
                                checked={method === "cod"}
                                onChange={() => setMethod("cod")}
                            />{" "}
                            Thanh toán khi nhận hàng (COD)
                        </label>
                        <label className="d-block">
                            <input
                                type="radio"
                                checked={method === "vnpay"}
                                onChange={() => setMethod("vnpay")}
                            />{" "}
                            Thanh toán VNPAY
                        </label>
                    </div>

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                    >
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="modal fade show d-block" style={{ background: "#00000066" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ"}
                                </h5>
                                <button className="btn-close" onClick={() => setShowModal(false)} />
                            </div>

                            <div className="modal-body">
                                <input
                                    className="form-control mb-2"
                                    placeholder="Họ tên"
                                    value={addressForm.fullName}
                                    onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                />
                                <input
                                    className="form-control mb-2"
                                    placeholder="Số điện thoại"
                                    value={addressForm.phone}
                                    onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                                />
                                <input
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    value={addressForm.email}
                                    onChange={e => setAddressForm({ ...addressForm, email: e.target.value })}
                                />
                                <input
                                    className="form-control mb-2"
                                    placeholder="Địa chỉ"
                                    value={addressForm.address}
                                    onChange={e => setAddressForm({ ...addressForm, address: e.target.value })}
                                />

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={addressForm.isDefault}
                                        onChange={e =>
                                            setAddressForm({ ...addressForm, isDefault: e.target.checked })
                                        }
                                    />{" "}
                                    Đặt làm mặc định
                                </label>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Huỷ
                                </button>
                                <button className="btn btn-primary" onClick={saveAddress}>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Checkout;
