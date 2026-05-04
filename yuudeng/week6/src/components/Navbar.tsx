import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

interface NavbarProps {
  onMenuClick?: () => void; // 🔹 사이드바 열기 함수 받기
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-[#333337] shadow-md fixed w-full z-20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black dark:text-white"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-[#E63996]"
          >
            돌려돌려 돌림판
          </NavLink>
        </div>
        <div className="flex items-center space-x-6">
          <Search color="gray" className="cursor-pointer" />
          {!accessToken && (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-[#E63996] text-white px-3 py-2 rounded-lg"
              >
                회원가입
              </NavLink>
            </>
          )}
          {accessToken && (
            <div className="flex gap-4">
              <NavLink to="/my" className="flex text-black dark:text-white">
                <span className="font-bold hover:text-blue-500">
                  {me?.data.name}님
                </span>
                <span>&nbsp;반갑습니다.</span>
              </NavLink>
              <button
                className="text-black dark:text-white cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
