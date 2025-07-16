import Header from "./pages/landing/components/header/Header";
import Hero from "./pages/landing/components/main/Hero"
import Features from "./pages/landing/components/main/Features";
import CtaBanner from "./pages/landing/components/main/CtaBanner";
import Testimonials from "./pages/landing/components/main/Testimonials";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <CtaBanner />
      <Testimonials />
    </div>
  );
}

export default App;
