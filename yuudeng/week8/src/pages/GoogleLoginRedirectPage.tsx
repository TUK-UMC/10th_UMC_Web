import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useAuth } from "../context/AuthContext";

export const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    const redirectPath = sessionStorage.getItem("redirectPath") || "/";
    sessionStorage.removeItem("redirectPath");

    if (accessToken) {
      setTokens(accessToken, refreshToken);
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, setTokens]);

  return <div>구글 로그인 리다이렉 화면</div>;
};
