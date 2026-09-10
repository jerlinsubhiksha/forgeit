import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlaneTakeoff, Loader2 } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';

const quotes = [
  "Adventure awaits around every corner.",
  "Travel is the only thing you buy that makes you richer.",
  "To travel is to live."
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const { login } = useAuth();

  // Rotating quotes effect
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Send access token to backend to verify and create session
        const { data } = await apiClient.post('/auth/google', {
          token: (tokenResponse as any).credential || tokenResponse.access_token,
        });
        
        login(data, data.token);
        toast.success(`Welcome back, ${data.name.split(' ')[0]}!`);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login Failed', error);
        toast.error('Failed to log in with Google.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error('Google Sign-In failed.');
    }
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Split-screen visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-disco-queen to-helio relative overflow-hidden items-center justify-center">
        {/* Abstract background shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-razzle-dazzle/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-white px-12 text-center">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md mb-8">
            <PlaneTakeoff className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Welcome Back</h1>
          
          <div className="h-20 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl font-medium text-white/90"
              >
                "{quotes[quoteIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-soft-serve/20">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-soft-serve/50 border border-white">
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="p-2 bg-gradient-to-tr from-disco-queen to-helio rounded-xl mb-4">
              <PlaneTakeoff className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Voyana AI</h2>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
          <p className="text-gray-500 mb-8">Welcome to Voyana AI. Sign in to start planning your next journey.</p>

          <div className="flex flex-col items-center justify-center space-y-6">
            <button 
              type="button"
              onClick={() => googleLogin()}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-lg hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-70 disabled:active:scale-100 focus:outline-none focus:ring-4 focus:ring-disco-queen/20"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin text-disco-queen" />
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
            
            <p className="text-sm text-gray-400">Secure, one-click authentication.</p>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account? <Link to="/register" className="font-bold text-disco-queen hover:text-razzle-dazzle transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
