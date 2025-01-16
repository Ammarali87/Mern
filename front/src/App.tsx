import { Outlet } from "react-router-dom";
import "./App.css"; // Assuming styles are centralized here
import Navbar from "../src/components/Navbar"
import Footer from "../src/components/Footer"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">     
           <Navbar/>
      {/* Main content */}
      <main className="flex-grow-1 mt-5">
        <div className="container py-4">
          <Outlet />
        </div>
      </main>

     <Footer/>
       
    </div>
  );
}

export default App;
