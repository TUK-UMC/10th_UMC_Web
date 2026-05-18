import { Search, UserRoundIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  OpenUserDeleteModal?: () => void;
}

export const Sidebar = ({
  isOpen,
  onClose,
  OpenUserDeleteModal,
}: SidebarProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const updateBodyOverflow = () => {
      const isMobile = window.innerWidth < 768;
      document.body.style.overflow = isOpen && isMobile ? "hidden" : "";
    };

    updateBodyOverflow();
    window.addEventListener("resize", updateBodyOverflow);

    return () => {
      window.removeEventListener("resize", updateBodyOverflow);
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div>
      <aside
        className={`bg-white dark:bg-[#333337] fixed ${
          isOpen ? "w-60" : "w-0"
        } h-[calc(100dvh-64px)] z-10 mt-16 overflow-hidden shadow-lg`}
      >
        <div className="flex flex-col justify-between h-full p-8">
          <div>
            <div className="flex gap-2 my-4">
              <Search color="gray" />
              <p className="text-black dark:text-white">찾기</p>
            </div>
            <NavLink to={"/my"} className="flex gap-2 my-4">
              <UserRoundIcon color="gray" />
              <p className="text-black dark:text-white">마이페이지</p>
            </NavLink>
          </div>
          <button
            className="text-black dark:text-white"
            onClick={OpenUserDeleteModal}
          >
            탈퇴하기
          </button>
        </div>
      </aside>
    </div>
  );
};
