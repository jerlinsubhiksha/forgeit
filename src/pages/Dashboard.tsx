import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Clock, MapPin, CloudSun, Hotel, Briefcase, Check, Plane } from 'lucide-react';
import { apiClient } from '../api/client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Parallax and Mouse tracking
  const { scrollYProgress } = useScroll();
  const parallaxUp = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const parallaxDown = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Rotate the plane based on mouse movement direction (simplified)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await apiClient.post('/trips/generate', {
          startingLocation: 'Coimbatore',
          destination: 'Kyoto, Japan',
          startDate: '2026-10-01',
          endDate: '2026-10-10',
          travelers: 2,
          budget: 'Mid-range',
          preferences: { travelStyle: 'Cultural' }
        });
        setData(res.data.data);
      } catch (error: any) {
        console.error(error);
        toast.error(error.uiMessage || 'Failed to generate trip plan.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, []);

  const togglePacked = (catIdx: number, itemIdx: number) => {
    const newData = { ...data };
    const item = newData.aiPlan.packingList[catIdx].items[itemIdx];
    item.packed = !item.packed;
    setData(newData);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
            <div className="h-96 bg-gray-200 rounded-3xl"></div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
            <div className="h-96 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center">Failed to load trip data.</div>;

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] overflow-hidden">
      
      {/* Custom Cursor / Follower (Paper Plane) */}
      {isClient && (
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[100] text-coral drop-shadow-lg"
          style={{ x: springX, y: springY }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 -rotate-45">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </motion.div>
      )}

      {/* Floating Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: parallaxUp, rotate: rotateRight }} className="absolute top-20 left-10 text-9xl opacity-[0.03]">✈️</motion.div>
        <motion.div style={{ y: parallaxDown, rotate: rotateLeft }} className="absolute bottom-40 right-20 text-9xl opacity-[0.03]">🗺️</motion.div>
        <motion.div style={{ y: parallaxUp }} className="absolute top-1/2 right-32 text-8xl opacity-[0.03]">☁️</motion.div>
        <motion.div style={{ y: parallaxDown }} className="absolute bottom-1/4 left-20 text-8xl opacity-[0.03]">📷</motion.div>
        <motion.div style={{ y: parallaxUp, rotate: rotateRight }} className="absolute top-1/3 left-1/2 text-9xl opacity-[0.03]">🛂</motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 space-y-12">
        
        {/* Elegant Header section resembling 'Morgan Ganat' example */}
        <div className="text-center py-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-serif text-disco-queen mb-6 tracking-tight leading-none"
          >
            The Journey<br/>Awaits
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <p className="text-gray-500 uppercase tracking-[0.2em] font-medium text-sm md:text-base">
              PREPARED FOR {user?.name.split(' ')[0] || 'TRAVELER'}
            </p>
            <p className="text-coral uppercase tracking-[0.3em] font-bold text-lg md:text-xl">
              {data.weather?.location || 'DESTINATION'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Weather & Packing */}
          <div className="space-y-8">
            
            {/* WEATHER WIDGET */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-soft-serve/40 border border-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-flip-side to-coral rounded-2xl">
                  <CloudSun className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-serif">7-Day Forecast</h2>
              </div>
              
              <div className="flex justify-between items-center bg-soft-serve/20 rounded-2xl p-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Currently</p>
                  <p className="text-3xl font-bold text-gray-900">{data.weather?.currentTemp}°C</p>
                </div>
                <CloudSun className="w-12 h-12 text-coral opacity-80" />
              </div>

              <div className="space-y-3">
                {data.weather?.forecast?.map((day: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-600 font-medium w-24">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex gap-4 font-mono text-sm">
                      <span className="text-gray-400">L:{day.minTemp}°</span>
                      <span className="font-bold text-gray-900">H:{day.maxTemp}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* PACKING LIST */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-soft-serve/40 border border-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-opal to-star-board rounded-2xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-serif">Smart Packing List</h2>
              </div>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {data.aiPlan.packingList?.map((cat: any, cIdx: number) => (
                  <div key={cIdx}>
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{cat.category}</h3>
                    <div className="space-y-2">
                      {cat.items.map((item: any, iIdx: number) => (
                        <motion.div 
                          whileTap={{ scale: 0.98 }}
                          key={iIdx} 
                          onClick={() => togglePacked(cIdx, iIdx)}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                            item.packed ? 'bg-soft-serve/30 opacity-50' : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            item.packed ? 'bg-star-board text-white' : 'border-2 border-gray-300'
                          }`}>
                            {item.packed && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`font-medium ${item.packed ? 'line-through' : 'text-gray-700'}`}>
                            {item.name}
                          </span>
                          {item.essential && !item.packed && (
                            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-coral bg-coral/10 px-2 py-1 rounded-md">
                              Essential
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Roadmap & Hotels */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* HOTEL SUGGESTIONS */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-soft-serve/40 border border-white"
            >
               <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-razzle-dazzle to-disco-queen rounded-2xl">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-serif">Curated Stays</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.hotels?.map((hotel: any) => (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    key={hotel.id} 
                    className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                  >
                    {/* Mock Image Placeholder */}
                    <div className="h-40 bg-gray-200 relative">
                      <img 
                        src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80&fit=crop`} 
                        alt="Hotel" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold text-gray-900 shadow-sm">
                        {hotel.price}
                      </div>
                    </div>
                    <div className="p-4 bg-white h-full">
                      <h3 className="font-bold text-gray-900 mb-1 font-serif text-lg">{hotel.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-flip-side text-sm">★</span>
                        <span className="text-sm font-bold text-gray-700">{hotel.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">{hotel.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ITINERARY ROADMAP */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-soft-serve/40 border border-white"
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-gradient-to-br from-helio to-disco-queen rounded-2xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-serif">Your Itinerary</h2>
              </div>

              <div className="relative pl-8 space-y-12 before:absolute before:inset-0 before:ml-[39px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-coral before:to-helio">
                {data.aiPlan.days?.map((day: any, i: number) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    key={day.day} 
                    className="relative flex items-start group"
                  >
                    <div className="absolute left-[-40px] w-12 h-12 rounded-full bg-white border-4 border-coral flex items-center justify-center font-bold text-coral z-10 shadow-md group-hover:scale-110 group-hover:bg-coral group-hover:text-white transition-all">
                      {day.day}
                    </div>
                    <div className="bg-soft-serve/10 p-6 rounded-2xl border border-gray-100 w-full ml-4 hover:shadow-md transition-shadow">
                      <h3 className="text-2xl font-serif text-gray-900 mb-4">{day.theme}</h3>
                      <div className="space-y-4">
                        {day.activities?.map((act: any, idx: number) => (
                          <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border border-gray-50 hover:border-opal/30 transition-colors">
                            <div className="bg-soft-serve/20 p-2 rounded-lg mt-1 text-opal">
                              <Clock className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-coral uppercase tracking-wider">{act.time}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm font-medium text-gray-500">{act.cost}</span>
                              </div>
                              <h4 className="font-bold text-gray-900 text-lg">{act.title}</h4>
                              <p className="text-gray-600 text-sm mt-1 leading-relaxed">{act.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
