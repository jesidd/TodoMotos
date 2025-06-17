import React from 'react';
import logo from "../../components/Header/assests/LogoTodoMotos.svg";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#101828] via-black to-[#101828] px-4 sm:px-6 lg:px-8">
    <div className="bg-white/10 backdrop-blur-md px-6 py-8 sm:px-8 sm:py-10 rounded-2xl shadow-lg w-full max-w-sm border border-white/20">
      {/* Logo */}
      <div className="flex justify-center mb-5 mt-0">
        <a href="#">
          <img
            src={logo}
            alt="Logo TodoMotos"
            className="h-22 object-contain"
          />
        </a>
      </div>

      <h1 className="text-3xl mb-2 text-white text-center font-inter">{title}</h1>
        {subtitle && (
        <p className="text-sm text-center text-[15px] leading-[24px] font-inter text-white/70 mb-6">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  </div>
);

export default AuthLayout;
