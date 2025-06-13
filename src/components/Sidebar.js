import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 bg-black text-white min-h-screen fixed top-0 left-0 p-4 space-y-6 text-sm font-medium">
      {/* Mục chính */}
      <div className="space-y-3">
        <SidebarItem label="Trang chủ" icon="🏠" to="/" />
        <SidebarItem label="Kênh đăng ký" icon="📺" to="/subscriptions" />
        <SidebarItem label="Video đã xem" icon="🕒" to="/history" />
      </div>

      <hr className="border-gray-600" />

      {/* Khám phá */}
      <div className="space-y-3">
        <p className="text-gray-400 text-xs">Khám phá</p>
        <SidebarItem label="Thịnh hành" icon="🔥" to="/trending" />
        <SidebarItem label="Âm nhạc" icon="🎵" to="/music" />
        <SidebarItem label="Trò chơi" icon="🎮" to="/gaming" />
        <SidebarItem label="Tin tức" icon="📰" to="/news" />
        <SidebarItem label="Thể thao" icon="🏆" to="/sports" />
      </div>

      <hr className="border-gray-600" />

      {/* Dịch vụ khác */}
      <div className="space-y-3">
        <SidebarItem label="Cài đặt" icon="⚙️" to="/settings" />
        <SidebarItem label="Trợ giúp" icon="❓" to="/help" />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default Sidebar;
