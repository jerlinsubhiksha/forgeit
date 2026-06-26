import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Wallet, Navigation } from "lucide-react";

export default function TripPlanningForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for now
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Let's build your dream trip</h1>
        <p className="text-lg text-gray-600">Tell Voyana AI about your plans, and we'll handle the rest.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl shadow-soft-serve/50 p-8 border border-soft-serve"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Where to */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <Navigation className="w-4 h-4 mr-2 text-opal" /> Starting Location
              </label>
              <input 
                type="text" 
                placeholder="e.g. New York, USA"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen focus:ring-2 focus:ring-disco-queen/20 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-razzle-dazzle" /> Destination
              </label>
              <input 
                type="text" 
                placeholder="e.g. Kyoto, Japan"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen focus:ring-2 focus:ring-disco-queen/20 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Dates & People */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <CalendarDays className="w-4 h-4 mr-2 text-flip-side" /> Start Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all text-gray-600"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <CalendarDays className="w-4 h-4 mr-2 text-flip-side" /> End Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all text-gray-600"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2 text-helio" /> Travelers
              </label>
              <input 
                type="number" 
                min="1"
                defaultValue="2"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Budget & Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <Wallet className="w-4 h-4 mr-2 text-star-board" /> Budget Tier
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all bg-white">
                <option value="budget">Budget-Friendly (Hostels, Street Food)</option>
                <option value="moderate">Moderate (3-4 Star, Casual Dining)</option>
                <option value="luxury">Luxury (5 Star, Fine Dining)</option>
              </select>
            </div>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-coral" /> Travel Style
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all bg-white">
                <option value="adventure">Adventure & Outdoors</option>
                <option value="culture">Cultural & Historical</option>
                <option value="relaxation">Relaxation & Wellness</option>
                <option value="family">Family Friendly</option>
                <option value="party">Nightlife & Party</option>
              </select>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-disco-queen to-helio text-white font-bold text-lg hover:shadow-lg hover:shadow-helio/30 transition-all active:scale-95 flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Generate AI Trip"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
