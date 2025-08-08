import axios from "axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../../pages/Auth/Auth.Type";
import { getToken, setToken, removeToken, setUseSession } from "./TokenService";

// Crear instancia de Axios
const api = axios.create({
  baseURL: "https://fachamotos-1.onrender.com/api",
});

// Interceptor para agregar token a solicitudes
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    const publicPaths = ["/user/login", "/user/register", "/auth/google", "/auth/facebook-login"];
    const isPublic = publicPaths.some((path) => config.url?.includes(path));

    if (token && !isPublic) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
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

// Función para login normal
const login = async (data: LoginRequest, rememberMe: boolean) => {
  setUseSession(!rememberMe);
  const response = await api.post<AuthResponse>("/user/login", data);
  setToken(response.data.token);
};

// Función para registro
const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/user/register", data);
  setToken(response.data.token); // login automático
  return response.data;
};

// Login con Google
const googleLogin = async (googleAccessToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/google", {
    token: googleAccessToken,
  });
  setToken(response.data.token);
  return response.data;
};

// Login con Facebook
const facebookLogin = async (facebookAccessToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/facebook-login", {
    token: facebookAccessToken,
  });
  setToken(response.data.token);
  return response.data;
};

// Exportación
export default {
  api,
  login,
  register,
  googleLogin,
  facebookLogin,
};
