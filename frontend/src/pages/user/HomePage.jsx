import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./HomePage.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const HomePage = () => {

    const [bestSeller, setBestSeller] = useState([]);
    const [newestProducts, setNewestProducts] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [bestRes, newRes, brandRes] = await Promise.all([
                    axios.get("http://localhost:3000/api/products/best-seller"),
                    axios.get("http://localhost:3000/api/products/newest"),
                    axios.get("http://localhost:3000/api/brands")
                ]);

                setBestSeller(bestRes.data);
                setNewestProducts(newRes.data);
                setBrands(brandRes.data);
            } catch (err) {
                toast.error("Không tải được dữ liệu trang chủ");
            }
        };

        fetchHomeData();
    }, []);



    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                className="hero-slider"
            >
                <SwiperSlide>
                    <img src="/assets/images/banner1.jpg" alt="banner1" />
                </SwiperSlide>
                
                <SwiperSlide>
                    <img src="/assets/images/banner3.jpg" alt="banner3" />
                </SwiperSlide>
            </Swiper>



            <div className="colorlib-product">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2 text-center colorlib-heading">
                            <h2>Sản Phẩm Bán Chạy</h2>
                        </div>
                    </div>
                    <div className="row row-pb-md">
                        {bestSeller.map(p => (
                            <div key={p._id} className="col-lg-3 mb-4 text-center">
                                <div className="product-entry border">
                                    <Link to={`/products/${p._id}`} className="prod-img">
                                        <img
                                            src={p.images?.[0]?.url || "/assets/images/no-image.jpg"}
                                            className="img-fluid"
                                            alt={p.name}
                                        />
                                    </Link>
                                    <div className="desc">
                                        <h2>
                                            <Link to={`/products/${p._id}`}>{p.name}</Link>
                                        </h2>
                                        <span className="price">
                                            {p.minPrice?.toLocaleString()} ₫
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p><a href="/products" className="btn btn-primary btn-lg">Xem Thêm</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="colorlib-product">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2 text-center colorlib-heading">
                            <h2>Sản Phẩm Mới Về Hàng</h2>
                        </div>
                    </div>
                    <div className="row row-pb-md">
                        {newestProducts.map(p => (
                            <div key={p._id} className="col-lg-3 mb-4 text-center">
                                <div className="product-entry border">
                                    <Link to={`/products/${p._id}`} className="prod-img">
                                        <img
                                            src={p.images?.[0]?.url || "/assets/images/no-image.jpg"}
                                            className="img-fluid"
                                            alt={p.name}
                                        />
                                    </Link>
                                    <div className="desc">
                                        <h2>
                                            <Link to={`/products/${p._id}`}>{p.name}</Link>
                                        </h2>
                                        <span className="price">
                                            {p.minPrice?.toLocaleString()} ₫
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p><a href="/products" className="btn btn-primary btn-lg">Xem Thêm</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="colorlib-partner">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
                            <h2>Nhà Cung Cấp</h2>
                        </div>
                    </div>

                    <div className="row">
                        {brands.map(brand => (
                            <div key={brand._id} className="col partner-col text-center">
                                <img
                                    src={brand.img}
                                    className="img-fluid"
                                    alt={brand.name}
                                    title={brand.name}
                                    style={{ maxHeight: 80, objectFit: "contain" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default HomePage;
