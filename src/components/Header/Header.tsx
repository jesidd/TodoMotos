import React from "react";
import logo from "../Header/assests/LogoTodoMotos.svg";
import lupa from "./assests/lupa.svg"
import { Menus } from "./menuData";
import MobMenu from "./MobMenu";
import DesktopMenu from "./DesktopMenu";

const Header: React.FC = () => {
  return (
    <header className="bg-black fixed w-full over h-auto font-Inter text-white">

      <div className=" h-1/3 flex justify-center content-center  pt-2">
        <a href="#" className="size-auto"><img src={logo} alt="Logo TodoMotos" className=" w-max h-36" /></a>
      </div>


      <nav className="flex w-full h-[40px] px-9 md:px-0 justify-between md:justify-around items-center py-[34px] text-base whitespace-nowrap">

        <div className="flex size-4 w-auto lg:w-[18%] items-center justify-center  ">
          <img src={lupa} alt="Icono lupa" className="cursor-pointer size-5" />
        </div>

        <ul className="lg:flex w-auto items-center gap-5 hidden">
          {Menus.map((menu) => (
            <DesktopMenu menu={menu} key={menu.name} />
          ))}
        </ul>

        <div className="flex lg:w-[18%] w-[30%] justify-center gap-3">
          <ul className="flex md:gap-5 items-center w-auto">
            <li className="hidden md:block relative cursor-pointer after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%] after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full "><span className="py-[15px] mx-[13px] block" >Creá tu cuenta</span></li>
            <li className="relative cursor-pointer after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%] after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full "><span className="py-[15px] mx-[13px] block" >Ingresá</span></li>
          </ul>
          <div className="lg:hidden flex">
            <MobMenu Menus={Menus} />
          </div>
        </div>
      </nav>

    </header>
  );
};

export default Header;
