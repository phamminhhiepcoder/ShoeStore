import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewCart = () => {
    const [cart, setCart] = useState([]);

    const formatVND = (n) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(n);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const changeQty = (index, delta) => {
        const newCart = [...cart];
        const item = newCart[index];

        let newQty = item.qty + delta;

        if (newQty < 1) return;
        if (newQty > item.maxQuantity) return;

        item.qty = newQty;
        updateCart(newCart);
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        updateCart(newCart);
    };

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <p className="bread">
                        <span><a href="/">Trang chủ</a></span> / <span>Giỏ hàng</span>
                    </p>
                </div>
            </div>

            <div className="colorlib-product">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="product-name d-flex">
                                <div className="one-forth text-left px-4">Sản phẩm</div>
                                <div className="one-eight text-center">Giá</div>
                                <div className="one-eight text-center">Số lượng</div>
                                <div className="one-eight text-center">Tổng</div>
                                <div className="one-eight text-center">Xoá</div>
                            </div>

                            {cart.length === 0 && (
                                <p className="text-center mt-4">Giỏ hàng trống</p>
                            )}

                            {cart.map((item, index) => (
                                <div className="product-cart d-flex" key={index}>
                                    <div className="one-forth">
                                        <div
                                            className="product-img"
                                            style={{
                                                backgroundImage: `url(${item.image})`
                                            }}
                                        />
                                        <div className="display-tc">
                                            <h3>{item.name}</h3>
                                            <small>
                                                Size: {item.size} | Màu: {item.color}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="one-eight text-center">
                                        <span className="price">
                                            {formatVND(item.price)}
                                        </span>
                                    </div>

                                    <div className="one-eight text-center">
                                        <div className="input-group justify-content-center">
                                            <button
                                                className="btn btn-light btn-sm"
                                                onClick={() => changeQty(index, -1)}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="text"
                                                readOnly
                                                value={item.qty}
                                                className="form-control text-center"
                                                style={{ width: "20px" }}
                                            />
                                            <button
                                                className="btn btn-light btn-sm"
                                                onClick={() => changeQty(index, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="one-eight text-center">
                                        <span className="price">
                                            {formatVND(item.price * item.qty)}
                                        </span>
                                    </div>

                                    <div className="one-eight text-center">
                                        <button
                                            onClick={() => removeItem(index)}
                                            title="Xoá sản phẩm"
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                color: "#e74c3c",
                                                fontSize: "22px",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                lineHeight: "1"
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>


                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Tổng tiền */}
                    <div className="row mt-5">
                        <div className="col-md-4 offset-md-8">
                            <div className="total-wrap">
                                <div className="grand-total">
                                    <p>
                                        <strong>Tổng cộng:</strong>{" "}
                                        <span>{formatVND(subtotal)}</span>
                                    </p>
                                </div>
                                <Link to="/checkout" className="btn btn-primary btn-block">
                                    Thanh toán
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ViewCart;
