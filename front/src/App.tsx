import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 className="text-center mt-4">Amazon</h1>
      {/* Nested routes will render here */}
      <Outlet />
    </div>
  );
}

export default App;
