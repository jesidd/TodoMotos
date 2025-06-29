import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/Auth/AuthService';
import { AxiosError } from 'axios';
import AuthLayout from '../../components/Auth/AuthLayout';
import { Eye, EyeOff, X } from 'lucide-react';
import type { RegisterRequest } from '../Auth/Auth.Type';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterRequest>({
    defaultValues: {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: '',
      aceptaTerminos: false,
      recibirNoticias: false,
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);

    try {
      await authService.register(data);
      navigate('/home');
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const message = error?.response?.data?.message;
      const status = error?.response?.status;

      if (status === 409) {
        setError('El correo ya está registrado.');
      } else if (status === 500) {
        setError('Error del servidor. Intenta más tarde.');
      } else if (message) {
        setError(message);
      } else {
        setError('Error desconocido al registrarse.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Únete a TodoMotos" subtitle="Crea tu cuenta y forma parte de nuestra comunidad">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-inter text-white text-[14px]">

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/90 text-[13px]">Nombre</label>
            <input 
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Tu nombre"  
              {...register('nombre', { required: 'Nombre es requerido' })}
              className={`mt-1 block w-full px-2 py-2 rounded border bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px] focus:outline-none focus:border-orange-500 ${errors.nombre ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            {errors.nombre && (
              <p className="text-[#FCA5A5] text-[11px] mt-[2px] italic">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <label className="block text-white/90 text-[13px]">Apellido</label>
            <input 
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Tu apellido"  
              {...register('apellido', { required: 'Apellido es requerido' })}
              className={`mt-1 block w-full px-2 py-2 rounded border bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px] focus:outline-none focus:border-orange-500 ${errors.apellido ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            {errors.apellido && (
              <p className="text-[#FCA5A5] text-[11px] mt-[2px] italic">{errors.apellido.message}</p>
            )}
          </div>
        </div>

        {/* Correo */}
        <div>
          <label className="block text-white/90 text-[13px]">Correo electrónico</label>
          <input
            type="email"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="tu@email.com"
            {...register('correo', { required: 'Correo es requerido' })}
            className={`mt-1 block w-full px-2 py-2 rounded border bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px] focus:outline-none focus:border-orange-500 ${errors.correo ? 'border-[#F87171]' : 'border-white/20'}`}
          />
          {errors.correo && (
            <p className="text-[#FCA5A5] text-[11px] mt-[2px] italic">{errors.correo.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-white/90 text-[13px]">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Crea una contraseña segura "
              {...register('contrasena', { required: 'Clave es requerida' })}
              className={`mt-1 block w-full px-2 py-2 pr-8 rounded border bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px] focus:outline-none focus:border-orange-500 ${errors.contrasena ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.contrasena && (
            <p className="text-[#FCA5A5] text-[11px] mt-[2px] italic">{errors.contrasena.message}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="block text-white/90 text-[13px]">Confirmar contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirma tu contraseña"
              {...register('confirmarContrasena', {
                required: 'Debes confirmar la contraseña',
                validate: value => value === getValues('contrasena') || 'Las contraseñas no coinciden',
              })}
              className={`mt-1 block w-full px-2 py-2 pr-8 rounded border bg-white/5 text-white text-[14px] placeholder-white/60 placeholder:text-[14px] focus:outline-none focus:border-orange-500 ${errors.confirmarContrasena ? 'border-[#F87171]' : 'border-white/20'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmarContrasena && (
            <p className="text-[#FCA5A5] text-[11px] mt-[2px] italic">{errors.confirmarContrasena.message}</p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 text-white/80 text-[13px]">
          <label className="flex items-start gap-2 leading-snug text-wrap break-words">
            <input type="checkbox" {...register('aceptaTerminos', { required: true })} className="checkbox mt-[2px]" />
            <span>
              Acepto los{' '}
              <a href="#" className="text-orange-400 underline">términos y condiciones</a>{' '}
              y la{' '}
              <a href="#" className="text-orange-400 underline">política de privacidad</a>
            </span>
          </label>
          {errors.aceptaTerminos && (
            <p className="text-red-400 text-[12px] italic">Debes aceptar los términos</p>
          )}

          <label className="flex items-start gap-2">
            <input type="checkbox" {...register('recibirNoticias')} className="checkbox mt-[2px]" />
            <span>Quiero recibir noticias y promociones especiales de TodoMotos</span>
          </label>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white px-3 py-2 rounded-[10px] font-inter text-[15.5px]
            bg-[linear-gradient(to_right,_#5B0000,_#FF000C,_#E63900,_#FF3801)]
            transition-transform duration-300 ease-in-out hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registrando...' : 'Crear cuenta'}
        </button>

        {/* Error */}
        {error && (
          <div className="relative bg-red-500/10 text-[13px] text-red-300 border border-red-400 p-2 rounded-lg font-inter">
            <button onClick={() => setError(null)} className="absolute top-2 right-2 text-red-300 hover:text-red-500">
              <X size={16} />
            </button>
            {error}
          </div>
        )}

        {/* Link a login */}
        <p className="text-white/60 text-[13px] text-center mt-5">
          ¿Ya tienes cuenta? <a href="/login" className="text-orange-400 hover:underline">Inicia sesión aquí</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
