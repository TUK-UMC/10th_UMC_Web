import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/movies/detail/");

  return (
    <nav className={`p-4 ${isDetailPage ? "bg-black" : "bg-white"}`}>
      <NavLink
        to="/"
        className={({ isActive }) => `p-2 
      ${isDetailPage ? "text-gray-200" : isActive ? "text-[#b2dab1]" : "text-gray-600"} `}
      >
        홈
      </NavLink>
      <NavLink
        to="movies/popular"
        className={({ isActive }) => `p-2 
      ${isDetailPage ? "text-gray-200" : isActive ? "text-[#b2dab1]" : "text-gray-600"} `}
      >
        인기 영화
      </NavLink>
      <NavLink
        to="movies/now_playing"
        className={({ isActive }) => `p-2 
      ${isDetailPage ? "text-gray-200" : isActive ? "text-[#b2dab1]" : "text-gray-600"} `}
      >
        상영 중
      </NavLink>
      <NavLink
        to="movies/top_rated"
        className={({ isActive }) => `p-2 
      ${isDetailPage ? "text-gray-200" : isActive ? "text-[#b2dab1]" : "text-gray-600"} `}
      >
        평점 높은
      </NavLink>
      <NavLink
        to="movies/upcoming"
        className={({ isActive }) => `p-2 
      ${isDetailPage ? "text-gray-200" : isActive ? "text-[#b2dab1]" : "text-gray-600"} `}
      >
        개봉 예정
      </NavLink>
    </nav>
  );
};

export default Navbar;
