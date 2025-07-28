import Header from "./pages/landing/components/header/Header";
import Hero from "./pages/landing/components/main/Hero/Hero"
import Features from "./pages/landing/components/main/Features/Features";
import CtaBanner from "./pages/landing/components/main/CtaBanner/CtaBanner";
import Testimonials from "./pages/landing/components/main/Testimonials/Testimonials";
import Footer from "./pages/landing/components/main/Footer/Footer";

import Dashboard from "./pages/admin/dashboard/layout/Dashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <CtaBanner />
      <Testimonials />
      <Footer />
      <Dashboard />
    </div>
  );
}

export default App;
