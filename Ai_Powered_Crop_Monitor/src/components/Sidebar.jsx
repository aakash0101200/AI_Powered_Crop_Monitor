import { Button } from "@heroui/react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'data-handling', label: 'Data Handling', icon: '📊' },
    { id: 'preprocessing', label: 'Preprocessing', icon: '🔧' },
    { id: 'feature-extraction', label: 'Feature Extraction', icon: '🔍' },
    { id: 'ai-models', label: 'AI Models', icon: '🤖' },
    { id: 'prediction', label: 'Prediction System', icon: '🔮' },
    { id: 'visualization', label: 'Visualization', icon: '📈' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-gray-900">AgriSpectra</h1>
            <p className="text-sm text-gray-500">Hyperspectral Imaging</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "solid" : "ghost"}
              color={activeSection === item.id ? "primary" : "default"}
              className={`w-full justify-start ${
                activeSection === item.id 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-700 hover:bg-green-50'
              }`}
              startContent={<span className="text-lg">{item.icon}</span>}
              onPress={() => setActiveSection(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">System Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Hyperspectral</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">AI Models</span>
              <span className="text-green-600 font-medium">Running</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sensors</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
