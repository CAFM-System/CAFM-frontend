import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./Herosection";
import FeaturesSection from "./Feature";
import AboutSection from "./About";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import { useTheme } from "../../hooks/useTheme";

export default function Home() {
    const { isDarkMode } = useTheme();
    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-secondary text-primary" : "bg-primary text-secondary"}`}>
            <Navbar/>
            <HeroSection/>
            <FeaturesSection/>
            <AboutSection/>
            <ContactUs/>
            <Footer/>

        </div>
    )
}