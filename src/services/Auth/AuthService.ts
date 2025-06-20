import axios from "axios";
import type { LoginRequest, AuthResponse } from "../../pages/Auth/Auth.Type";
import { getToken, setToken, removeToken } from "./TokenService";

// Crear instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Interceptor de solicitud y agregar token si no es ruta pública
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    const publicPaths = ["/auth/signin"];
    const isPublic = publicPaths.some((path) => config.url?.includes(path));

    if (token && !isPublic) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta y si token es inválido, redirige a login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      removeToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Función para iniciar sesión
const login = async (data: LoginRequest) => {
  const response = await api.post<AuthResponse>("/auth/signin", data);
  setToken(response.data.token);
};

// Exportación
export default {
  api,
  login,
};
