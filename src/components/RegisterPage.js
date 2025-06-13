import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("🧑");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    const newUser = {
      name,
      email,
      password,
      avatar,
      verified: false,
    };
    register(newUser);
    navigate("/verify", { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">Đăng ký</h1>

        <input
          type="text"
          placeholder="Tên hiển thị"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <div>
          <label className="block mb-1 text-sm">Ảnh đại diện:</label>
          <select
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="🧑">🧑 Mặc định</option>
            <option value="👩">👩 Nữ</option>
            <option value="👨">👨 Nam</option>
            <option value="😎">😎 Ngầu</option>
            <option value="🐱">🐱 Mèo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
