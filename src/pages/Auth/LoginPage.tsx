import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../Auth/Auth.Type';
import authService from '../../services/Auth/AuthService';
import AuthLayout from '../../components/Auth/AuthLayout';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="bg-red-200 text-red-800 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-white font-medium">Correo electrónico</label>
          <input
            type="email" placeholder="tu@email.com"
            {...register('correo', { required: 'Correo es requerido' })}
            className={`mt-1 block w-full px-3 py-2 text-white border rounded ${
              errors.clave ? 'border-red-500' : 'border-white/30 bg-white/10 '
            }`}
          />
          {errors.correo && (
            <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-white font-medium">Contraseña</label>
          <input
            type="password" placeholder="Tu contraseña"
            {...register('clave', { required: 'Clave es requerida' })}
            className={`mt-1 block w-full px-3 py-2 border text-white rounded ${
              errors.clave ? 'border-red-500' : 'border-white/30 bg-white/10 '
            }`}
          />
          {errors.clave && (
            <p className="text-red-500 text-sm mt-1">{errors.clave.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
