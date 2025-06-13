import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) return;

    const videoUrl = URL.createObjectURL(file); // giả lập đường dẫn video local

    const newVideo = {
      id: Date.now().toString(),
      title,
      desc,
      url: videoUrl,
      uploaded: true,
    };

    const existing = JSON.parse(localStorage.getItem("videos") || "[]");
    localStorage.setItem("videos", JSON.stringify([newVideo, ...existing]));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 w-96 rounded space-y-4"
      >
        <h1 className="text-xl font-bold text-center text-gray-700">Đăng Video</h1>
        <input
          type="text"
          placeholder="Tiêu đề video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Mô tả video"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng video
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
