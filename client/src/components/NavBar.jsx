import { Link } from "react-router-dom";

export function NavBar() {
  return <nav className="flex justify-between border-b border-gray-200 bg-white p-4"><Link to="/" className="font-bold">Inkwell</Link><div className="space-x-4"><Link to="/write">Write</Link><Link to="/login">Log In</Link></div></nav>;
}
