import { Link } from "react-router-dom";
import { PlaneTakeoff, User, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-soft-serve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-tr from-disco-queen to-helio rounded-xl">
                <PlaneTakeoff className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-disco-queen to-razzle-dazzle">
                Voyana AI
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-disco-queen transition-colors font-medium">Home</Link>
            <Link to="/plan" className="text-gray-700 hover:text-disco-queen transition-colors font-medium">Plan Trip</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-disco-queen transition-colors font-medium">Dashboard</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-700 font-bold hover:text-disco-queen transition-colors">Log In</Link>
            <Link to="/plan" className="px-5 py-2 rounded-full bg-gradient-to-r from-razzle-dazzle to-coral text-white font-bold hover:shadow-lg hover:shadow-coral/30 transition-all active:scale-95">
              Start Planning
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-disco-queen">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-soft-serve overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
              <Link to="/" onClick={() => setIsOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-soft-serve rounded-md font-bold">Home</Link>
              <Link to="/plan" onClick={() => setIsOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-soft-serve rounded-md font-bold">Plan Trip</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-soft-serve rounded-md font-bold">Dashboard</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="px-3 py-2 text-disco-queen hover:bg-soft-serve rounded-md font-bold">Log In</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
