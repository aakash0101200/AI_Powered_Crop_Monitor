import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";

import tractorImage from "../assets/gem1.png";

function Home() {
  return (
    <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">

      {/* Hero section already in top */}
      <div className="lg:col-span-12">
        <HeroSection />
      </div>

      {/* Feature Card - takes 4/12 columns */}
      <div className="lg:col-span-4">
        <FeatureCard
          imageSrc={tractorImage}
          title="Unified Software Platform"
          description="Our system ingests and aligns image sequences with historical data, extracts key indices, and applies deep learning models to detect trends and predict risks."
          buttonText="Explore Features"
        />
      </div>

      

    </div>
  );
}

export default Home;
