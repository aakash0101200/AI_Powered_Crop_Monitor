import { Button } from "@heroui/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-cover w-full bg-[url('/farm-bg.jpg')] bg-center text-white flex justify-center">
      <div className="absolute inset-0 bg-black/50">
      </div>

      <div className="relative text-center mt-20 p-4">
        <h1 className="text-5xl font-extrabold">Invest in the Future of Smart Agriculture</h1>
        <p className="mt-4 text-lg opacity-90">Sustainable, profitable, and data‑driven farming solutions.</p>
      </div>
    </section>
  );
}
