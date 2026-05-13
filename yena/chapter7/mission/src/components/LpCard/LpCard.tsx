import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";
import getRelativeTime from "../../utils/relativeTime";
import { Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface LpCardProps {
    lp: Lp;
}

export const LpCard = ({ lp }: LpCardProps) => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const handleClick = () => {
    if (!accessToken) {
        alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
        navigate("/login", {
        state: {
            from: {
            pathname: `/lps/${lp.id}`,
            },
        },
        });
        return;
    }
    navigate(`/lps/${lp.id}`);
    };

    return (
    <div
        onClick={handleClick}
        className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
    >
        <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div className="flex flex-col justify-end">
            <p className="items-center text-white font-semibold line-clamp-2 overflow-hidden">
            {lp.title}
            </p>
            <p className="items-center text-white text-md">
            {getRelativeTime(lp?.updatedAt)}
            </p>
        </div>
        <div className="flex absolute items-center justify-center bottom-4 right-4">
            <Heart color="white" fill="white" size={15} />
            <p className="text-white ml-1">{lp.likes.length}</p>
        </div>
        </div>
    </div>
    );
};