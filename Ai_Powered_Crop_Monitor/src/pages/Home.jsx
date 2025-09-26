import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/Features";
import StatCard from "../components/StatCard";
import GraphCard from "../components/GraphCard";

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

      {/* Stat Cards - 4/12 columns, stacked vertically on small screens */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* <StatCard
          title="AI-Driven Analysis"
          metric="Real-Time"
          description="Detect trends and predict vegetation stress or disease risk using deep learning models."
        />
        <StatCard
          title="Integrated Sensor Data"
          metric="+30% Accuracy"
          description="Fuse soil moisture, air temperature, and humidity to contextualize spectral anomalies."
        /> */}
      </div>

      {/* Graph Card - 4/12 columns
      <div className="lg:col-span-4">
        <GraphCard />
      </div> */}
    </div>
  );
}

export default Home;
