import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./Herosection";
import FeaturesSection from "./Feature";
import AboutSection from "./About";
import Footer from "./Footer";
import ContactUs from "./ContactUs";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar/>
            <HeroSection/>
            <FeaturesSection/>
            <AboutSection/>
            <ContactUs/>
            <Footer/>

        </div>
    )
}