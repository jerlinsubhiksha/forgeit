import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, MapPin, AlertCircle, CloudSun, Hotel, Briefcase, Check } from 'lucide-react';
import { apiClient } from '../api/client';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock fetching the trip data for the UI demonstration, assuming the trip was generated
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        // We will call the backend endpoint to generate/fetch the trip dashboard data
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
      } catch (err) {
        console.error(err);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-disco-queen border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center">Failed to load trip data.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Trip to {data.weather?.location || 'Your Destination'}
          </h1>
          <p className="text-gray-500 max-w-2xl">{data.aiPlan.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Weather & Packing */}
        <div className="space-y-8">
          
          {/* WEATHER WIDGET */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-soft-serve/50 border border-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-flip-side to-coral rounded-2xl">
                <CloudSun className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">7-Day Forecast</h2>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-soft-serve/50 border border-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-opal to-star-board rounded-2xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Smart Packing List</h2>
            </div>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {data.aiPlan.packingList?.map((cat: any, cIdx: number) => (
                <div key={cIdx}>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{cat.category}</h3>
                  <div className="space-y-2">
                    {cat.items.map((item: any, iIdx: number) => (
                      <div 
                        key={iIdx} 
                        onClick={() => togglePacked(cIdx, iIdx)}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                          item.packed ? 'bg-soft-serve/30 opacity-50' : 'bg-gray-50 hover:bg-gray-100'
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
                      </div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-soft-serve/50 border border-white"
          >
             <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-razzle-dazzle to-disco-queen rounded-2xl">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Hotel Suggestions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.hotels?.map((hotel: any) => (
                <div key={hotel.id} className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer">
                  {/* Mock Image Placeholder */}
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80&fit=crop`} 
                      alt="Hotel" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold text-gray-900 shadow-sm">
                      {hotel.price}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-gray-900 mb-1">{hotel.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm font-bold text-gray-700">{hotel.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{hotel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ITINERARY ROADMAP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-soft-serve/50 border border-white"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-helio to-disco-queen rounded-2xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your Itinerary</h2>
            </div>

            <div className="relative pl-8 space-y-12 before:absolute before:inset-0 before:ml-[39px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-coral before:to-helio">
              {data.aiPlan.days?.map((day: any) => (
                <div key={day.day} className="relative flex items-start">
                  <div className="absolute left-[-40px] w-12 h-12 rounded-full bg-white border-4 border-coral flex items-center justify-center font-bold text-coral z-10 shadow-md">
                    {day.day}
                  </div>
                  <div className="bg-soft-serve/10 p-6 rounded-2xl border border-gray-100 w-full ml-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{day.theme}</h3>
                    <div className="space-y-4">
                      {day.activities?.map((act: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                          <div className="bg-gray-100 p-2 rounded-lg mt-1">
                            <Clock className="w-4 h-4 text-gray-500" />
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
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
