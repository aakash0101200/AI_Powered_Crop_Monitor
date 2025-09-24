import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import FeatureCard from "./FeatureCard";
import StatCard from "./StatCard";
import GraphCard from "./GraphCard";
import tractorImage from "../assets/gem1.png";

export default function AkDmmy() {
  return (
    <>
      <div className = "grid col-end-4 gap-5">
        <div className="lg:col-span-4 lg:col-start-1">
          <FeatureCard
            imageSrc={tractorImage}
            title="Unified Software Platform"
            description="Our system ingests and aligns image sequences with historical data, extracts key indices, and applies deep learning models to detect trends and predict risks."
            buttonText="Explore Features"
          />
        </div>

        <div className="lg:col-span-4 lg:col-start-5 flex flex-col sm:flex-row lg:flex-col gap-6 h-[30%]">
          <StatCard
            title="AI-Driven Analysis"
            metric="Real-Time"
            description="Detect trends and predict vegetation stress or disease risk using deep learning models."
          />
         </div>
         <div className="lg:col-span-4 lg:col-start-5 flex flex-col sm:flex-row lg:flex-col gap-6 h-[80%]">
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
    </>
  );
}
