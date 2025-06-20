import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../Auth/Auth.Type';
import authService from '../../services/Auth/AuthService';
import AuthLayout from '../../components/Auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import googleIcon from '../../pages/Auth/assests/google.svg';
import facebookIcon from '../../pages/Auth/assests/facebook.svg';

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
        <div className="bg-red-500/10 text-[12px] md:text-[13.5px] lg:text-[13.7px] text-red-300 border border-red-400 p-2 rounded-lg mb-4 font-inter">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 font-inter text-white text-[14px]"
      >
        {/* Correo */}
        <div>
          <label className="block text-[12px] md:text-[13.5px] lg:text-[13.7px] leading-[18px] text-white/90">
            Correo electrónico
          </label>
          <input
            type="email"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="tu@email.com"
            {...register('correo', { required: 'Correo es requerido' })}
            className={`mt-1 block w-full px-2 py-2 rounded border 
              bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px] 
              focus:outline-none focus:border-orange-400
              ${errors.correo ? 'border-[#F87171]' : 'border-white/20'}`}
          />
          {errors.correo && (
            <p className="text-[#FCA5A5] text-[11px] md:text-[12px] lg:text-[12.5px] mt-[2px] leading-tight italic">
              {errors.correo.message}
            </p>

          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block  text-[12px] md:text-[13.5px] lg:text-[13.7px] leading-[18px] text-white/90">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Tu contraseña"
              {...register('clave', { required: 'Clave es requerida' })}
              className={`mt-1 block w-full px-2 py-2 pr-8 rounded border 
                bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px]
                focus:outline-none focus:border-orange-400
                ${errors.clave ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.clave && (
            <p className="text-[#FCA5A5] text-[11px] md:text-[12px] lg:text-[12.5px] mt-[2px] leading-tight italic">
              {errors.clave.message}
            </p>
          )}
        </div>

        {/* Recordarme */}
        <div className="flex items-center text-[12px] md:text-[13.5px] lg:text-[13.7px] justify-between text-white/80">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox h-[14px] w-[14px] accent-zinc-500" />
            Recordarme
          </label>
          <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        {/* Botón iniciar */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white px-3 py-2 rounded-[10px] font-inter text-[15.5px]
            bg-[linear-gradient(to_right,_#5B0000,_#FF000C,_#E63900,_#FF3801)]
            transition-transform duration-300 ease-in-out hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>

        {/* Redes sociales */}
        <div className="my-4">
          <div className="flex items-center justify-center relative">
            <span className="absolute inset-x-0 h-px bg-white/10" />
            <span className="relative z-10 px-2 text-xs text-white/60">o continúa con</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-white/20 rounded-lg py-2 text-white/80 text-[13px] hover:bg-white/5 transition-colors"
            >
              <img src={googleIcon} alt="Google" className="w-4 h-4" />
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-white/20 rounded-lg py-1.5 text-white/80 text-[13px] hover:bg-white/5 transition-colors"
            >
              <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
              Facebook
            </button>
          </div>
        </div>

        {/* Registro */}
        <p className="text-white/60 text-[12px] md:text-[13.5px] lg:text-[13.7px] text-center mt-5">
          ¿No tienes cuenta?{' '}
          <a href="/registro" className="text-orange-500 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
