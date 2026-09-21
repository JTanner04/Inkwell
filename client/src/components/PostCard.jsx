export function PostCard({ post }) {
  return <li className="border-b border-gray-200 pb-4"><h2 className="text-xl font-semibold text-gray-900">{post.title}</h2><p className="mt-1 whitespace-pre-wrap text-gray-600">{post.body}</p></li>;
}
