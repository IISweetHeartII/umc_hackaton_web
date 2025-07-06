import { FiBell } from "react-icons/fi";
import logoImg from "../assets/logo.png";

const HomeTopBar = () => {
  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-10  h-14 border-b border-gray-400 ">
      <div>
        <img src={logoImg} alt="로고" className="h-9" />
      </div>
      <FiBell size={24} className="text-gray-800" />
    </div>
  );
};

export default HomeTopBar;
