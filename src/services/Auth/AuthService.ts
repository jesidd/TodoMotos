import axios from "axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../../pages/Auth/Auth.Type";
import { getToken, setToken, removeToken, setUseSession } from "./TokenService";

// Crear instancia de Axios
const api = axios.create({
  baseURL: "https://fachamotos-1.onrender.com/api",
});

// Interceptor de solicitud para agregar el token si no es una ruta pública
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    const publicPaths = ["/user/login", "/user/register"]; //rutas pública 
    const isPublic = publicPaths.some((path) => config.url?.includes(path));

    if (token && !isPublic) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      removeToken();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Función para iniciar sesión
const login = async (data: LoginRequest, rememberMe: boolean) => {
  setUseSession(!rememberMe);
  const response = await api.post<AuthResponse>("/user/login", data);
  setToken(response.data.token);
};

// Función para registrarse
const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/user/register", data);
  setToken(response.data.token); // login automático
  return response.data;
};

// Exportación
export default {
  api,
  login,
  register,
};
