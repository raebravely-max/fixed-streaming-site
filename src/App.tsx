import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { PromoBanner } from "./components/PromoBanner";
import { LiveEventCard } from "./components/LiveEventCard";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <Header />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Main Content */}
        <div className="p-6 space-y-6">

          {/* Featured Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Featured Events
            </h1>
          </div>

          {/* Example Live Cards */}
          <LiveEventCard />

        </div>

      </div>
    </div>
  );
}

export default App;