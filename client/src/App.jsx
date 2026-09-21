import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed } from "./components/Feed";
import { LoginForm } from "./components/LoginForm";
import { NavBar } from "./components/NavBar";
import { PostEditor } from "./components/PostEditor";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/write" element={<PostEditor />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
