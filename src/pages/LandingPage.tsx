// No useState needed
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Plane, Star, Map, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Mouse move effect for floating elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Transforms for individual floating boxes
  const float1X = useTransform(mouseX, [-10, 10], [-20, 20]);
  const float1Y = useTransform(mouseY, [-10, 10], [-20, 20]);
  
  const float2X = useTransform(mouseX, [-10, 10], [15, -15]);
  const float2Y = useTransform(mouseY, [-10, 10], [15, -15]);

  const float3X = useTransform(mouseX, [-10, 10], [-30, 30]);
  const float3Y = useTransform(mouseY, [-10, 10], [-30, 30]);

  return (
    <div 
      className="min-h-screen bg-[#EAE4FC] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        
        {/* Abstract Background Blobs */}
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-helio/20 dark:bg-helio/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-disco-queen/20 dark:bg-disco-queen/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-[30%] w-96 h-96 bg-opal/20 dark:bg-opal/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

        {/* 3D Floating Elements (The "Wix" style interactive boxes) */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
            
            {/* Top Left Floating Image */}
            <motion.div 
              className="absolute top-[15%] left-[8%] w-80 h-64 rounded-[2rem] bg-cover bg-center shadow-2xl border-4 border-white/50 dark:border-white/10"
              style={{ 
                x: float1X, 
                y: float1Y, 
                rotate: -8,
                backgroundImage: 'url(/assets/globe.png)',
              }}
            />
            
            {/* Top Right Floating Badge */}
            <motion.div 
              className="absolute top-[25%] right-[15%] px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 dark:border-slate-700"
              style={{ 
                x: float2X, 
                y: float2Y,
                rotate: 12
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-flip-side rounded-full">
                  <Star className="w-5 h-5 text-disco-queen" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-white">AI Tailored</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">10,000+ Journeys</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Floating Image */}
            <motion.div 
              className="absolute bottom-[10%] right-[10%] w-96 h-64 rounded-[2rem] bg-cover bg-center shadow-2xl border-4 border-white/50 dark:border-white/10"
              style={{ 
                x: float3X, 
                y: float3Y,
                rotate: 6,
                backgroundImage: 'url(/assets/suitcase.png)',
              }}
            />
            
            {/* Bottom Left Small Accent Box */}
            <motion.div 
              className="absolute bottom-[20%] left-[20%] w-24 h-24 bg-coral/90 rounded-3xl shadow-xl flex items-center justify-center border border-white/30"
              style={{ 
                x: float2X, 
                y: float1Y,
                rotate: -15
              }}
            >
               <Map className="w-10 h-10 text-white" />
            </motion.div>

        </div>

        {/* Center Hero Content */}
        <div className="relative z-20 text-center max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif font-black tracking-tight mb-6 text-disco-queen dark:text-white"
          >
            Design Your <br/> Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-helio">Escape.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Meet Voyana AI. Your intelligent travel designer that builds breathtaking, personalized itineraries in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={() => navigate('/plan')} className="px-8 py-4 bg-disco-queen text-white rounded-full font-bold text-lg hover:bg-purple-900 transition-colors shadow-xl flex items-center gap-2 group">
              Start Planning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 text-disco-queen border-2 border-disco-queen rounded-full font-bold text-lg hover:bg-soft-serve dark:hover:bg-slate-700 transition-colors">
              Sign In
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES / VALUE PROP SECTION */}
      <section className="py-32 bg-white dark:bg-slate-900 relative z-20 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-disco-queen dark:text-white mb-4">Travel Smarter, Not Harder.</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Voyana replaces dozens of spreadsheets, booking tabs, and reviews with one seamless, intelligent interface.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div style={{ y: y1 }} className="bg-soft-serve/30 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl">
              <div className="w-14 h-14 bg-opal rounded-2xl flex items-center justify-center mb-6">
                <Map className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Day-by-Day Roadmaps</h3>
              <p className="text-slate-600 dark:text-slate-400">Perfectly paced itineraries balancing must-see sights with hidden local gems, so you never feel rushed or bored.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div className="bg-soft-serve/30 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl mt-8 md:mt-0">
              <div className="w-14 h-14 bg-flip-side rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-disco-queen" />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Weather & Packing</h3>
              <p className="text-slate-600 dark:text-slate-400">Voyana checks the actual forecast for your dates and automatically generates a smart packing list.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div style={{ y: y2 }} className="bg-soft-serve/30 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl mt-16 md:mt-0">
              <div className="w-14 h-14 bg-coral rounded-2xl flex items-center justify-center mb-6">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Budget Mastery</h3>
              <p className="text-slate-600 dark:text-slate-400">Tell us your budget, and we'll dynamically allocate it across food, stays, and fun so you never overspend.</p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
