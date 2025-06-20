export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export interface UpdateUserRequest {
  id: number;
  nombre: string;
  correo: string;
  claveHash: string;
}
