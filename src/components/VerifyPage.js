import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleVerify = () => {
    verifyEmail(email);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-6 rounded shadow w-96 text-center space-y-4">
        <h1 className="text-xl font-bold text-yellow-600">Xác nhận Email</h1>
        <p>
          Chúng tôi đã gửi mã xác nhận đến email:{" "}
          <span className="font-semibold">{email}</span>
        </p>
        <p>(Giả lập - chỉ cần bấm nút bên dưới để xác nhận)</p>
        <button
          onClick={handleVerify}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ✅ Tôi đã xác nhận email
        </button>
      </div>
    </div>
  );
}

export default VerifyPage;
