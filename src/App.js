import Header from "./pages/landing/components/header/Header";
import Hero from "./pages/landing/components/main/Hero"
import Features from "./pages/landing/components/main/Features";
import CtaBanner from "./pages/landing/components/main/CtaBanner";
import Testimonials from "./pages/landing/components/main/Testimonials";
import Footer from "./pages/landing/components/main/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
