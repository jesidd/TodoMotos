import React from "react";
import logo from "../Header/assests/LogoTodoMotos.svg";
import lupa from "./assests/lupa.svg"
import './style.css'

const Header: React.FC = () => {
  return (
    <header className="bg-black w-full over box-border h-auto font-Inter text-white">

      <div className=" h-1/3 flex justify-center content-center box-border pt-2">
        <a href="#" className="size-auto"><img src={logo} alt="Logo TodoMotos" className=" w-max h-36" /></a>
      </div>


      <div className="w-full h-[40px] grid grid-cols-3 py-[30px] px-[20px] content-center justify-items-center text-base">
        <div className="flex size-4 justify-star w-60 items-center self-center justify-self-end">
            <img src={lupa} alt="Icono lupa"  className="size-5"/>
        </div>

        <nav className="flex w-full justify-center ">
          <ul className="flex items-center justify-around  w-[100%]">
            <li className="size-auto after:content-[''] after:bg-[#3F444B] after:w-max after:h-[3px] after:absolute after:left-0"><a className="a-estilo" href="#">Inicio</a></li>
            <li className=" "><a className="a-estilo" href="#">Contacto</a></li>
            <li className=" "><a className="a-estilo" href="#">Ranking de Motos</a></li>
            <li className=" "><a className="a-estilo" href="#">Blog</a></li>
          </ul>
        </nav>

        <nav className="flex w-full h-full h-[100%]">
            <ul className="flex items-center justify-center gap-5 w-full">
                <li className=" "><a className="a-estilo" href="#">Creá tu cuenta</a></li>
                <li className=" "><a className="a-estilo" href="#">Ingresá</a></li>
            </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;
