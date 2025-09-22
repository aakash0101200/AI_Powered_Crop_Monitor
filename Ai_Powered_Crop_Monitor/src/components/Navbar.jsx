import { Button } from "@heroui/react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">AgriSpectra</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#dashboard" className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Dashboard
              </a>
              <a href="#imaging" className="text-gray-500 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Imaging
              </a>
              <a href="#analysis" className="text-gray-500 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Analysis
              </a>
              <a href="#reports" className="text-gray-500 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Reports
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hidden sm:flex text-gray-700 hover:text-green-600"
            >
              Sign In
            </Button>
            <Button 
              color="primary" 
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
