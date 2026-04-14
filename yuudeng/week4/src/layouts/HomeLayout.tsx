import { NavLink, Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <div className="h-dvh flex flex-col bg-black">
        <div className="flex justify-between items-center p-4 bg-[#141414]">
          <NavLink to="/" className="text-xl font-bold text-[#E63996]">
            돌려돌려 돌림판
          </NavLink>
          <div className="flex gap-4 text-md">
            <NavLink
              to="/login"
              className="flex bg-black text-white py-2 px-4 rounded-md"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="flex bg-[#E63996] text-white py-2 px-4 rounded-md"
            >
              회원가입
            </NavLink>
          </div>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer>푸터</footer>
      </div>
    </>
  );
};

export default HomeLayout;
