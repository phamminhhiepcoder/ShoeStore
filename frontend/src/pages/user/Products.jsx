import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const formatVND = (n) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);


    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [pRes, bRes, sRes, cRes] = await Promise.all([
                    axios.get("http://localhost:3000/api/products"),
                    axios.get("http://localhost:3000/api/brands"),
                    axios.get("http://localhost:3000/api/sizes"),
                    axios.get("http://localhost:3000/api/colors")
                ]);

                setProducts(pRes.data);
                setBrands(bRes.data);
                setSizes(sRes.data);
                setColors(cRes.data);

            } catch (err) {
                console.error("API error", err);
            }
        };

        fetchAll();
    }, []);

    const filteredProducts = products.filter(p => {
        let ok = true;

        if (selectedBrand) {
            ok = ok && p.brandId?._id === selectedBrand;
        }

        if (selectedSize) {
            ok = ok && p.size?.includes(selectedSize);
        }

        if (selectedColor) {
            ok = ok && p.color?.includes(selectedColor);
        }

        return ok;
    });

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="bread"><span><a href="/">Trang chủ</a></span> / <span>Sản Phẩm</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="breadcrumbs-two">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="breadcrumbs-img" style={{ backgroundImage: "url('/assets/images/cover-img-1.jpg')" }}>
                                <h2>Sản Phẩm</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="colorlib-product">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-xl-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="side border mb-1">
                                        <h3>Thương hiệu</h3>
                                        <ul>
                                            {brands.map(b => (
                                                <li key={b._id}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedBrand(b._id);
                                                        }}
                                                        style={{
                                                            fontWeight: selectedBrand === b._id ? "bold" : "normal",
                                                            color: selectedBrand === b._id ? "#616161" : ""
                                                        }}
                                                    >
                                                        {b.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="side border mb-1">
                                        <h3>Size</h3>
                                        <ul>
                                            {sizes.map(s => (
                                                <li key={s._id}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedSize(s.name);
                                                        }}
                                                        style={{
                                                            fontWeight: selectedSize === s.name ? "bold" : "normal"
                                                        }}
                                                    >
                                                        {s.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <div className="side border mb-1">
                                        <h3>Màu</h3>
                                        <ul>
                                            {colors.map(c => (
                                                <li key={c._id}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedColor(c.name);
                                                        }}
                                                        style={{
                                                            fontWeight: selectedColor === c.name ? "bold" : "normal"
                                                        }}
                                                    >
                                                        {c.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <div className="side border mb-3">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => {
                                                setSelectedBrand(null);
                                                setSelectedSize(null);
                                                setSelectedColor(null);
                                            }}
                                        >
                                            Xóa bộ lọc
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-xl-9">
                            <div className="row row-pb-md">
                                {filteredProducts.map((item) => (
                                    <div key={item._id} className="col-lg-4 mb-4 text-center">
                                        <div className="product-entry border">
                                            <Link to={`/products/${item._id}`} className="prod-img">
                                                <img
                                                    src={item.images?.[0]?.url || "/assets/images/no-image.png"}
                                                    className="img-fluid"
                                                    alt={item.name}
                                                    style={{ height: "280px", objectFit: "cover" }}
                                                />
                                            </Link>

                                            <div className="desc">
                                                <h2>
                                                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                                                </h2>

                                                <span className="price">
                                                    {item.minPrice ? formatVND(item.minPrice) : "Chưa cập nhật giá"}
                                                </span>

                                                <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                                                    Thương hiệu: <b>{item.brandId?.name}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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

export default Products;
