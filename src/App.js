import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutLanding from "./pages/landing/layout/LayoutLanding.jsx";
import Login from "./pages/Login/Login.jsx";
// import Dashboard from "./pages/admin/dashboard/layout/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutLanding />} />
        <Route path="/login" element={<Login />} />
        {/* Outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;