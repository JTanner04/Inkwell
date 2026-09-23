import { NavLink } from "react-router-dom";

function QuillIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="M4 20c3.5-.4 6-1.8 8-3.9C16 12 18 7.8 19 3c-4.8 1-9 3-13.1 7C3.8 12 2.4 14.5 2 18l2 2Z" /><path d="M5 19c2.5-3.2 5.4-5.9 8.7-8" /></svg>;
}

function PencilIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="m4 20 4.2-1.1L19 8.1a2.1 2.1 0 0 0-3-3L5.2 15.9 4 20Z" /><path d="m14.5 6.5 3 3" /></svg>;
}

function UserIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg>;
}

const linkClass = ({ isActive }) => `flex min-h-11 items-center gap-2 rounded px-2 text-sm ${isActive ? "font-semibold text-indigo-600" : "text-gray-600 hover:text-gray-900"}`;

export function NavBar() {
  return <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:px-8"><NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-gray-900" aria-label="Inkwell home"><QuillIcon /><span>Inkwell</span></NavLink><div className="flex items-center gap-1 sm:gap-2"><NavLink to="/write" className={linkClass} aria-label="Write a post"><PencilIcon /><span className="hidden lg:inline">Write</span></NavLink><NavLink to="/login" className={linkClass} aria-label="Log in"><UserIcon /><span className="hidden lg:inline">Log In</span></NavLink></div></nav>;
}
