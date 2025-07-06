import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsBag, BsBagFill } from "react-icons/bs";
import { BiUser, BiSolidUser } from "react-icons/bi";
import { IoCallOutline, IoCall } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "홈",
    icon: <AiOutlineHome size={24} />,
    activeIcon: <AiFillHome size={24} />,
    path: "/home",
  },
  {
    label: "구매",
    icon: <BsBag size={24} />,
    activeIcon: <BsBagFill size={24} />,
    path: "/purchase",
  },
  {
    label: "상담",
    icon: <IoCallOutline size={24} />,
    activeIcon: <IoCall size={24} />,
    path: "/counsel",
  },
  {
    label: "내 정보",
    icon: <BiUser size={24} />,
    activeIcon: <BiSolidUser size={24} />,
    path: "/mypage",
  },
];

export default function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t px-4 py-2 flex justify-around items-center z-10 border-t border-gray-200">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-14 ${
              isActive ? "text-[#249883] font-bold" : "text-gray-500"
            }`}
            onClick={() => navigate(item.path)}
          >
            {isActive ? item.activeIcon : item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
