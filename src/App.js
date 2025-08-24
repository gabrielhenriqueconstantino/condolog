import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutLanding from "./pages/landing/layout/LayoutLanding";
import Login from "./pages/admin/Login/Login";
//import Dashboard from './pages/admin/Dashboard/layout/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutLanding />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
