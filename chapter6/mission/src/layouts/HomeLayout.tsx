import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Sidebar } from "../components/Sidebar";

const HomeLayout = () => {
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

    return (
    <>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#28292E]">
        <Navbar onMenuClick={() => setIsOpen((prev) => !prev)} />
        <div className="flex flex-1">
            <Sidebar isOpen={isOpen} />
            <main
            className={`flex-1 mt-17 ${isOpen ? "ml-70" : "ml-0"}`}
            onClick={() => setIsOpen(false)}
            >
            <Outlet />
            </main>
        </div>
        <Footer />
        <button className="flex items-center justify-center fixed bottom-10 right-10 size-15 rounded-full bg-pink-500">
            <Plus color="white" size={30} />
        </button>
        </div>
    </>
    );
};

export default HomeLayout;