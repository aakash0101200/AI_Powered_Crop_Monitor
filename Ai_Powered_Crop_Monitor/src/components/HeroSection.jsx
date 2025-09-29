import React from "react";
import { Button } from "@heroui/react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import HeroSlider from "./HeroSlider";

// KPI component
const KPI = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="text-3xl md:text-4xl font-extrabold text-white">{value}</div>
    <div className="text-sm text-white/80">{label}</div>
  </div>
);

export default function HeroSection() {
  return (
    <section
      role="banner"
      aria-label="Hero - AI-powered crop monitoring"
      className="relative overflow-hidden"
    >
      {/* Background Slider */}
      <HeroSlider />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="mb-4 inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white">
            Advanced Hyperspectral & Remote Sensing
          </div>

          {/* Main Heading */}
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            AI-powered insights for{" "}
            <span className="block md:inline text-leaf-2">precision agriculture</span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
            Combine satellite & drone imagery with ground sensors to monitor crop health,
            detect disease early, and make field-level recommendations that boost yield and reduce inputs.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              color="primary"
              size="lg"
              aria-label="Request demo"
              className="bg-white text-leaf-700 px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-[1.02] transition transform"
            >
              Request a demo
            </Button>

            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-0 sm:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/40 bg-white/10 hover:bg-white/20 transition text-white font-medium"
              aria-label="View features"
            >
              View analysis
            </button>
          </div>

          {/* KPIs - visible md+ only */}
          <div className="mt-10 hidden md:flex justify-center gap-12">
            <KPI value="220" label="Spectral bands" />
            <KPI value="94.2%" label="Detection accuracy" />
            <KPI value="156" label="Active fields" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2">
          <a
            href="#features"
            aria-label="Scroll to features"
            className="inline-flex items-center justify-center w-10 h-16 rounded-full border-2 border-white/40"
          >
            <IoIosArrowDown className="text-xl animate-bounce text-white/90" />
          </a>
        </div>
      </div>
    </section>
  );
}
