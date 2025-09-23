// import { Button } from "@heroui/react";

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           {/* <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">AI</span>
//               </div>
//               <span className="ml-3 text-xl font-bold text-gray-900">AgriSpectra</span>
//             </div>
//           </div> */}

//           {/* Navigation Links */}
//           {/* <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               <a href="#dashboard" className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
//                 Dashboard
//               </a>
//               <a href="#imaging" className="text-gray-500 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
//                 Imaging
//               </a>
//               <a href="#analysis" className="text-gray-500 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
//                 Analysis
//               </a>
//               <a href="#reports" className="text-gray-500 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
//                 Reports
//               </a>
//             </div>
//           </div> */}

//           {/* CTA Buttons */}
//           {/* <div className="flex items-center space-x-4">
//             <Button 
//               variant="ghost" 
//               className="hidden sm:flex text-gray-700 hover:text-green-600"
//             >
//               Sign In
//             </Button>
//             <Button 
//               color="primary" 
//               className="bg-green-600 hover:bg-green-700 text-white px-6"
//             >
//               Get Started
//             </Button>
//           </div> */}

//           {/* Mobile menu button */}
//           {/* <div className="md:hidden">
//             <Button variant="ghost" size="sm">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </Button>
//           </div> */}
//         </div>
//       </div>
//     </nav>
//   );
// }

import React from 'react';

// An array to hold all the navigation links
const navItems = ["Home", "About", "services", "Updates", "Shares"];

const Navbar = () => {
  return (
    // The header is positioned absolutely at the top
    <header className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 md:p-6">
      <nav className="mx-auto flex justify-center ">
        {/* This ul creates the semi-transparent "pill" effect */}
        {/* <ul className="flex items-center space-x-8 bg-white/20 backdrop-blur-md p-4 rounded-full shadow-lg"> */}
        <ul    className="
            flex items-stretch 
             sm:space-x-6  md:space-x-8 lg:space-x-10 
            bg-white/20 backdrop-blur-md 
            px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 
            rounded-3xl shadow-lg 
            text-xs sm:text-sm md:text-base lg:text-lg
          ">
          {navItems.map((item) => (
            <li key={item}>
              <a 
                href="#" 
                className={`text-gray-800 hover:text-green-700 transition-colors px-2 
                  ${item === "Home page" ? "font-bold text-green-800" : ""}
                `}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;