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
  if (error) return <p role="alert" className="text-red-600">{error}</p>;
  if (posts === null) return <p className="text-gray-500">Loading posts...</p>;
  if (posts.length === 0) return <div className="py-12 text-center"><p className="text-gray-500">No posts yet.</p><Link to="/write" className="text-indigo-600 underline">Write the first one</Link></div>;
  return <ul className="space-y-6">{posts.map((post) => <PostCard key={post.id} post={post} />)}</ul>;
}
