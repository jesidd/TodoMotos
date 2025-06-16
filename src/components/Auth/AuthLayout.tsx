import React from 'react';
import logo from "../../components/Header/assests/LogoTodoMotos.svg";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#101828] via-black to-[#101828]">
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
      {/* Logo */}
      <div className="flex justify-center py-4">
        <a href="#">
          <img
            src={logo}
            alt="Logo TodoMotos"
            className="h-20 object-contain"
          />
        </a>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-white text-center">{title}</h1>
      {subtitle && <p className="text-sm text-center text-white mb-4">{subtitle}</p>}
      {children}
    </div>
  </div>
);

export default AuthLayout;
