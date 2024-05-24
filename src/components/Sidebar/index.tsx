import React from "react";
import Logo from "../../assets/images/Taiyo-logo.png";
import { useLocation, useNavigate } from "react-router";
import { animator } from "chart.js";




const Sidebar = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isContactMenu =
    location.pathname === "/" || location.pathname === "/contact-form";

  const isLineChartMenu = location.pathname === "/line-chart";
  const isMapMenu = location.pathname === "/leaflet-map";

  return (
    <>
      <div className="w-full flex flex-col bg-gradient-to-l
from-purple-200 to-yellow-500">
        <div className="w-full h-15 flex justify-center p-2 border-b-2 border-red-400">
          <div className="flex w-full  item-center">
            <div className="w-[45%]">
              <div className="w-40 h-21 animate-pulse">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-full h-full object-contain animate-bounce"
                />
              </div>
            </div>

            <div>
              <h1 className="text-5xl bold py-3 text-black hover:text-white animate-pulse">
                {isContactMenu
                  ? "Contact"
                  : isLineChartMenu
                  ? "Line Chart"
                  : isMapMenu
                  ? "Leaflat map"
                  : "Contact-Edit-Form"}
              </h1>
            </div>
          </div>
        </div>
        {/* Sidebar */}

        <div className="flex h-screen bg-gradient-to-b
from-yellow-200 to-green-300 " >
          <div className="w-40 border-r-2 h-screen  border-purple-500">
            <div className="flex flex-col gap-2">
              <p
                className={`p-2  w-full text-center text-2xl text-black hover:text-white cursor-pointer hover:bg-red-300 animate-pulse   ${
                  isContactMenu && "bg-blue-300"
                }`}
                onClick={() => navigate("/")}
              >
                Contact
              </p>
              <p
                className={`p-2  w-full text-center text-2xl text-black hover:text-white cursor-pointer hover:bg-red-300 animate-pulse ${
                  isLineChartMenu && "bg-purple-300"
                }`}
                onClick={() => navigate("/line-chart")}
              >
                Line-Chart
              </p>
              <p
                className={`p-2  w-full text-center text-2xl text-black hover:text-white cursor-pointer hover:bg-red-300 animate-pulse ${
                  isMapMenu && "bg-green-300"
                }`}
                onClick={() => navigate("/leaflet-map")}
              >
                Leflet-Map
              </p>
            </div>
          </div>

          {/* childern components */}
          <div className="w-full p-4 flex justify-center ">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
