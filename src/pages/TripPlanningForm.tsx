import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TripPlanningForm() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    destination: "",
    startingLocation: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
    style: "",
    foodPreference: "No restrictions",
    hotelsNote: "",
    restaurantsNote: "",
    attractionsNote: ""
  });

  const [errors, setErrors] = useState({
    err1: false,
    err2: false,
    err3: false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fmtDate = (d: string) => {
    if (!d) return "—";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const goTo = (nextStep: number) => {
    // Validation
    if (step === 1 && nextStep === 2) {
      if (!formData.destination || !formData.startingLocation) {
        setErrors(prev => ({ ...prev, err1: true }));
        return;
      }
      setErrors(prev => ({ ...prev, err1: false }));
    }
    if (step === 2 && nextStep === 3) {
      if (!formData.startDate || !formData.endDate || new Date(formData.endDate) <= new Date(formData.startDate)) {
        setErrors(prev => ({ ...prev, err2: true }));
        return;
      }
      setErrors(prev => ({ ...prev, err2: false }));
    }
    if (step === 3 && nextStep === 4) {
      if (!formData.budget || !formData.style) {
        setErrors(prev => ({ ...prev, err3: true }));
        return;
      }
      setErrors(prev => ({ ...prev, err3: false }));
    }

    setStep(nextStep);
  };

  const submitTrip = () => {
    let message = `Plan my trip with these details:\n`
      + `- Destination: ${formData.destination}\n`
      + `- Starting location: ${formData.startingLocation}\n`
      + `- Travel dates: ${fmtDate(formData.startDate)} to ${fmtDate(formData.endDate)}\n`
      + `- Travelers: ${formData.travelers}\n`
      + `- Budget: ${formData.budget}\n`
      + `- Travel style: ${formData.style}\n`
      + `- Food preference: ${formData.foodPreference}\n`;
    
    if (formData.hotelsNote) message += `- Hotels in mind: ${formData.hotelsNote}\n`;
    if (formData.restaurantsNote) message += `- Restaurants in mind: ${formData.restaurantsNote}\n`;
    if (formData.attractionsNote) message += `- Must-see places: ${formData.attractionsNote}\n`;

    // Hook into the global LLM function if available
    if (typeof (window as any).sendPromptToLLM === 'function') {
      (window as any).sendPromptToLLM(message);
    }
    
    setStep(6);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAE4FC] dark:bg-[#0F172A] transition-colors duration-500 p-4" style={{
      backgroundImage: `radial-gradient(circle at 12% 18%, rgba(255,255,255,0.2) 0, transparent 45%), radial-gradient(circle at 88% 82%, rgba(255,255,255,0.15) 0, transparent 45%)`
    }}>
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] max-w-4xl w-full bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative mt-8 transition-colors duration-500">
        
        {/* BOARDING PASS STUB */}
        <div className="bg-[#7C3DB8] dark:bg-[#1e1b4b] text-white p-8 md:pr-10 relative flex flex-col gap-5 md:border-r-2 md:border-dashed md:border-white/40 dark:border-white/10 transition-colors">
          <div className="font-mono text-xs tracking-widest text-white/70 uppercase">Boarding Pass · Draft</div>
          
          <div className="flex items-center gap-3 font-serif text-2xl leading-tight">
            <span className={formData.startingLocation ? "" : "text-white/50 italic text-base font-sans"}>
              {formData.startingLocation || 'From —'}
            </span>
            <span className="text-white text-lg">✈</span>
            <span className={formData.destination ? "" : "text-white/50 italic text-base font-sans"}>
              {formData.destination || 'Destination'}
            </span>
          </div>

          <div className="flex justify-between border-t border-white/20 dark:border-white/10 pt-3 font-mono text-xs">
            <span className="text-white/70 tracking-wider uppercase">Depart</span>
            <span className={formData.startDate ? "" : "text-white/50"}>{fmtDate(formData.startDate)}</span>
          </div>
          <div className="flex justify-between border-t border-white/20 dark:border-white/10 pt-3 font-mono text-xs">
            <span className="text-white/70 tracking-wider uppercase">Return</span>
            <span className={formData.endDate ? "" : "text-white/50"}>{fmtDate(formData.endDate)}</span>
          </div>
          <div className="flex justify-between border-t border-white/20 dark:border-white/10 pt-3 font-mono text-xs">
            <span className="text-white/70 tracking-wider uppercase">Travelers</span>
            <span className={formData.travelers ? "" : "text-white/50"}>{formData.travelers} pax</span>
          </div>
          <div className="flex justify-between border-t border-white/20 dark:border-white/10 pt-3 font-mono text-xs">
            <span className="text-white/70 tracking-wider uppercase">Class</span>
            <span className={formData.budget ? "" : "text-white/50"}>{formData.budget || '—'}</span>
          </div>
          <div className="flex justify-between border-t border-white/20 dark:border-white/10 pt-3 font-mono text-xs">
            <span className="text-white/70 tracking-wider uppercase">Style</span>
            <span className={formData.style ? "" : "text-white/50"}>{formData.style || '—'}</span>
          </div>

          {/* Barcode */}
          <div className="mt-auto flex items-end gap-1 h-8 opacity-50">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="bg-white w-1" style={{ height: `${14 + Math.random() * 20}px` }} />
            ))}
          </div>

          <AnimatePresence>
            {step >= 5 && (
              <motion.div 
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: -16 }}
                className="absolute bottom-6 left-6 w-20 h-20 border-[3px] border-white rounded-full flex items-center justify-center opacity-90"
              >
                <span className="font-mono text-[9px] tracking-widest uppercase text-white text-center font-bold">
                  Confirmed<br/>✦ Voyana ✦
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FORM PANEL */}
        <div className="p-8 md:p-10 text-[#7C3DB8] dark:text-slate-100 flex flex-col min-h-[500px]">
          
          {step < 6 && (
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#7C3DB8]/70 dark:text-slate-400 whitespace-nowrap">
                Step {step} of 5
              </span>
              <div className="flex-1 h-1 bg-[#EAE4FC] dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#7C3DB8] dark:bg-[#EAE4FC]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                <h1 className="font-serif font-semibold text-3xl mb-2 text-[#7C3DB8] dark:text-white">Where's this trip taking you?</h1>
                <p className="text-[#7C3DB8]/70 dark:text-slate-400 text-sm mb-4">Start with the two ends of the journey — we'll build everything else around them.</p>

                {/* AI Magic Fill Integration */}
                <div className="bg-[#7C3DB8] dark:bg-[#1e1b4b] p-4 rounded-2xl mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-[#EAE4FC]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col gap-3">
                    <label className="text-white text-sm font-semibold flex items-center gap-2">
                      <span className="text-[#EAE4FC]">✦</span> AI Magic Fill
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        id="magicFillInput"
                        placeholder="e.g. A romantic weekend in Paris from London..."
                        className="flex-1 bg-white/10 text-white placeholder-white/60 p-3 rounded-xl border border-white/20 focus:border-white outline-none text-sm transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') document.getElementById('magicFillBtn')?.click();
                        }}
                      />
                      <button 
                        id="magicFillBtn"
                        onClick={async () => {
                          const input = (document.getElementById('magicFillInput') as HTMLInputElement).value;
                          if (!input) return;
                          
                          try {
                            const btn = document.getElementById('magicFillBtn');
                            if (btn) btn.innerHTML = '<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>';
                            
                            const { GoogleGenAI } = await import('@google/genai');
                            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
                            const prompt = `Parse this travel request into JSON: "${input}". 
Return ONLY valid JSON with keys: destination, startingLocation, travelers (number), budget (Budget/Mid-range/Luxury), style (Relaxed/Adventure/Cultural/Family/Romantic). Leave missing fields blank.`;
                            
                            const response = await ai.models.generateContent({
                                model: 'gemini-2.5-flash',
                                contents: prompt,
                                config: { responseMimeType: "application/json" }
                            });
                            
                            if (response.text) {
                                const data = JSON.parse(response.text);
                                setFormData(prev => ({ ...prev, ...data }));
                            }
                          } catch (err) {
                            console.error("Magic Fill Error:", err);
                          } finally {
                            const btn = document.getElementById('magicFillBtn');
                            if (btn) btn.innerHTML = '✨ Fill';
                          }
                        }}
                        className="bg-white text-[#7C3DB8] dark:text-[#1e1b4b] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#EAE4FC] transition-colors whitespace-nowrap"
                      >
                        ✨ Fill
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Destination</label>
                    <input 
                      type="text" 
                      value={formData.destination}
                      onChange={e => handleChange('destination', e.target.value)}
                      placeholder="e.g. Kyoto, Japan"
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Starting location</label>
                    <input 
                      type="text" 
                      value={formData.startingLocation}
                      onChange={e => handleChange('startingLocation', e.target.value)}
                      placeholder="e.g. Coimbatore, India"
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none transition-colors"
                    />
                  </div>
                </div>
                {errors.err1 && <p className="text-[#E2267A] text-sm mt-3 font-semibold">Add both a destination and a starting point to continue.</p>}
                
                <div className="mt-auto pt-6 flex justify-end">
                  <button onClick={() => goTo(2)} className="bg-[#7C3DB8] dark:bg-[#EAE4FC] dark:text-[#7C3DB8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 dark:hover:bg-white transition-colors">Continue</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                <h1 className="font-serif font-semibold text-3xl mb-2">When are you going, and with whom?</h1>
                <p className="text-[#7C3DB8]/70 dark:text-slate-400 text-sm mb-8">Dates shape the weather, the crowds, and what's worth doing.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Start date</label>
                    <input 
                      type="date" 
                      value={formData.startDate}
                      onChange={e => handleChange('startDate', e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">End date</label>
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={e => handleChange('endDate', e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Number of travelers</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formData.travelers}
                    onChange={e => handleChange('travelers', e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none"
                  />
                </div>
                {errors.err2 && <p className="text-[#E2267A] text-sm mt-3 font-semibold">Check your dates — the trip needs to end after it starts.</p>}

                <div className="mt-auto pt-6 flex justify-between">
                  <button onClick={() => goTo(1)} className="border-2 border-[#EAE4FC] dark:border-slate-600 text-[#7C3DB8] dark:text-slate-300 px-6 py-3 rounded-xl font-semibold hover:border-[#7C3DB8] dark:hover:border-white transition-colors">Back</button>
                  <button onClick={() => goTo(3)} className="bg-[#7C3DB8] dark:bg-[#EAE4FC] dark:text-[#7C3DB8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 dark:hover:bg-white transition-colors">Continue</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                <h1 className="font-serif font-semibold text-3xl mb-2">What kind of trip is this?</h1>
                <p className="text-[#7C3DB8]/70 dark:text-slate-400 text-sm mb-8">This steers the budget split and the pace of each day.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {['Budget', 'Mid-range', 'Luxury'].map(b => (
                        <button 
                          key={b}
                          onClick={() => handleChange('budget', b)}
                          className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${formData.budget === b ? 'bg-[#7C3DB8] dark:bg-[#EAE4FC] border-[#7C3DB8] dark:border-[#EAE4FC] text-white dark:text-[#7C3DB8]' : 'bg-white dark:bg-slate-800 border-[#EAE4FC] dark:border-slate-600 hover:border-[#7C3DB8] dark:hover:border-white'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Travel style</label>
                    <div className="flex flex-wrap gap-2">
                      {['Relaxed', 'Adventure', 'Cultural', 'Family', 'Romantic'].map(s => (
                        <button 
                          key={s}
                          onClick={() => handleChange('style', s)}
                          className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${formData.style === s ? 'bg-[#7C3DB8] dark:bg-[#EAE4FC] border-[#7C3DB8] dark:border-[#EAE4FC] text-white dark:text-[#7C3DB8]' : 'bg-white dark:bg-slate-800 border-[#EAE4FC] dark:border-slate-600 hover:border-[#7C3DB8] dark:hover:border-white'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Food preference</label>
                    <select 
                      value={formData.foodPreference}
                      onChange={e => handleChange('foodPreference', e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none"
                    >
                      <option>No restrictions</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Halal</option>
                      <option>Gluten-free</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                {errors.err3 && <p className="text-[#E2267A] text-sm mt-3 font-semibold">Pick a budget and a travel style to continue.</p>}

                <div className="mt-auto pt-6 flex justify-between">
                  <button onClick={() => goTo(2)} className="border-2 border-[#EAE4FC] dark:border-slate-600 text-[#7C3DB8] dark:text-slate-300 px-6 py-3 rounded-xl font-semibold hover:border-[#7C3DB8] dark:hover:border-white transition-colors">Back</button>
                  <button onClick={() => goTo(4)} className="bg-[#7C3DB8] dark:bg-[#EAE4FC] dark:text-[#7C3DB8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 dark:hover:bg-white transition-colors">Continue</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                <h1 className="font-serif font-semibold text-3xl mb-2">Anything specific in mind?</h1>
                <p className="text-[#7C3DB8]/70 dark:text-slate-400 text-sm mb-8">Optional — skip any of this and we'll research good options for you.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Hotels you're considering</label>
                    <input 
                      type="text" 
                      value={formData.hotelsNote}
                      onChange={e => handleChange('hotelsNote', e.target.value)}
                      placeholder="e.g. a ryokan near Gion"
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Restaurants or cuisines on your list</label>
                    <input 
                      type="text" 
                      value={formData.restaurantsNote}
                      onChange={e => handleChange('restaurantsNote', e.target.value)}
                      placeholder="e.g. a good sushi counter"
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Places or attractions you don't want to miss</label>
                    <textarea 
                      value={formData.attractionsNote}
                      onChange={e => handleChange('attractionsNote', e.target.value)}
                      placeholder="e.g. Fushimi Inari, day trip to Nara"
                      className="w-full p-3 rounded-xl border-2 border-[#EAE4FC] dark:border-slate-700 dark:bg-slate-900 focus:border-[#7C3DB8] outline-none min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-6 flex justify-between">
                  <button onClick={() => goTo(3)} className="border-2 border-[#EAE4FC] dark:border-slate-600 text-[#7C3DB8] dark:text-slate-300 px-6 py-3 rounded-xl font-semibold hover:border-[#7C3DB8] dark:hover:border-white transition-colors">Back</button>
                  <button onClick={() => goTo(5)} className="bg-[#7C3DB8] dark:bg-[#EAE4FC] dark:text-[#7C3DB8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 dark:hover:bg-white transition-colors">Review</button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                <h1 className="font-serif font-semibold text-3xl mb-2">Ready to print your itinerary brief</h1>
                <p className="text-[#7C3DB8]/70 dark:text-slate-400 text-sm mb-6">Check the details on your boarding pass, then send it off.</p>
                
                <div className="space-y-3 mb-6 bg-[#EAE4FC]/30 dark:bg-slate-900 p-5 rounded-2xl border border-[#EAE4FC] dark:border-slate-700">
                  <div className="flex justify-between border-b border-[#EAE4FC] dark:border-slate-700 pb-2"><span className="text-[#7C3DB8]/70 dark:text-slate-400 font-semibold">Destination</span><span className="font-medium">{formData.destination}</span></div>
                  <div className="flex justify-between border-b border-[#EAE4FC] dark:border-slate-700 pb-2"><span className="text-[#7C3DB8]/70 dark:text-slate-400 font-semibold">Starting location</span><span className="font-medium">{formData.startingLocation}</span></div>
                  <div className="flex justify-between border-b border-[#EAE4FC] dark:border-slate-700 pb-2"><span className="text-[#7C3DB8]/70 dark:text-slate-400 font-semibold">Dates</span><span className="font-medium">{fmtDate(formData.startDate)} → {fmtDate(formData.endDate)}</span></div>
                  <div className="flex justify-between border-b border-[#EAE4FC] dark:border-slate-700 pb-2"><span className="text-[#7C3DB8]/70 dark:text-slate-400 font-semibold">Travelers</span><span className="font-medium">{formData.travelers}</span></div>
                  <div className="flex justify-between border-b border-[#EAE4FC] dark:border-slate-700 pb-2"><span className="text-[#7C3DB8]/70 dark:text-slate-400 font-semibold">Budget</span><span className="font-medium">{formData.budget}</span></div>
                  <div className="flex justify-between"><span className="text-[#7C3DB8]/70 dark:text-slate-400 font-semibold">Travel style</span><span className="font-medium">{formData.style}</span></div>
                </div>

                <div className="mt-auto pt-6 flex justify-between">
                  <button onClick={() => goTo(4)} className="border-2 border-[#EAE4FC] dark:border-slate-600 text-[#7C3DB8] dark:text-slate-300 px-6 py-3 rounded-xl font-semibold hover:border-[#7C3DB8] dark:hover:border-white transition-colors">Back</button>
                  <button onClick={submitTrip} className="bg-[#7C3DB8] dark:bg-[#EAE4FC] dark:text-[#7C3DB8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 dark:hover:bg-white transition-colors">Generate my plan</button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#7C3DB8] dark:bg-[#EAE4FC] text-white dark:text-[#7C3DB8] flex items-center justify-center text-3xl mb-6 font-bold shadow-lg shadow-[#7C3DB8]/30">✓</div>
                <h1 className="font-serif font-semibold text-3xl mb-3 text-[#7C3DB8] dark:text-white">Sent to Voyana AI</h1>
                <p className="text-[#7C3DB8]/70 dark:text-slate-400 max-w-sm">Your trip brief is on its way to the chat — your personalized plan will appear there next.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
