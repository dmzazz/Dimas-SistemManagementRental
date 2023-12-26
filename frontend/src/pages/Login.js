import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Import Icon
import Logo from "../assets/logo.png";
import BackdropLogin from "../assets/backdrop.jpg";

// Import from Material UI
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

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
      console.log(response)
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      navigate("/");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", { username, password });
      localStorage.setItem("token", response.data.accessToken);
      setSuccess("Login Success");
      setTimeout(() => {
        setSuccess(null);
      }, 1000);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const clearMsg = () => {
    setMsg(null);
  };

  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(clearMsg, 3000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  return (
    <>
      {/* Error Username and Password */}
      <div className="absolute top-5 right-10">
        {msg && (
          <Alert variant="filled" severity="error">
            {msg}
          </Alert>
        )}
      </div>

      {/* Success Log9n */}
      <div className="absolute top-5 right-10">
        {success && (
          <Alert variant="filled" severity="success">
            {success}
          </Alert>
        )}
      </div>

      <div className="flex">
        {/* Left */}
        <div className="bg-[#0A2647] w-3/5 h-screen" style={{ backgroundImage: `url(${BackdropLogin})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
          <div className="w-full h-full flex flex-col justify-center p-20 backdrop-blur-sm">
            <h1 className="text-black text-3xl font-bold">Sistem Management Rental</h1>
            <p className="text-black font-medium">Sistem yang dapat mengelola keluar masuknya barang serta monitoring rental</p>
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#29A19C] w-2/5 h-screen flex flex-col justify-center items-center">
          {/* Logo */}
          {/* <img src={Logo} alt="logo" width={50} className="mb-10 rounded-lg"></img> */}

          {/* Form Login */}
          <div className="bg-white w-[400px] h-[300px] flex justify-center items-center rounded-lg shadow-xl">
            <div className="form-login">
              <p className="text-slate-400 text-center">Please log in first to access your account</p>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-50">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-80 border rounded-md pl-10 py-2 my-2 focus:bg-slate-100 focus:outline-none focus:shadow-md"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-50">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-80 border rounded-md pl-10 py-2 my-2 focus:bg-slate-100 focus:outline-none focus:shadow-md"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-[#FF5B22] hover:bg-[#FF9130] w-80 text-white rounded-md py-2 my-2 duration-300">Login</button>
                </div>
              </form>
            </div>
          </div>

          {/* <p className="mt-5">Forgot Your Password? <span className="text-blue-600"><Link>Reset Password</Link></span></p> */}
        </div>
      </div>

      {/* Loading Progress */}
      {/* <div className="absolute inset-x-2/4 inset-y-2/4">
        <Box sx={{ display: "flex", position: "absolute" }}>
          <CircularProgress />
        </Box>
      </div> */}
    </>
  );
};

export default Login;
