import type {Usuario} from '../../types/Usuario'
// Auth Types
export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginRequest {
  correo: string;
  clave: string;
}
