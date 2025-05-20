import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { RiTiktokLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";

const Footer: React.FC = () => {
  return (  
    <footer className="w-full bg-black px-4 md:px-16 lg:px-30 py-10 font-Inter text-white text-base">
      <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
          <p className="text-lg font-bold mb-4 text-white">CONTACTO</p>
          <p className="text-gray-300 mb-2">Contáctanos</p>
          <p className="text-gray-300 flex items-center gap-1">
            <TfiEmail />
            <a href="#" className="hover:underline">
              todomotoscol@hotmail.com
            </a>
          </p>
        </div>


        <div>
          <p className="text-lg font-bold mb-4">INFORMACIÓN</p>
          <a href="#" className="block text-gray-300 hover:underline mb-2">PREGUNTAS FRECUENTES (FAQ)</a>
          <a href="#" className="block text-gray-300 hover:underline mb-2">TÉRMINOS Y CONDICIONES</a>
          <a href="#" className="block text-gray-300 hover:underline mb-2">POLÍTICA DE PRIVACIDAD</a>
        </div>


        <div className="md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-bold mb-4">NOSOTROS</p>
            <a href="#" className="block text-gray-300 hover:underline mb-2">QUIÉNES SOMOS</a>
            <a href="#" className="block text-gray-300 hover:underline mb-2">PUBLICIDAD / SPONSORS</a>
          </div>

          <div>
            <p className="text-lg font-bold mb-4">SÍGUENOS</p>
            <div className="flex flex-wrap gap-2 text-xl sm:text-2xl">
              <a href="#" className="hover:text-gray-400"><ImFacebook2 /></a>
              <a href="#" className="hover:text-gray-400"><FaXTwitter /></a>
              <a href="#" className="hover:text-gray-400"><FaWhatsapp /></a>
              <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-400"><FaYoutube /></a>
              <a href="#" className="hover:text-gray-400"><RiTiktokLine /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 text-sm text-gray-400 text-center mt-10">
        <p>Copyright © 2025 TodoMotos</p>
      </div>
    </footer>
  );
};

export default Footer;
