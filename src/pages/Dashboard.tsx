import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Plane, ArrowRight, Clock, MapPin, AlertCircle } from 'lucide-react';

const mockData = {
  roadmap: {
    recommendedMethod: "Flight",
    estimatedDuration: "2 hours 45 minutes",
    departurePoint: "JFK International Airport (New York)",
    arrivalPoint: "Miami International Airport (Florida)",
    suggestedDepartureTime: "Morning (08:00 AM)",
    localTransport: "Rental Car or Uber",
    travelTips: [
      "Arrive at JFK at least 2 hours before departure.",
      "Keep digital copies of ID and booking confirmation.",
      "Miami traffic can be heavy around 4-6 PM."
    ]
  },
  budgetEstimate: {
    minimumCost: 800,
    averageCost: 1500,
    luxuryCost: 3500,
    breakdown: {
      transportation: 450,
      accommodation: 600,
      food: 300,
      activities: 100,
      shopping: 0,
      emergency: 50
    }
  }
};

const COLORS = ['#E2267A', '#D67ACB', '#7C3DB8', '#7FC7B7', '#127A78', '#E8E16D'];

export default function Dashboard() {
  const pieData = Object.entries(mockData.budgetEstimate.breakdown).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Your Travel Dashboard</h1>
        <p className="text-gray-600 mt-2">New York → Miami • 5 Days • 2 Travelers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Travel Roadmap */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-soft-serve/50 border border-soft-serve">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-disco-queen/10 rounded-xl text-disco-queen">
              <Plane className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Travel Roadmap</h2>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-razzle-dazzle/10 flex items-center justify-center flex-shrink-0 z-10">
                <MapPin className="w-5 h-5 text-razzle-dazzle" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase">Departure</p>
                <p className="text-lg font-semibold text-gray-900">{mockData.roadmap.departurePoint}</p>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" /> {mockData.roadmap.suggestedDepartureTime}
                </p>
              </div>
            </div>

            <div className="ml-5 border-l-2 border-dashed border-gray-300 pl-8 py-4 my-2">
              <div className="bg-soft-serve/40 rounded-xl p-4 inline-block">
                <p className="font-bold text-disco-queen">{mockData.roadmap.recommendedMethod}</p>
                <p className="text-sm text-gray-600">Est. Duration: {mockData.roadmap.estimatedDuration}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-opal/20 flex items-center justify-center flex-shrink-0 z-10">
                <MapPin className="w-5 h-5 text-star-board" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase">Arrival</p>
                <p className="text-lg font-semibold text-gray-900">{mockData.roadmap.arrivalPoint}</p>
                <p className="text-gray-600 mt-1">Local Transport: {mockData.roadmap.localTransport}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-flip-side/20 rounded-2xl p-5 border border-flip-side/40">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" /> Travel Tips
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              {mockData.roadmap.travelTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Budget Estimator */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-soft-serve/50 border border-soft-serve">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-helio/10 rounded-xl text-helio">
              <span className="font-bold text-xl">$</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Budget Estimator</h2>
          </div>

          <div className="flex justify-between items-center bg-soft-serve/30 rounded-2xl p-4 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">Minimum</p>
              <p className="font-bold text-lg text-gray-900">${mockData.budgetEstimate.minimumCost}</p>
            </div>
            <div className="text-center bg-white px-6 py-2 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-disco-queen font-bold uppercase tracking-wider">Average</p>
              <p className="font-extrabold text-2xl text-gray-900">${mockData.budgetEstimate.averageCost}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">Luxury</p>
              <p className="font-bold text-lg text-gray-900">${mockData.budgetEstimate.luxuryCost}</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
