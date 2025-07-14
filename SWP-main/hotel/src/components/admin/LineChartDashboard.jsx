import React, { useEffect, useState } from "react";
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import axios from "axios";

const LineChartDashboard = () => {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const fetchData = () => {
        const params = {};
        if (month) params.month = month;
        if (year) params.year = year;

        axios.get("http://localhost:8080/api/chart/revenue/filter", { params })
            .then((res) => setData(res.data))
            .catch((err) => console.error("Lỗi load dữ liệu doanh thu:", err));
    };

    useEffect(() => {
        fetchData();
    }, [month, year]);

    return (
        <div>
            {/* Filter */}
            <div className="d-flex mb-3">
                <select className="form-control mr-2" onChange={(e) => setMonth(e.target.value)} value={month}>
                    <option value="">Chọn tháng</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                    ))}
                </select>
                <select className="form-control" onChange={(e) => setYear(e.target.value)} value={year}>
                    <option value="">Chọn năm</option>
                    {[2023, 2024, 2025].map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Chart */}
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="doanhThu" stroke="#4CAF50" strokeWidth={2} />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartDashboard;