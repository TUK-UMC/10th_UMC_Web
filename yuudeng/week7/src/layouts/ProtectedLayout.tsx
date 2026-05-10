import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/common/Sidebar";
import { useSidebar } from "../hooks/useSidbar";
import { deleteUser } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import UserDeleteConfirmModal from "../components/common/Modal/UserDeleteConfirmModal";

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
  const { isOpen, toggle, open, close } = useSidebar();
  const [isUserDeleteModalOpen, setIsUserDeleteModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      } else {
        open();
      }
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close, open]);

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      alert("회원 탈퇴가 완료되었습니다.");

      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      window.location.href = "/login";
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴 중 문제가 발생했습니다.");
    } finally {
      setIsUserDeleteModalOpen(false);
    }
  };

  if (!accessToken) {
    if (location.pathname.startsWith("/lps/")) {
      return <LoginRequiredRedirect />;
    }

    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#28292E]">
      <Navbar onMenuClick={() => toggle()} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isOpen}
          onClose={close}
          OpenUserDeleteModal={() => setIsUserDeleteModalOpen(true)}
        />
        <main
          className={`flex-1 mt-17 ${isOpen ? "ml-70" : "ml-0"}`}
          onClick={close}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
      {isUserDeleteModalOpen && (
        <UserDeleteConfirmModal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={handleDeleteUser}
          onCancel={() => setIsUserDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};
