import React from 'react';
import { ArrowLeft } from 'lucide-react';
import logo from "../../components/Header/assests/LogoTodoMotos.svg";
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  const navigate = useNavigate();

  // Función de navegación para el boton de regresar
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#101828] via-black to-[#101828] px-2 sm:px-4">

      {/* Flecha para pantallas medianas y grandes*/}
      <div className="hidden sm:flex absolute top-24 left-6 md:top-28 lg:top-8 z-50">
        <button
          onClick={handleBack}
          className="flex items-center text-white hover:text-white/70 cursor-pointer transition"
        >
          <ArrowLeft size={19} className="text-white/70" />
          <span className="ml-1 text-[14px] md:text-[15px] lg:text-[15px] leading-[20px] font-inter text-white/70">
            Volver al inicio
          </span>
        </button>
      </div>

      {/* Contenedor principal con card de login y flecha para móviles */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 px-2 sm:px-0">

        {/* Flecha visible solo en móviles */}
        <div
          className="flex sm:hidden items-center text-white hover:text-white/70 cursor-pointer transition mb-2"
          onClick={handleBack}
        >
          <ArrowLeft size={19} className="text-white/70" />
          <span className="ml-1 text-[14px] leading-[20px] font-inter text-white/70">
            Volver al inicio
          </span>
        </div>

        {/* Card de login */}
        <div className="bg-white/10 backdrop-blur-md px-5 py-6 rounded-xl shadow-lg w-full border border-white/20">

          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src={logo}
              alt="Logo TodoMotos"
              className="h-[70px] md:h-[80px] object-contain transition-all duration-200"
            />
          </div>

          {/* Título */}
          <h1 className="text-white text-center font-inter text-[25px] md:text-[26px] lg:text-[28px]">
            {title}
          </h1>

          {/* Subtítulo */}
          {subtitle && (
            <p className="text-[13px] md:text-[13.5px] lg:text-[13.7px] leading-[18px] text-center font-inter text-white/70 mb-4">
              {subtitle}
            </p>
          )}

          {/* Contenido del formulario*/}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
