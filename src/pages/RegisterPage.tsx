import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlaneTakeoff, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^A-Za-z0-9]/)) score++;
    return score;
  };

  const strength = calculateStrength(password);
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-serve/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-soft-serve/50 border border-white">
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-2 bg-gradient-to-tr from-disco-queen to-helio rounded-xl mb-4">
            <PlaneTakeoff className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join Voyana AI</h2>
          <p className="text-gray-500 mt-2 text-center">Start planning smarter, more beautiful trips today.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen focus:ring-2 focus:ring-disco-queen/20 outline-none transition-all"
                placeholder="Jane Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen focus:ring-2 focus:ring-disco-queen/20 outline-none transition-all"
                placeholder="hello@voyana.ai"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen focus:ring-2 focus:ring-disco-queen/20 outline-none transition-all"
                placeholder="Create a strong password"
                required
              />
            </div>
            
            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-full rounded-full ${
                      i < strength 
                        ? (strength < 2 ? 'bg-coral' : strength < 4 ? 'bg-flip-side' : 'bg-opal')
                        : 'bg-gray-200'
                    }`} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Country (Optional)</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all"
                placeholder="e.g. USA"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Travel Style (Optional)</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-disco-queen outline-none transition-all bg-white">
                <option value="">Select style...</option>
                <option value="adventure">Adventure</option>
                <option value="luxury">Luxury</option>
                <option value="budget">Backpacking</option>
              </select>
            </div>
          </div>

          <label className="flex items-start cursor-pointer mt-4">
            <input type="checkbox" required className="rounded border-gray-300 text-disco-queen focus:ring-disco-queen mt-1 mr-3" />
            <span className="text-sm text-gray-600">
              I agree to the <a href="#" className="font-bold text-disco-queen hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-disco-queen hover:underline">Privacy Policy</a>.
            </span>
          </label>

          <button 
            type="submit" 
            disabled={loading || strength < 2}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-disco-queen to-helio text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account? <Link to="/login" className="font-bold text-disco-queen hover:text-razzle-dazzle transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
