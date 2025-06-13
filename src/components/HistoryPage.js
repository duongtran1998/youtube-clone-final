import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(data);
  }, []);

  const removeFromHistory = (id) => {
    const newHistory = history.filter((v) => v.id !== id);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen p-10 text-gray-600 text-lg">
        📭 Bạn chưa xem video nào.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">🕒 Lịch sử đã xem</h1>

      {history.map((video) => (
        <div
          key={video.id}
          className="flex items-center gap-4 border-b pb-4 pt-2"
        >
          <video
            src={video.url}
            className="w-40 h-24 object-cover rounded"
            controls={false}
          />
          <div className="flex-1">
            <Link
              to={`/watch/${video.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {video.title}
            </Link>
            <p className="text-sm text-gray-500">{video.desc}</p>
          </div>
          <button
            onClick={() => removeFromHistory(video.id)}
            className="text-red-600 text-sm hover:underline"
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}

export default HistoryPage;
