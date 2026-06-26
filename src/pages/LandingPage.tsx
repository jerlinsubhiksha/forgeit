import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Compass, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-soft-serve via-white to-opal/20 py-24 sm:py-32">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-disco-queen/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-razzle-dazzle/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-flip-side/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Plan Your Perfect Trip <br className="hidden md:block" />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-disco-queen via-razzle-dazzle to-coral">Voyana AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Stop stressing over travel logistics. Get personalized roadmaps, accurate budget estimates, and smart packing lists generated in seconds by AI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/plan" className="px-8 py-4 rounded-full bg-gradient-to-r from-razzle-dazzle to-coral text-white font-bold text-lg shadow-xl shadow-coral/30 hover:shadow-2xl hover:scale-105 transition-all">
              Start Planning Now
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-full bg-white text-gray-800 font-bold text-lg border-2 border-soft-serve hover:border-opal hover:text-star-board transition-all">
              Log In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smarter Travel Made Easy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-soft-serve/30 border border-soft-serve hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-flip-side to-coral rounded-2xl flex items-center justify-center mb-6">
                <Compass className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Travel Roadmap</h3>
              <p className="text-gray-600">Skip the confusing maps. Get a crystal-clear timeline of your journey, including transport methods, durations, and departure points.</p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-soft-serve/30 border border-soft-serve hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-helio to-disco-queen rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Budget Estimator</h3>
              <p className="text-gray-600">Know exactly what you'll spend before you go. Visual pie charts break down transportation, food, activities, and emergencies.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-soft-serve/30 border border-soft-serve hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-opal to-star-board rounded-2xl flex items-center justify-center mb-6">
                <Star className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Weather-Aware Packing</h3>
              <p className="text-gray-600">Live weather forecasts power dynamic packing lists. You'll never forget your sunscreen for the beach or thermals for the mountains.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
