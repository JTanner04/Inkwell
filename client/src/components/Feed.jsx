import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCard } from "./PostCard";

export function Feed() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/posts?page=1").then(async (res) => {
      if (!res.ok) throw new Error("Could not load posts.");
      return res.json();
    }).then((data) => setPosts(data.posts)).catch(() => setError("Could not load posts. Please refresh and try again."));
  }, []);
  return <div>
    <h1 className="mb-6 text-2xl font-bold">Feed</h1>
    {error && <p role="alert" className="text-red-600">{error}</p>}
    {!error && posts === null && <p className="text-gray-500">Loading posts...</p>}
    {!error && posts?.length === 0 && <div className="py-12 text-center"><p className="text-gray-500">No posts yet.</p><Link to="/write" className="text-indigo-600 underline">Write the first one</Link></div>}
    {!error && posts?.length > 0 && <ul className="space-y-6">{posts.map((post) => <PostCard key={post.id} post={post} />)}</ul>}
  </div>;
}
