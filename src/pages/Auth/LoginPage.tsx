import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../Auth/Auth.Type';
import authService from '../../services/Auth/AuthService';
import AuthLayout from '../../components/Auth/AuthLayout';
import { Eye, EyeOff, X } from 'lucide-react';
import googleIcon from '../../assets/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import type { TokenResponse } from '@react-oauth/google';
import FacebookLoginButton from '../../components/Auth/FacebookLoginButton';
import { AxiosError } from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); //para manejar el recordarme


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { correo: '', clave: '' },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const googleAccessToken = tokenResponse.access_token;

        const auth = await authService.googleLogin(googleAccessToken);

        localStorage.setItem("token", auth.token);
        navigate("/home");
      } catch (err) {
        console.error("Error al iniciar sesión con Google:", err);
        setError("Error al iniciar sesión con Google");
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      setError("Error al iniciar sesión con Google");
    },
  });


  const onSubmit = async (data: LoginRequest) => {
  setIsLoading(true);
  try {
    await authService.login(data, rememberMe);
    navigate('/home');
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ message?: string }>;
    const status = axiosErr.response?.status;
    const message = axiosErr.response?.data?.message;

    if (status === 401) {
      setError('Correo o contraseña incorrectos.');
    } else if (status === 500) {
      setError('Error del servidor. Intenta más tarde.');
    } else if (message) {
      setError(message);
    } else if (axiosErr.message) {
      setError(axiosErr.message);
    } else {
      setError('Error desconocido al iniciar sesión.');
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <AuthLayout title="Bienvenido de vuelta" subtitle="Ingresa a tu cuenta de TodoMotos">
  
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
              focus:outline-none focus:border-orange-500
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
                focus:outline-none focus:border-orange-500
                ${errors.clave ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
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
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="form-checkbox h-[14px] w-[14px] bg-transparent border-white/30 rounded
            focus:ring-orange-500 focus:ring-2"/>
            Recordarme
          </label>
          <a href="#" className=" text-orange-400 hover:underline transition-all duration-300">¿Olvidaste tu contraseña?</a>
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


        {/*Mostrar errores*/}
        {error && (
          <div className="relative bg-red-500/10 text-[12px] md:text-[13.5px] lg:text-[13.7px] text-red-300 border border-red-400 p-2 rounded-lg mb-4 font-inter">
            <button
              onClick={() => setError(null)}
              className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-red-300 hover:text-red-500 transition"
            >
              <X size={16} strokeWidth={2} />
            </button>
            {error}
          </div>
        )}


        {/* Redes sociales */}
        <div className="my-4">
          <div className="flex items-center justify-center relative">
            <span className="absolute inset-x-0 h-px bg-white/10" />
            <span className="relative z-10 px-2 text-xs text-white/60">o continúa con</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => googleLogin()} 
              className="flex items-center justify-center gap-2 border border-white/20 rounded-lg py-2 text-white/80 text-[13px] bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <img src={googleIcon} alt="Google" className="w-4 h-4" />
              Google
            </button>

            <FacebookLoginButton />

          </div>
        </div>

        {/* Registro */}
        <p className="text-white/60 text-[12px] md:text-[13.5px] lg:text-[13.7px] text-center mt-5">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-orange-400 hover:underline f transition-all duration-300">
            Regístrate aquí
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
