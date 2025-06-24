import React, { useState, useEffect } from "react";
import logo from "../Header/assests/LogoTodoMotos.svg";
import { Menus } from "./menuData";
import MobMenu from "./MobMenu";
import DesktopMenu from "./DesktopMenu";
import Modal from "../Modal/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { CircleUserRoundIcon } from "lucide-react";

const Header: React.FC = () => {

  const [isScrolled, setIscrolled] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIscrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header
        className={`bg-black fixed top-0 right-0 left-0 z-[999] w-full over h-auto font-Inter text-white
      transition-all duration-300 whitespace-nowrap ${
        isScrolled ? "h-20" : "h-auto"
      }`}
      >
        <div
          className={`transition-all duration-300 items-center ${
            isScrolled
              ? "flex py-2 justify-between px-3 h-auto"
              : "flex justify-center"
          }`}
        >
          {isScrolled && (
            <div className="flex items-center justify-between w-full lg:px-5 lg:pt-1">

            <div className="w-autos gap-30 hidden lg:flex "> 
              <a href="/" className="h-12">
                <img
                  src={logo}
                  alt="Logo TodoMotos"
                  className={`object-cover w-full transition-all duration-300 ${
                    isScrolled && "h-full"
                  }`}
                />
              </a>

              <nav className="lg:flex w-auto items-center gap-5 hidden">
                {Menus.map((menu) => (
                  <DesktopMenu menu={menu} key={menu.name} />
                ))}
              </nav>
            </div>

              <div className="flex lg:hidden w-auto justify-center items-center gap-3">
                <nav className=" flex">
                  <MobMenu Menus={Menus} scrolled={isScrolled} />
                </nav>
              </div>

              <a href="/" className="h-12 lg:hidden">
                <img
                  src={logo}
                  alt="Logo TodoMotos"
                  className={`object-cover w-full transition-all duration-300 ${
                    isScrolled && "h-full"
                  }`}
                />
              </a>

              <div className="flex gap-3 items-center">
                <div
                  className="flex size-auto w-auto lg:w-[18%] items-center cursor-pointer justify-center"
                  onClick={() => setOpenModal(true)}
                >
                  <SearchIcon />
                </div>

                <CircleUserRoundIcon />
              </div>
            </div>
          )}
        </div>

        {!isScrolled && (
          <div className="flex relative flex-wrap w-full h-auto px-5 justify-between items-center py-4.5 lg:py-3 text-base">
            <a href="/" className="block pb-3 w-[80%] mx-[10%]">
              <img
                src={logo}
                alt="Logo TodoMotos"
                className="object-cover w-auto lg:h-30 transition-all mx-auto duration-300"
              />
            </a>

            <div
                className="lg:flex hidden size-auto w-auto items-center cursor-pointer justify-center"
                onClick={() => setOpenModal(true)}
              >
                <SearchIcon />
            </div>

            <nav className="lg:flex w-auto items-center gap-5 hidden">
              {Menus.map((menu) => (
                <DesktopMenu menu={menu} key={menu.name} />
              ))}
            </nav>

            <div className="flex lg:hidden lg:w-[18%] w-auto justify-center items-center gap-3">
              <nav className=" flex">
                <MobMenu Menus={Menus} scrolled={isScrolled} />
              </nav>
            </div>

            <div className="flex gap-2.5 items-center">
              <div
                className="flex lg:hidden size-auto w-auto lg:w-[18%] items-center cursor-pointer justify-center"
                onClick={() => setOpenModal(true)}
              >
                <SearchIcon />
              </div>

              <CircleUserRoundIcon className="text-zinc-100 size-6 cursor-pointer" />
            </div>
          </div>
        )}
      </header>
      {openModal && <Modal onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default Header;
