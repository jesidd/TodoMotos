import { useEffect } from "react";
import authService from "../../services/Auth/AuthService";
import { useNavigate } from "react-router-dom";
import facebookIcon from "../../assets/facebook.svg";

// Tipado global del SDK de Facebook
declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: {
          authResponse?: {
            accessToken: string;
          };
          status: string;
        }) => void,
        options?: { scope: string }
      ) => void;
    };
    fbAsyncInit: () => void;
  }
}

const FacebookLoginButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Espera a que el SDK se cargue completamente
    const loadFacebookSDK = () => {
      return new Promise<void>((resolve) => {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: "996317195820918",
            cookie: true,
            xfbml: true,
            version: "v19.0", // Versión correcta como string
          });
          resolve();
        };

        if (!document.getElementById("facebook-jssdk")) {
          const script = document.createElement("script");
          script.id = "facebook-jssdk";
          script.src = "https://connect.facebook.net/en_US/sdk.js";
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
        }
      });
    };

    loadFacebookSDK();
  }, []);

  const handleFBResponse = (response: {
    authResponse?: { accessToken: string };
    status: string;
  }) => {
    const accessToken = response.authResponse?.accessToken;

    if (!accessToken) {
      console.error("No se obtuvo el token de acceso de Facebook");
      return;
    }

    authService
      .facebookLogin(accessToken)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error al autenticar con el backend:", err);
      });
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK no está disponible");
      return;
    }

    window.FB.login(handleFBResponse, {
      scope: "public_profile,email",
    });
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      className="flex items-center justify-center gap-2 border border-white/20 rounded-lg py-1.5 text-white/80 text-[13px] bg-white/10 hover:bg-white/20 transition-all duration-300"
    >
      <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
      Facebook
    </button>
  );
};

export default FacebookLoginButton;
