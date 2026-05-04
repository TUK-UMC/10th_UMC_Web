import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/Sidebar";

const LoginRequiredRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownLoginAlert = useRef(false);

  useEffect(() => {
    if (!hasShownLoginAlert.current) {
      hasShownLoginAlert.current = true;
      alert("로그인이 필요한 서비스입니다.");
    }

    navigate("/login", {
      replace: true,
      state: {
        from: {
          pathname: location.pathname,
          search: location.search,
        },
      },
    });
  }, [location.pathname, location.search, navigate]);

  return null;
};

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!accessToken) {
    if (location.pathname.startsWith("/lps/")) {
      return <LoginRequiredRedirect />;
    }

    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#28292E]">
      <Navbar onMenuClick={() => setIsOpen((prev) => !prev)} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} />
        <main className={`flex-1 mt-17 ${isOpen ? "ml-70" : "ml-0"}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
