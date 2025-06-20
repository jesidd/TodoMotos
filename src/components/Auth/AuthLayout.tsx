import React from 'react';
import logo from "../../components/Header/assests/LogoTodoMotos.svg";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#101828] via-black to-[#101828] px-2 sm:px-4">
    <div className="bg-white/10 backdrop-blur-md px-5 py-6 rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm border border-white/20">
      
      {/* Logo */}
      <div className="flex justify-center mb-2">
        <img
          src={logo}
          alt="Logo TodoMotos"
          className="h-[70px] sm:h-[70px] md:h-[80px] object-contain transition-all duration-200"
        />
      </div>

      {/* Título */}
      <h1 className="text-white text-center font-inter text-[25px] md:text-[26px] lg:text-[28px]">
        {title}
      </h1>

      {subtitle && (
        <p className="mb-5 text-[13px] md:text-[13.5px] lg:text-[13.7px] leading-[18px] text-center font-inter text-white/70 mb-4">
          {subtitle}
        </p>
      )}


      {children}
    </div>
  </div>
);

export default AuthLayout;
