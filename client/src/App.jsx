import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="max-w-screen-xl container mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
