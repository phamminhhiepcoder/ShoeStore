import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlider from "./ProductSlider";

import './ProductDetail.css';
const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [activeTab, setActiveTab] = useState("description");

    const user = JSON.parse(localStorage.getItem("user"));

    const [reviews, setReviews] = useState([]);
    const [star, setStar] = useState(5);
    const [content, setContent] = useState("");

    const formatVND = (n) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then(res => {
                const productData = res.data;
                setProduct(productData);

                const defaultVariant = productData.variants?.find(v => v.quantity > 0);
                if (defaultVariant) {
                    setSelectedSize(defaultVariant.size_id.name);
                    setSelectedColor(defaultVariant.color_id.name);
                }
            })
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/reviews/product/${id}`)
            .then(res => setReviews(res.data))
            .catch(console.error);
    }, [id]);

    if (!product) return <p>Đang tải...</p>;


    const colors = product.variants ? [...new Set(product.variants.map(v => v.color_id.name))] : [];
    const sizes = product.variants ? [...new Set(product.variants.map(v => v.size_id.name))] : [];

    const isSizeAvailable = (sizeName) => {
        if (!selectedColor) return product.variants?.some(v => v.size_id.name === sizeName && v.quantity > 0);
        return product.variants?.some(
            v => v.size_id.name === sizeName && v.color_id.name === selectedColor && v.quantity > 0
        );
    };

    const isColorAvailable = (colorName) => {
        if (!selectedSize) return product.variants?.some(v => v.color_id.name === colorName && v.quantity > 0);
        return product.variants?.some(
            v => v.color_id.name === colorName && v.size_id.name === selectedSize && v.quantity > 0
        );
    };

    const selectedVariant = product.variants?.find(
        v => v.size_id.name === selectedSize && v.color_id.name === selectedColor
    );

    const displayPrice = selectedVariant?.price ?? 0;

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Vui lòng chọn size và màu");
            return;
        }

        if (!selectedVariant || selectedVariant.quantity < qty) {
            toast.error("Số lượng không đủ");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = cart.findIndex(
            item =>
                item.productId === product._id &&
                item.size === selectedSize &&
                item.color === selectedColor
        );

        if (existingItemIndex !== -1) {
            const newQty = cart[existingItemIndex].qty + qty;

            if (newQty > cart[existingItemIndex].maxQuantity) {
                toast.error("Vượt quá số lượng tồn kho");
                return;
            }

            cart[existingItemIndex].qty = newQty;
        } else {
            cart.push({
                productId: product._id,
                name: product.name,
                price: displayPrice,
                qty: qty,
                maxQuantity: selectedVariant.quantity,
                size: selectedSize,
                color: selectedColor,
                image: product.images?.[0]?.url || ""
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Đã thêm vào giỏ hàng!");
    };

    const handleDecrease = () => {
        setQty(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        if (!selectedVariant) return;

        setQty(prev => {
            if (prev < selectedVariant.quantity) {
                return prev + 1;
            }
            toast.error("Vượt quá số lượng tồn kho");
            return prev;
        });
    };

    const handleSubmitReview = async () => {
        if (!content.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/api/reviews",
                {
                    productId: id,
                    userId: user._id,
                    content,
                    star
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            setReviews(prev => [res.data, ...prev]);
            setContent("");
            setStar(5);

            toast.success("Đã gửi đánh giá");
        } catch (err) {
            toast.error("Không thể gửi đánh giá");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Xoá đánh giá này?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setReviews(prev => prev.filter(r => r._id !== reviewId));
            toast.success("Đã xoá đánh giá");
        } catch (err) {
            toast.error("Không thể xoá");
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="icon-star-full"></i>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<i key={i} className="icon-star-half"></i>);
            } else {
                stars.push(<i key={i} className="icon-star-empty"></i>);
            }
        }

        return stars;
    };


    if (!product) return <p>Đang tải...</p>;

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="bread"><span><a href="/">Trang chủ</a></span> / <span>Chi Tiết</span></p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="colorlib-product">
                <div className="container">
                    <div className="row row-pb-lg product-detail-wrap">
                        <div className="col-sm-8">
                            <ProductSlider
                                images={product.images}
                                name={product.name}
                            />
                        </div>

                        <div className="col-sm-4">
                            <div className="product-desc">
                                <h3>{product.name}</h3>

                                <p className="price">
                                    <span>{formatVND(displayPrice)}</span>

                                    <span className="rate">
                                        {renderStars(product.averageRating || 0)}
                                        <span className="review-count">
                                            ({product.reviewCount || 0} Đánh Giá)
                                        </span>
                                    </span>
                                </p>


                                <div className="size-wrap">
                                    <div className="block-26 mb-2">
                                        <h4>Size</h4>
                                        <ul className="option-list">
                                            {sizes.map(size => {
                                                const available = isSizeAvailable(size);
                                                const active = selectedSize === size;

                                                return (
                                                    <li key={size} className="option-item">
                                                        <span
                                                            className={`option-btn 
            ${active ? "active" : ""} 
            ${!available ? "disabled" : ""}
          `}
                                                            onClick={() => {
                                                                if (!available) return;
                                                                setSelectedSize(active ? null : size);
                                                            }}
                                                        >
                                                            {size}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="size-wrap">
                                    <div className="block-26 mb-2">
                                        <h4>Màu</h4>
                                        <ul className="option-list">
                                            {colors.map(color => {
                                                const available = isColorAvailable(color);
                                                const active = selectedColor === color;

                                                return (
                                                    <li key={color} className="option-item">
                                                        <span
                                                            className={`option-btn 
            ${active ? "active" : ""} 
            ${!available ? "disabled" : ""}
          `}
                                                            onClick={() => {
                                                                if (!available) return;
                                                                setSelectedColor(active ? null : color);
                                                            }}
                                                        >
                                                            {color}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="input-group mb-4">
                                    <span className="input-group-btn">
                                        <button
                                            type="button"
                                            className="quantity-left-minus btn"
                                            onClick={handleDecrease}
                                        >
                                            <i className="icon-minus2"></i>
                                        </button>
                                    </span>

                                    <input
                                        type="number"
                                        value={qty}
                                        min="1"
                                        max={selectedVariant?.quantity || 1}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            if (val >= 1 && val <= (selectedVariant?.quantity || 1)) {
                                                setQty(val);
                                            }
                                        }}
                                    />

                                    <span className="input-group-btn ml-1">
                                        <button
                                            type="button"
                                            className="quantity-right-plus btn"
                                            onClick={handleIncrease}
                                        >
                                            <i className="icon-plus2"></i>
                                        </button>
                                    </span>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <p className="addtocart">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddToCart();
                                                }}
                                                className="btn btn-primary"
                                                style={{
                                                    pointerEvents: selectedSize && selectedColor ? "auto" : "none",
                                                    opacity: selectedSize && selectedColor ? 1 : 0.5
                                                }}
                                            >
                                                Thêm vào giỏ
                                            </a>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-md-12 pills">
                                    <div className="bd-example bd-example-tabs">
                                        <ul className="nav nav-pills mb-3">
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                                                    onClick={() => setActiveTab("description")}
                                                >
                                                    Mô tả
                                                </button>
                                            </li>

                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                                                    onClick={() => setActiveTab("review")}
                                                >
                                                    Đánh giá
                                                </button>
                                            </li>
                                        </ul>


                                        <div className="tab-content" id="pills-tabContent">
                                            {activeTab === "description" && (
                                                <div className="tab-pane border show active">
                                                    {product.description?.split("\n").map((line, i) => (
                                                        <p key={i}>{line}</p>
                                                    ))}
                                                </div>
                                            )}

                                            {activeTab === "review" && (
                                                <div className="tab-pane show active">

                                                    {user ? (
                                                        <div className="review-form mb-4">
                                                            <h4>Viết đánh giá của bạn</h4>

                                                            <div className="form-group">
                                                                <label>Số sao</label>
                                                                <select
                                                                    className="form-control"
                                                                    value={star}
                                                                    onChange={e => setStar(Number(e.target.value))}
                                                                >
                                                                    {[5, 4, 3, 2, 1].map(s => (
                                                                        <option key={s} value={s}>{s} ⭐</option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="form-group">
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="3"
                                                                    placeholder="Nhận xét của bạn..."
                                                                    value={content}
                                                                    onChange={e => setContent(e.target.value)}
                                                                />
                                                            </div>

                                                            <button className="btn btn-primary" onClick={handleSubmitReview}>
                                                                Gửi đánh giá
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p><strong>Vui lòng đăng nhập để đánh giá sản phẩm</strong></p>
                                                    )}

                                                    <hr />

                                                    {reviews.map(review => (
                                                        <div className="review" key={review._id}>
                                                            <div
                                                                className="user-img"
                                                                style={{
                                                                    backgroundImage: `url(${review.user_id.avatar || "/assets/images/person1.jpg"})`
                                                                }}
                                                            ></div>

                                                            <div className="desc">
                                                                <h4>
                                                                    <span>{review.user_id.fullName}</span>
                                                                    <span className="text-right">
                                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                                    </span>
                                                                </h4>

                                                                <p className="star">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <i
                                                                            key={i}
                                                                            className={i < review.star ? "icon-star-full" : "icon-star-empty"}
                                                                        ></i>
                                                                    ))}

                                                                    {user && review.user_id._id === user._id && (
                                                                        <button
                                                                            className="btn btn-sm btn-danger ml-3"
                                                                            onClick={() => handleDeleteReview(review._id)}
                                                                        >
                                                                            Xoá
                                                                        </button>
                                                                    )}
                                                                </p>

                                                                <p>{review.content}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ProductDetail;
