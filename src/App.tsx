import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // ✅ FIXED (default import)
import { Sidebar } from "./components/Sidebar";
import { PromoBanner } from "./components/PromoBanner";
import { LiveEventCard } from "./components/LiveEventCard";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Optional Promo Banner */}
        <PromoBanner />

        {/* Routes */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;