import LandingNav from "../components/landingNav";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import PowerfulInsights from "../components/Powerfulinsights";
import TechStack from "../components/TechStack";
import LandingFooter from "../components/LandingFooter";
const LandingPage = () => (
    <div className="min-h-screen bg-[#141414] text-[#E2F0F0] font-sans overflow-x-hidden">
        <LandingNav />
        <HeroSection />
        <HowItWorks />
        <PowerfulInsights />
        <TechStack />
        <LandingFooter />
    </div>
);

export default LandingPage;