import { Search, UserRoundIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div>
      <aside
        className={`bg-white dark:bg-[#333337] fixed ${
          isOpen ? "w-70" : "w-0"
        } h-[calc(100dvh-64px)] z-10 mt-16 overflow-hidden`}
      >
        <div className="flex flex-col justify-between h-full p-8">
          <div>
            <div className="flex gap-2 my-4">
              <Search color="white" />
              <p className="text-white">찾기</p>
            </div>
            <NavLink to={"/my"} className="flex gap-2 my-4">
              <UserRoundIcon color="white" />
              <p className="text-white">마이페이지</p>
            </NavLink>
          </div>
          <button className="text-white">탈퇴하기</button>
        </div>
      </aside>
    </div>
  );
};
