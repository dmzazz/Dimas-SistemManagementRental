import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Import React Icon
import { BsBoxSeamFill } from "react-icons/bs";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/Login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new currentDate();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:8000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <>
      <div className="w-full h-full">
        <div className="flex">
          <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
            <span className="text-[#29A19C] text-xl font-bold">9</span>
            <p className="text-sm text-[#bbb] font-medium">Total Inventory</p>
          </div>
          <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
            <span className="text-[#489CC1] text-xl font-bold">9</span>
            <p className="text-sm text-[#bbb] font-medium">Total Order</p>
          </div>
          <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
            <span className="text-[#28CC9E] text-xl font-bold">5</span>
            <p className="text-sm text-[#bbb] font-medium">Total Supplier</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
