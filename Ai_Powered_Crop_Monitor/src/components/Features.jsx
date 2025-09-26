// src/components/Features.jsx
import React from "react";
import { Button, image } from "@heroui/react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaSatellite,
  FaSeedling,
  FaChartLine,
  FaShieldAlt,
  FaCogs,
} from "react-icons/fa";

const FEATURES = [
  {
    id: "field-insights",
    imageSrc: null,
    icon: FaLeaf,
    title: "Field-level Insights",
    desc:
      "Per-field analytics with plant health maps, stress hotspots, and automated thresholds to prioritize interventions.",
    href: "#",
  },
  {
    id: "remote-sensing",
    icon: FaSatellite,
    title: "Satellite & Drone Imaging",
    desc:
      "Combine high-res drone data with multispectral & hyperspectral satellite feeds for accurate diagnostics.",
  },
  {
    id: "soil-sensors",
    icon: FaSeedling,
    title: "Soil & Weather Sensing",
    desc:
      "Integrate soil moisture, temperature and weather forecasts for reliable irrigation and nutrient recommendations.",
  },
  {
    id: "predictive-ai",
    icon: FaChartLine,
    title: "Predictive Models",
    desc:
      "AI models predict disease risk and yield outcomes so you can act with confidence before problems escalate.",
  },
  {
    id: "data-security",
    icon: FaShieldAlt,
    title: "Secure & Compliant",
    desc:
      "Data privacy, secure storage, and role-based access controls so your farm data stays safe and shareable only as needed.",
  },
  {
    id: "workflows",
    icon: FaCogs,
    title: "Actionable Workflows",
    desc:
      "From alerts to task assignments — close the loop with recommended actions and field-task tracking.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Features() {
  return (
    <section
      id="features"
      aria-label="Features"
      className="relative py-16 md:py-24 bg-ui-bg-2"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <p className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-cream text-ui-text/90">
            Platform
          </p>
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-ui-text">
            Everything you need for precision farming
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-ui-muted">
            Field-scale analytics, secure data, and automated recommendations — built for agronomists and growers.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, idx) => (
          <FeatureCard
            key={f.id}
            imageSrc={f.imageSrc}
            Icon={f.Icon}
            title={f.title}
            description={f.desc}
            href={f.href}
          />
          
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-ui-text">Ready to see it in action?</h4>
            <p className="text-sm text-ui-muted mt-1">Request a demo or get a custom field assessment.</p>
          </div>

          <div className="flex gap-3">
            <Button
              color="primary"
              size="md"
              className="rounded-full px-6 py-2 bg-leaf-2 text-white hover:bg-leaf-2/90 shadow"
              aria-label="Request a demo"
            >
              Request demo
            </Button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-ui-border text-sm text-ui-text bg-ui-bg hover:bg-ui-bg-3"
              aria-label="Contact sales"
            >
              Contact sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
