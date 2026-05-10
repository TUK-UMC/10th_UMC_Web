import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"login"} replace />;
  }
  return (
    <div className="h-dvh flex flex-col">
      <NavLink to="/">홈</NavLink>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};
