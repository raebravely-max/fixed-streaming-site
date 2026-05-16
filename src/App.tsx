import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Home</h1>
        </div>
      </div>
    </div>
  );
}

export default App;