import Header from "../components/header/Header.jsx";
import Hero from "../components/main/Hero/Hero"
import Features from "../components/main/Features/Features";
import CtaBanner from "../components/main/CtaBanner/CtaBanner";
import Testimonials from "../components/main/Testimonials/Testimonials";
import Footer from "../components/main/Footer/Footer";
import FormContact from "../components/main/FormContact/FormContact";

const LayoutLanding = () => {
    return(
        <div className="Landing">
            <Header />
            <Hero />
            <Features />
            <CtaBanner />
            <Testimonials />
            <FormContact />
            <Footer />
        </div>
    );
}

export default LayoutLanding;