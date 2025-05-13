import React from "react";
import logo from "../Header/assests/LogoTodoMotos.svg";
import lupa from "./assests/lupa.svg"

const Header: React.FC = () => {
  return (
    <header className="bg-black w-full h-auto font-inter text-white">

      <div className=" h-1/3 flex justify-center content-center pt-2">
        <a href="#" className="size-auto"><img src={logo} alt="Logo TodoMotos" className=" w-max h-28" /></a>
      </div>


      <div className="w-full box-border h-auto grid grid-cols-3 content-center justify-items-center text-xs">
        <div className="flex size-4 py-[20px] justify-star w-60 justify-self-end">
            <img src={lupa} alt="Icono lupa"  className="size-4"/>
        </div>

        <nav>
          <ul className="flex justify-content w-auto ">
            <li className=" px-[15px] py-[20px] size-auto after:content-[''] after:bg-[#3F444B] after:w-max after:h-[3px] after:absolute after:left-0"><a href="#">Inicio</a></li>
            <li className=" px-[15px] py-[20px]"><a href="#">Contacto</a></li>
            <li className=" px-[15px] py-[20px]"><a href="#">Ranking de Motos</a></li>
            <li className=" px-[15px] py-[20px]"><a href="#">Blog</a></li>
          </ul>
        </nav>

        <nav className="col-start-3 grid grid-cols-3 content-start">
            <ul className="flex justify-content w-auto">
                <li className="px-[10px] py-[20px]"><a href="#">Creá tu cuenta</a></li>
                <li className="px-[15px] py-[20px]"><a href="#">Ingresá</a></li>
            </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;
