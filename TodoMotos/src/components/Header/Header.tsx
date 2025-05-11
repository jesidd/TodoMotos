import React from "react";
import logo from "../../assets/Logo_TodoMotos.svg";
import lupa from "./assests/lupa.svg"

const AboutUs: React.FC = () => {
  return (
    <header className="bg-black w-full h-auto font-inter text-white">

      <div className=" h-1/3 flex justify-center content-center pt-2">
        <img src={logo} alt="Logo TodoMotos" className=" w-1/2 size-26" />
      </div>


      <div className="w-full h-11 grid grid-cols-3 content-center justify-items-center">
        <div className="flex size-4 justify-star w-24">
            <img src={lupa} alt="Icono lupa"  className="size-3"/>
        </div>

        <nav>
          <ul className="flex justify-content w-auto text-[10px]">
            <li className=" px-[15px]">Inicio</li>
            <li className=" px-[15px]">Contacto</li>
            <li className=" px-[15px]">Ranking de Motos</li>
            <li className=" px-[15px]">Blog</li>
          </ul>
        </nav>

        <nav>
            <ul className="flex justify-content w-auto text-[10px]">
                <li className="px-[15px]">Creá tu cuenta</li>
                <li className="px-[15px]">Ingresá</li>
            </ul>
        </nav>
      </div>

    </header>
  );
};

export default AboutUs;
