import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../Auth/Auth.Type';
import authService from '../../services/Auth/AuthService';
import AuthLayout from '../../components/Auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { correo: '', clave: '' },
  });

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      await authService.login(data);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Bienvenido de vuelta" subtitle="Ingresa a tu cuenta de TodoMotos">
      {error && (
        <div className="bg-red-500/10 text-red-300 border border-red-400 p-3 rounded-lg mb-4 text-sm font-inter">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 font-inter text-white text-[15.5px]"
      >
        {/* input de Correo */}
        <div>
          <label className="block text-sm text-[13.67px] leading-[20px] text-white/90">
            Correo electrónico
          </label>
          <input
            type="email"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="tu@email.com"
            {...register('correo', { required: 'Correo es requerido' })}
            className={`mt-1 block w-full px-3 py-2 rounded border 
              bg-white/5 text-white placeholder-white/60 placeholder:text-[15px] 
              font-normal font-inter transition-all duration-200
              focus:outline-none focus:border-orange-400
              ${errors.correo ? 'border-[#F87171]' : 'border-white/20'}`}
          />
          {errors.correo && (
            <p className="text-[#FCA5A5] text-sm mt-1 italic">{errors.correo.message}</p>
          )}
        </div>

        {/* input de contraseña */}
        <div>
          <label className="block text-sm text-[13.67px] leading-[20px] text-white/90">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Tu contraseña"
              {...register('clave', { required: 'Clave es requerida' })}
              className={`mt-1 block w-full px-3 py-2 pr-10 rounded border 
                bg-white/5 text-white placeholder-white/60 placeholder:text-[15px] 
                font-normal font-inter transition-all duration-200
                focus:outline-none focus:border-orange-400
                ${errors.clave ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-white/70"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.clave && (
            <p className="text-[#FCA5A5] text-sm mt-1 italic">{errors.clave.message}</p>
          )}
        </div>

        {/* Recordarme y Olvidaste contraseña */}
        <div className="flex items-center text-[13.34px] leading-[20px] justify-between text-sm font-normal text-white/80">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox accent-zinc-500 focus:ring-0 focus:outline-none" />
            Recordarme
          </label>
          <a href="#" className="hover:underline text-white/80">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón de iniciar sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white px-4 py-2 rounded-[12px] font-inter text-[15.88px] leading-[24px] font-normal
            bg-[linear-gradient(to_right,_#5B0000_0%,_#FF000C_33%,_#E63900_66%,_#CC2E00_100%)]
            transition-transform duration-300 ease-in-out
            hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed will-change-transform"
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
