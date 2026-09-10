import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calendar, Compass, Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth springs for subtle 3D floating effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Floating transforms based on mouse position (Opposite directions for parallax depth)
  const float1X = useTransform(springX, [-1, 1], [-50, 50]);
  const float1Y = useTransform(springY, [-1, 1], [-50, 50]);
  
  const float2X = useTransform(springX, [-1, 1], [40, -40]);
  const float2Y = useTransform(springY, [-1, 1], [40, -40]);

  const float3X = useTransform(springX, [-1, 1], [-80, 80]);
  const float3Y = useTransform(springY, [-1, 1], [80, -80]);

  const float4X = useTransform(springX, [-1, 1], [60, -60]);
  const float4Y = useTransform(springY, [-1, 1], [-60, 60]);

  return (
    <div className="flex flex-col min-h-screen bg-[#EAE4FC] overflow-hidden selection:bg-disco-queen selection:text-white">
      
      {/* Interactive 3D Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        
        {/* Floating 3D Background Elements */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            
            {/* Top Left Floating Image */}
            <motion.div 
              className="absolute top-[15%] left-[8%] w-80 h-64 rounded-[2rem] bg-cover bg-center shadow-2xl border-4 border-white/50"
              style={{ 
                x: float1X, 
                y: float1Y, 
                rotate: -8,
                backgroundImage: 'url(/assets/globe.png)',
              }}
            />
            
            {/* Top Right Floating Element (Yellow Circle like the tennis ball) */}
            <motion.div 
              className="absolute top-[12%] right-[15%] w-48 h-48 rounded-full bg-[#E8E16D] shadow-2xl flex items-center justify-center text-7xl border border-white/40"
              style={{ x: float2X, y: float2Y, rotate: 15 }}
            >
              <span className="drop-shadow-lg">✈️</span>
            </motion.div>

            {/* Bottom Left Floating Emoji/Icon */}
            <motion.div 
              className="absolute bottom-[20%] left-[15%] text-[8rem] drop-shadow-2xl mix-blend-multiply opacity-90"
              style={{ x: float4X, y: float4Y, rotate: -15 }}
            >
              🌍
            </motion.div>

            {/* Bottom Right Floating Image */}
            <motion.div 
              className="absolute bottom-[10%] right-[10%] w-96 h-64 rounded-[2rem] bg-cover bg-center shadow-2xl border-4 border-white/50"
              style={{ 
                x: float3X, 
                y: float3Y,
                rotate: 6,
                backgroundImage: 'url(/assets/suitcase.png)',
              }}
            />
            
            {/* Center Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px]" />
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-[-10vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[5rem] md:text-[8.5rem] font-serif text-slate-900 mb-6 tracking-tighter leading-[0.9] drop-shadow-sm">
              Designed for<br/>
              <span className="text-disco-queen italic pr-4">Voyages.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-8 text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Engage your wanderlust with custom itineraries, smart packing lists, and live weather tracking powered by AI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/plan" className="group px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-lg shadow-2xl hover:scale-105 hover:bg-disco-queen transition-all flex items-center gap-3">
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="px-10 py-5 rounded-full bg-white/60 backdrop-blur-md text-slate-900 font-bold text-lg border border-white/50 hover:bg-white hover:shadow-xl transition-all">
              Log In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Elegant Features Section */}
      <section className="py-32 bg-white relative z-20 rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] mt-[-4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 tracking-tight">Smarter Travel Made Easy</h2>
            <p className="mt-4 text-xl text-gray-500 font-medium">Everything you need in one perfectly designed dashboard.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-10 rounded-[2.5rem] bg-[#FDFBF7] border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-flip-side to-coral rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Compass className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">AI Travel Roadmap</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Skip the confusing maps. Get a crystal-clear timeline of your journey, including transport methods, durations, and departure points.</p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-10 rounded-[2.5rem] bg-[#FDFBF7] border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-helio to-disco-queen rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Smart Budget Estimator</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Know exactly what you'll spend before you go. Visual pie charts break down transportation, food, activities, and emergencies.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-10 rounded-[2.5rem] bg-[#FDFBF7] border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-opal to-star-board rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Weather-Aware Packing</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Live weather forecasts power dynamic packing lists. You'll never forget your sunscreen for the beach or thermals for the mountains.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
