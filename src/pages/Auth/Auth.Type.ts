import type {Usuario} from '../../Types/Usuario'
// Auth Types
export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginRequest {
  correo: string;
  clave: string;
}

export interface RegisterRequest{
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  aceptaTerminos: boolean;
  recibirNoticias: boolean;
}
