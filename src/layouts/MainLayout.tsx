import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AIChatbot from "../components/AIChatbot";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-soft-serve/30 selection:bg-opal/30 selection:text-star-board">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-soft-serve py-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Voyana AI. All rights reserved.
      </footer>
      <AIChatbot />
    </div>
  );
}
