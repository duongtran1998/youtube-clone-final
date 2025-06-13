import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <div
        className="text-xl font-bold text-red-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Rainsound
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm"
        className="border px-3 py-1 rounded w-1/2"
      />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-xl">{user.avatar}</span>
            <span className="text-sm font-semibold">{user.name}</span>
            <button
              onClick={logout}
              className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="flex gap-2 text-sm">
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
