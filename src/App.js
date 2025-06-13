import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";
import WatchPage from "./components/WatchPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import VerifyPage from "./components/VerifyPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import UploadPage from "./components/UploadPage";

import { AuthProvider, useAuth } from "./AuthContext";

// Route chỉ cho người đã đăng nhập
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="ml-60 w-full">
            <Header />

            <Routes>
              {/* Trang chính & video */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <VideoGrid />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watch/:id"
                element={
                  <ProtectedRoute>
                    <WatchPage />
                  </ProtectedRoute>
                }
              />

              {/* Đăng video (chỉ chủ web) */}
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadPage />
                  </ProtectedRoute>
                }
              />

              {/* Đăng ký / Đăng nhập / Xác minh / Quên mật khẩu */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot" element={<ForgotPasswordPage />} />
              <Route path="/reset" element={<ResetPasswordPage />} />

              {/* Các trang phụ (placeholder) */}
              <Route path="/subscriptions" element={<Placeholder label="Kênh đăng ký" />} />
              <Route path="/history" element={<Placeholder label="Video đã xem" />} />
              <Route path="/trending" element={<Placeholder label="Thịnh hành" />} />
              <Route path="/music" element={<Placeholder label="Âm nhạc" />} />
              <Route path="/gaming" element={<Placeholder label="Trò chơi" />} />
              <Route path="/news" element={<Placeholder label="Tin tức" />} />
              <Route path="/sports" element={<Placeholder label="Thể thao" />} />
              <Route path="/settings" element={<Placeholder label="Cài đặt" />} />
              <Route path="/help" element={<Placeholder label="Trợ giúp" />} />

              {/* Mặc định: redirect về trang chủ */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Component trang trống tạm thời
function Placeholder({ label }) {
  return (
    <div className="p-10 text-xl text-gray-700 font-semibold">
      🚧 {label} – đang phát triển
    </div>
  );
}

export default App;
