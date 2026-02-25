import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await axios.get("http://localhost:3000/api/admin/statistics");
                setUsersCount(statsRes.data.users);
                setReviewsCount(statsRes.data.reviews);
                setProductsCount(statsRes.data.products);
                setOrdersCount(statsRes.data.orders);

                const revenueRes = await axios.get(
                    "http://localhost:3000/api/admin/revenue-by-month"
                );
                setRevenueData(revenueRes.data);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    const chartData = {
        labels: revenueData.map(
            item => `${item.month}/${item.year}`
        ),
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: revenueData.map(item => item.totalRevenue),
                borderColor: "#1E88E5",
                backgroundColor: "rgba(30,136,229,0.1)",
                tension: 0.3,
                pointRadius: 5
            }
        ]
    };


    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (ctx) =>
                        ctx.raw.toLocaleString("vi-VN") + " đ"
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) =>
                        value.toLocaleString("vi-VN") + " đ"
                }
            }
        }
    };


    return (
        <div className="xs-pd-20-10 pd-ltr-20">
            <div className="title pb-20">
                <h2 className="h3 mb-0">Tổng quan</h2>
            </div>
            <div className="row pb-10">
                <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                    <div className="card-box height-100-p widget-style3">
                        <div className="d-flex flex-wrap">
                            <div className="widget-data">
                                <div className="weight-700 font-24 text-dark">{ordersCount}</div>
                                <div className="font-14 text-secondary weight-500">
                                    Đơn hàng
                                </div>
                            </div>
                            <div className="widget-icon">
                                <div className="icon" data-color="#00eccf">
                                    <i className="icon-copy dw dw-calendar1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                    <div className="card-box height-100-p widget-style3">
                        <div className="d-flex flex-wrap">
                            <div className="widget-data">
                                <div className="weight-700 font-24 text-dark">{productsCount}</div>
                                <div className="font-14 text-secondary weight-500">
                                    Sản phẩm
                                </div>
                            </div>
                            <div className="widget-icon">
                                <div className="icon" data-color="#ff5b5b">
                                    <span className="icon-copy ti-heart"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                    <div className="card-box height-100-p widget-style3">
                        <div className="d-flex flex-wrap">
                            <div className="widget-data">
                                <div className="weight-700 font-24 text-dark">{usersCount}</div>
                                <div className="font-14 text-secondary weight-500">
                                    Người dùng
                                </div>
                            </div>
                            <div className="widget-icon">
                                <div className="icon">
                                    <i className="icon-copy fa fa-stethoscope" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                    <div className="card-box height-100-p widget-style3">
                        <div className="d-flex flex-wrap">
                            <div className="widget-data">
                                <div className="weight-700 font-24 text-dark">{ordersCount}</div>
                                <div className="font-14 text-secondary weight-500">
                                    Đánh giá
                                </div>
                            </div>
                            <div className="widget-icon">
                                <div className="icon">
                                    <i className="icon-copy fa fa-stethoscope" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12 mb-20">
                    <div className="card-box">
                        <h4 className="h4 text-blue mb-3">
                            Doanh thu theo tháng
                        </h4>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
