import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleReset = (e) => {
    e.preventDefault();
    if (!password || password !== confirm) {
      setError("Mật khẩu không khớp.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.map((u) =>
      u.email === email ? { ...u, password } : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">Đặt lại mật khẩu</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>}
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Cập nhật mật khẩu
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
