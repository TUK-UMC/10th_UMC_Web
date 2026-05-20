import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Sidebar } from "../components/common/Sidebar";
import { CreateLpModal } from "../components/common/Modal/CreateLpModal";
import { deleteUser } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import UserDeleteConfirmModal from "../components/common/Modal/UserDeleteConfirmModal";
import { useSidebar } from "../hooks/useSidebar";

const HomeLayout = () => {
    const { isOpen, toggle, open, close } = useSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    return (
    <>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#28292E]">
        <Navbar onMenuClick={() => toggle()} />
        <div className="flex flex-1">
            <Sidebar
            isOpen={isOpen}
            onClose={() => close()}
            OpenUserDeleteModal={() => setIsUserDeleteModalOpen(true)}
            />
            <main
            className={`flex-1 mt-17 ${isOpen ? "ml-60" : "ml-0"}`}
            onClick={() => close()}
            >
            <Outlet />
            </main>
        </div>
        <Footer />
        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center fixed bottom-10 right-10 size-15 rounded-full bg-pink-500"
        >
            <Plus color="white" size={30} />
        </button>
        {isModalOpen && <CreateLpModal onClose={() => setIsModalOpen(false)} />}
        {isUserDeleteModalOpen && (
            <UserDeleteConfirmModal
            message="정말 탈퇴하시겠습니까?"
            onConfirm={handleDeleteUser}
            onCancel={() => setIsUserDeleteModalOpen(false)}
            />
        )}
        </div>
    </>
    );
};

export default HomeLayout;