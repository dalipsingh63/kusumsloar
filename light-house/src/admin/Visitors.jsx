import React, { useEffect, useState } from "react";
import { getAllVisitors } from "../services/visitorService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#3b82f6","#f97316","#10b981","#facc15","#8b5cf6","#ec4899"];

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [filter, setFilter] = useState("today");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update windowWidth on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const res = await getAllVisitors();
      const data = Array.isArray(res) ? res : res?.data || [];
      setVisitors(data);
    } catch (err) {
      console.error("❌ Error loading visitors", err);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();

  const filteredVisitors = visitors.filter(v => {
    if(!v.createdAt) return false;
    const visitDate = new Date(v.createdAt);
    if(filter==="today") return visitDate.toDateString()===now.toDateString();
    if(filter==="7days") return (now - visitDate)/(1000*60*60*24)<=7;
    if(filter==="month") return visitDate.getMonth()===now.getMonth() && visitDate.getFullYear()===now.getFullYear();
    if(filter==="year") return visitDate.getFullYear()===now.getFullYear();
    return true;
  });

  const liveVisitors = visitors.filter(v => {
    if(!v.createdAt) return false;
    return (now - new Date(v.createdAt))/(1000*60)<=5;
  });

  // Chart Data
  const generateChartData = () => {
    const data = [];
    if(filter==="today" || filter==="7days" || filter==="month") {
      let days = filter==="today"?1:filter==="7days"?7:new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
      for(let i=days-1;i>=0;i--){
        const day = new Date(now);
        if(filter==="month") day.setDate(i+1);
        else day.setDate(now.getDate()-i);
        const dayStr = day.toLocaleDateString("en-US",{month:"short",day:"numeric"});
        const count = visitors.filter(v=>{
          if(!v.createdAt) return false;
          return new Date(v.createdAt).toDateString()===day.toDateString();
        }).length;
        data.push({name: dayStr, visitors: count});
      }
    } else if(filter==="year"){
      for(let m=0;m<12;m++){
        const monthName = new Date(now.getFullYear(),m).toLocaleString("default",{month:"short"});
        const count = visitors.filter(v=>{
          if(!v.createdAt) return false;
          const visitDate = new Date(v.createdAt);
          return visitDate.getMonth()===m && visitDate.getFullYear()===now.getFullYear();
        }).length;
        data.push({name: monthName, visitors: count});
      }
    }
    return data;
  };
  const chartData = generateChartData();

  // Device Pie Data
  const deviceData = [];
  const deviceMap = {};
  filteredVisitors.forEach(v=>{
    const d = v.device || "Unknown";
    deviceMap[d] = (deviceMap[d]||0)+1;
  });
  for(const [key,value] of Object.entries(deviceMap)){
    deviceData.push({name:key,value});
  }

  // Responsive radius
  const innerRadius = windowWidth < 640 ? 40 : 60;
  const outerRadius = windowWidth < 640 ? 60 : 80;
  const legendFontSize = windowWidth < 640 ? 10 : 12;
  const barChartHeight = windowWidth < 640 ? 200 : 250;

  return (
    <div className="p-6 space-y-6">

      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Visitors</h1>
        <div className="flex gap-2 flex-wrap">
          {["today","7days","month","year","all"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter===f ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}>
              {f==="today"?"Today":f==="7days"?"Last 7 Days":f==="month"?"This Month":f==="year"?"This Year":"All"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="text-gray-500 text-sm">Total Visitors</div>
          <div className="text-3xl font-bold text-gray-900">{filteredVisitors.length}</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="text-gray-500 text-sm">🟢 Live Visitors (last 5 min)</div>
          <div className="text-3xl font-bold text-green-600">{liveVisitors.length}</div>
        </div>
      </div>

      {/* Visitors Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-gray-800">Visitors Trend</h2>
        <ResponsiveContainer width="100%" height={barChartHeight}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip />
            <Bar dataKey="visitors" fill="#3b82f6" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Device Donut Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-gray-800">Device Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#3b82f6"
              label
            >
              {deviceData.map((entry,index)=>(
                <Cell key={index} fill={COLORS[index%COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: legendFontSize }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Visitors;
