// import { Button } from "@heroui/react";

// export default function Sidebar({ activeSection, setActiveSection }) {
//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
//     { id: 'data-handling', label: 'Data Handling', icon: '📊' },
//     { id: 'preprocessing', label: 'Preprocessing', icon: '🔧' },
//     { id: 'feature-extraction', label: 'Feature Extraction', icon: '🔍' },
//     { id: 'ai-models', label: 'AI Models', icon: '🤖' },
//     { id: 'prediction', label: 'Prediction System', icon: '🔮' },
//     { id: 'visualization', label: 'Visualization', icon: '📈' }
//   ];

//   return (
//     <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
//       <div className="p-6">
//         <div className="flex items-center mb-8">
//           <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">AI</span>
//           </div>
//           <div className="ml-3">
//             <h1 className="text-xl font-bold text-gray-900">AgriSpectra</h1>
//             <p className="text-sm text-gray-500">Hyperspectral Imaging</p>
//           </div>
//         </div>

//         <nav className="space-y-2">
//           {menuItems.map((item) => (
//             <Button
//               key={item.id}
//               variant={activeSection === item.id ? "solid" : "ghost"}
//               color={activeSection === item.id ? "primary" : "default"}
//               className={`w-full justify-start ${
//                 activeSection === item.id 
//                   ? 'bg-green-600 text-white' 
//                   : 'text-gray-700 hover:bg-green-50'
//               }`}
//               startContent={<span className="text-lg">{item.icon}</span>}
//               onPress={() => setActiveSection(item.id)}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </nav>

//         <div className="mt-8 p-4 bg-green-50 rounded-lg">
//           <h3 className="font-semibold text-green-800 mb-2">System Status</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Hyperspectral</span>
//               <span className="text-green-600 font-medium">Active</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">AI Models</span>
//               <span className="text-green-600 font-medium">Running</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Sensors</span>
//               <span className="text-green-600 font-medium">Online</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
import React from 'react';
import { 
  FaTachometerAlt, FaChartLine, FaTint, FaBug, FaFileAlt, FaLeaf 
} from 'react-icons/fa';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const menuItems = [
  { title: 'Dashboard', icon: FaTachometerAlt, href: '#dashboard' },
  { title: 'Crop Health', icon: FaChartLine, href: '#crop-health' },
  { title: 'Soil Data', icon: FaTint, href: '#soil-data' },
  { title: 'Pest Alerts', icon: FaBug, href: '#alerts' },
  { title: 'Reports', icon: FaFileAlt, href: '#reports' },
];

// MODIFICATION: The component now receives props from App.jsx
/**
 * @param {{ isCollapsed: boolean, toggleSidebar: () => void }} props
 */
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    // MODIFICATION: Changed to a fixed position to stay on screen when scrolling
    <aside 
      className={`not-sm:hidden fixed top-0 left-0 h-screen bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-bold text-lg text-green-800">Agri-AI</h2>}
        {/* MODIFICATION: The button now calls the function from props */}
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-200">
          {isCollapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
      </div>

      <hr className="border-gray-200 mx-4" />

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <a 
                href={item.href} 
                className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100 hover:text-green-800 ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.title : ''} // Add tooltip when collapsed
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-gray-200 mx-4" />

      <div className="p-4">
        <div className={`flex items-center p-2 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <FaLeaf className="h-8 w-8 text-green-700 shrink-0" />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-semibold text-sm">Green Valley Farms</p>
              <p className="text-xs text-gray-500">Agronomist</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;