interface SidebarProps {
    isopen: boolean;
    onClose: () => void;
}

export const Sidebar = ({
    isOpen, onclose } : SidebarProps) => {
        return (
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm
            transition-opacity duration-300 z-70 ${isOpen ? "opacity-100" :
                "opacity-0 pointer-events-none"}`}
                onclick={onclose}
            >
                <aside className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out z-50 ${isOpen ?
                    "translate-x-0" : "-translate-x-full"}`}
                    role="dialog"
                >
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                돌려돌려LP판
                            </h2>
                        </div>
                        <nav className="flex-1 overflow-y-auto p-4">
                            <ul className="space-y-2">
                                <li>
                                    <a 
                                        href="#search"
                                        className="flex items-center px-4 py-3 text-gray-700
                                        ronded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <span>(이모지서치)</span>
                                        <span className="ml-3 font-medium">찾기</span>    
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#mypage"
                                        className="flex items-center px-4 py-3 text-gray-700
                                        ronded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <span>(이모지마이)</span>
                                        <span className="ml-3 font-medium">마이페이지</span>    
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </aside>
            </div>
        );
    };