import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import logo from "../assets/logo.png"

// Import CSS
import "../css/Sidebar.css"

// Import Icon
import { FaHome } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaComputer } from "react-icons/fa6";
import { BsArrowRightCircle } from "react-icons/bs";

const Sidebar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:8000/logout");
      swal({
        title: "Are you sure?",
        text: "You want to Logout?",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((willLogout) => {
        if (willLogout) {
          localStorage.removeItem("token");
          swal("Logout Success", {
            icon: "success",
            buttons: false,
            timer: 500,
          });
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);
  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <FaHome size={22} />,
    },
    {
      path: "/Rental",
      name: "Rental",
      icon: <FaComputer size={22} />,
    },
    {
      path: "/Inventory",
      name: "Inventory",
      icon: <BsBoxSeamFill size={22} />,
    },
    {
      path: "/Order",
      name: "Order",
      icon: <FaSackDollar size={22} />,
    },
    {
      path: "/Supplier",
      name: "Supplier",
      icon: <FaCarSide size={22} />,
    },
  ];
  return (
    <>
      <div className="flex relative">
        <div className={`${isOpen ? "w-[200px]" : "w-16"} bg-[#29A19C] text-white fixed h-[100%] duration-500 border-r-2 rounded-r-xl`}>
          <div className="w-full flex items-center p-5">
            {/* <img src={logo} alt="stocktifity" className={`${!isOpen && "hidden"} w-9 h-9`}></img> */}
            <h1 className={`${!isOpen && "hidden"} logo ml-2`}>Dimas Cell</h1>
            <div className={`${isOpen && "ml-10"} bars block cursor-pointer hover:text-[#000] duration-500`}>
              <BsArrowRightCircle onClick={toggle} size="25px" />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} onClick={item.onClick} style={item.style} className={`flex items-center pt-2.5 pb-2.5 pl-3.5 pr-3.5 gap-4 duration-500 hover:bg-[#489CC1] hover:text-[#000] active:bg-[#0766AD]`}>
              <div key={item.icon} className={`${!isOpen && "ml-2"} icon text-lg`}>
                {item.icon}
              </div>
              <div key={item.name} className={`${!isOpen && "hidden"} text-sm`}>
                {item.name}
              </div>
            </NavLink>
          ))}
          <div
            className="link flex items-center pt-2.5 pb-2.5 pl-3.5 pr-3.5 gap-4 duration-500 hover:bg-[#fff] hover:text-[#000] active:bg-[#0766AD]"
            style={{ position: "absolute", bottom: "20px", width: `${isOpen ? "200px" : "62px"}`, cursor: "pointer" }}
            onClick={Logout}
          >
            <div className="icon text-lg">
              <IoMdLogOut size={22} fill="#D61355" />
            </div>
            <div className={`${!isOpen && "hidden"} font-medium`}>{`Logout`}</div>
          </div>
        </div>
        <main className={`${isOpen ? "ml-[200px]" : "ml-[64px]"} w-screen duration-500`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Sidebar;
