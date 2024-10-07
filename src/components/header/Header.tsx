"use client";

import DropDown from "../dropdown/Dropdown";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";

import logo from "../../assets/images/logo/mainlogo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  //IMPORTS
  const navigate = useNavigate();

  //HANDLERS
  const handleCartIconClick = () => {
    navigate("/cart");
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex md:px-[130px] items-center justify-between p-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              alt=""
              src={logo}
              className="h-[28px] w-[80px] md:h-[48px] md:w-[134px]"
            />
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end items-center">
          <div className="flex items-center mx-2 md:gap-5 gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E8E8E84A] hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
              onClick={handleCartIconClick}
            >
              <ShoppingBagIcon className="md:size-5 size-3 fill-black" />
            </div>
            <div className="w-px h-8 bg-gray-300 mx-2" />{" "}
            <div className="flex items-center justify-center w-8 h-8 rounded-full  transition-colors duration-200">
              <DropDown />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
