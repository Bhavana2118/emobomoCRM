import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import Header from "../Components/Header";
import SideBar from "../Components/SideBar";

function DashBoard() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="main-container">
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>PROJECTS</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>300</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>SALES</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h1>12</h1>
          </div>
        </div>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>FOLLOW UPS</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>33</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>42</h1>
          </div>
        </div>
        ?
      </div>
    </main>
  );
}

export default DashBoard;
