import { useNavigate } from "react-router-dom";

const videos = [
  {
    id: 1,
    title: "Cách làm web như YouTube",
    channel: "Lập Trình Với GPT",
    views: "1.2M lượt xem",
    thumbnail: "https://i.ytimg.com/vi/3qBXWUpoPHo/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Học React siêu nhanh",
    channel: "Code Dạo Kênh",
    views: "300K lượt xem",
    thumbnail: "https://i.ytimg.com/vi/LNnBvJbnxOc/maxresdefault.jpg",
  },
];

function VideoGrid() {
  const navigate = useNavigate();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => {
        return (
          <div
            key={video.id}
            className="bg-white rounded shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/watch/${video.id}`)}
          >
            <img src={video.thumbnail} alt="thumbnail" className="rounded-t" />
            <div className="p-2">
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500">{video.channel}</p>
              <p className="text-sm text-gray-400">{video.views}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoGrid;
