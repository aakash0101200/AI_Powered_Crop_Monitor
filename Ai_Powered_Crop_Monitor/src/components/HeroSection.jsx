import { Button } from "@heroui/react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            🌈 Advanced Hyperspectral Imaging Technology
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Advanced Hyperspectral
          <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
            Crop Monitoring
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Monitor crop health, detect diseases, and optimize yields using advanced 
          hyperspectral imaging and multispectral analysis powered by AI technology.
        </p>
        
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">220</div>
            <div className="text-sm opacity-80">Spectral Bands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">94.2%</div>
            <div className="text-sm opacity-80">Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">156</div>
            <div className="text-sm opacity-80">Active Fields</div>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            color="primary" 
            size="lg"
            className="bg-white text-green-700 font-semibold px-10 py-4 text-lg hover:bg-green-50 transition-all duration-300 shadow-xl"
          >
            Start Monitoring
          </Button>
          <Button 
            variant="bordered" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-10 py-4 text-lg transition-all duration-300 backdrop-blur-sm"
          >
            View Analysis
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-75">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>Research Grade</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🔒</span>
            <span>Secure Data</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📊</span>
            <span>Real-Time Analysis</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
