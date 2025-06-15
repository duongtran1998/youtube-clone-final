import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [relatedVideos, setRelatedVideos] = useState([]);

  // Load video
  useEffect(() => {
    const allVideos = JSON.parse(localStorage.getItem("videos") || "[]");
    const current = allVideos.find((v) => v.id === id);
    setVideo(current);

    const others = allVideos.filter((v) => v.id !== id);
    setRelatedVideos(others);
  }, [id]);

  // Lưu lịch sử xem
  useEffect(() => {
    if (!video) return;
    const watched = {
      id: video.id,
      title: video.title,
      desc: video.desc,
      url: video.url,
      watchedAt: Date.now(),
    };

    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const filtered = history.filter((v) => v.id !== watched.id);
    const updated = [watched, ...filtered];
    localStorage.setItem("history", JSON.stringify(updated));
  }, [video]);

  // Load like/dislike
  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem("stats") || "{}");
    const stat = stats[id] || { like: 0, dislike: 0 };
    setLike(stat.like);
    setDislike(stat.dislike);
  }, [id]);

  const handleLike = () => {
    const stats = JSON.parse(localStorage.getItem("stats") || "{}");
    const current = stats[id] || { like: 0, dislike: 0 };
    current.like += 1;
    stats[id] = current;
    localStorage.setItem("stats", JSON.stringify(stats));
    setLike(current.like);
  };

  const handleDislike = () => {
    const stats = JSON.parse(localStorage.getItem("stats") || "{}");
    const current = stats[id] || { like: 0, dislike: 0 };
    current.dislike += 1;
    stats[id] = current;
    localStorage.setItem("stats", JSON.stringify(stats));
    setDislike(current.dislike);
  };

  // Load & gửi comment
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("comments") || "{}");
    setComments(all[id] || []);
  }, [id]);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    const all = JSON.parse(localStorage.getItem("comments") || "{}");
    const list = all[id] || [];
    const newComment = {
      text: commentInput,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [newComment, ...list];
    all[id] = updated;
    localStorage.setItem("comments", JSON.stringify(all));
    setComments(updated);
    setCommentInput("");
  };

  if (!video) {
    return (
      <div className="p-10 text-gray-600 text-lg">
        ❗ Video không tồn tại hoặc đã bị xoá.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col lg:flex-row gap-8">
      {/* Video + nội dung */}
      <div className="flex-1 space-y-4">
        <video
          src={video.url}
          controls
          className="w-full max-h-[70vh] rounded shadow"
        />
        <h1 className="text-2xl font-bold text-gray-800">{video.title}</h1>
        <p className="text-gray-600">{video.desc}</p>

        {/* Like/Dislike */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleLike}
            className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
          >
            👍 {like}
          </button>
          <button
            onClick={handleDislike}
            className="bg-red-100 px-3 py-1 rounded hover:bg-red-200"
          >
            👎 {dislike}
          </button>
        </div>

        {/* Bình luận */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">💬 Bình luận</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              placeholder="Nhập bình luận..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Gửi
            </button>
          </div>
          <div className="space-y-2">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa có bình luận nào.</p>
            ) : (
              comments.map((cmt, idx) => (
                <div key={idx} className="border-b pb-2">
                  <p className="text-gray-700">{cmt.text}</p>
                  <p className="text-xs text-gray-400">{cmt.createdAt}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Gợi ý video */}
      <div className="w-full lg:w-1/3 space-y-4">
        <h2 className="text-lg font-semibold">📺 Gợi ý video</h2>
        {relatedVideos.map((v) => (
          <Link
            to={`/watch/${v.id}`}
            key={v.id}
            className="flex gap-2 border-b pb-2 hover:bg-gray-50 p-2 rounded"
          >
            <video src={v.url} className="w-32 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{v.title}</h3>
              <p className="text-xs text-gray-500">{v.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
