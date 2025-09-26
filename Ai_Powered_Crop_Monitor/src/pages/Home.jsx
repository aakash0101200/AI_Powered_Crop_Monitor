import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/Features";
import StatCard from "../components/StatCard";
import GraphCard from "../components/GraphCard";

import tractorImage from "../assets/gem1.png";

function Home() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-12">
        <HeroSection />
      </div>

      <div className="lg:col-span-4 lg:col-start-1">
        <FeatureCard
          imageSrc={tractorImage}
          title="Unified Software Platform"
          description="Our system ingests and aligns image sequences with historical data, extracts key indices, and applies deep learning models to detect trends and predict risks."
          buttonText="Explore Features"
        />
      </div>

      <div className="lg:col-span-4 lg:col-start-5 flex flex-col sm:flex-row lg:flex-col gap-6">
        <StatCard
          title="AI-Driven Analysis"
          metric="Real-Time"
          description="Detect trends and predict vegetation stress or disease risk using deep learning models."
        />
        <StatCard
          title="Integrated Sensor Data"
          metric="+30% Accuracy"
          description="Fuse soil moisture, air temperature, and humidity to contextualize spectral anomalies."
        />
      </div>

      <div className="lg:col-span-4 lg:col-start-9">
        <GraphCard />
      </div>
    </div>
  );
}

export default Home;
