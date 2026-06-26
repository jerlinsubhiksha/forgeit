import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import TripPlanningForm from "./pages/TripPlanningForm";
import Dashboard from "./pages/Dashboard";

// Placeholder pages
const AuthPage = () => <div className="p-10 text-center font-bold text-3xl">Auth Page</div>;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="plan" element={<TripPlanningForm />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
