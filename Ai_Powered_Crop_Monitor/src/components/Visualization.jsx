import { useState } from 'react';
import { Button, Card, CardBody, Tabs, Tab, Chip } from "@heroui/react";

export default function Visualization() {
  const [activeTab, setActiveTab] = useState('maps');

  const timeSeriesData = [
    { date: '2024-01-01', ndvi: 0.65, moisture: 45, temperature: 22 },
    { date: '2024-01-02', ndvi: 0.68, moisture: 48, temperature: 24 },
    { date: '2024-01-03', ndvi: 0.72, moisture: 52, temperature: 26 },
    { date: '2024-01-04', ndvi: 0.69, moisture: 49, temperature: 23 },
    { date: '2024-01-05', ndvi: 0.71, moisture: 51, temperature: 25 },
    { date: '2024-01-06', ndvi: 0.74, moisture: 55, temperature: 27 },
    { date: '2024-01-07', ndvi: 0.76, moisture: 58, temperature: 28 }
  ];

  const vegetationMaps = [
    { name: 'NDVI Map', type: 'Vegetation Index', status: 'Generated' },
    { name: 'False Color Composite', type: 'RGB Composite', status: 'Generated' },
    { name: 'SAVI Map', type: 'Soil Adjusted Index', status: 'Generated' },
    { name: 'EVI Map', type: 'Enhanced Vegetation Index', status: 'Generated' }
  ];

  const riskZones = [
    { zone: 'Zone A', risk: 'Low', area: '2.5 acres', color: 'green' },
    { zone: 'Zone B', risk: 'Low', area: '3.2 acres', color: 'green' },
    { zone: 'Zone C', risk: 'High', area: '1.8 acres', color: 'red' },
    { zone: 'Zone D', risk: 'Medium', area: '2.9 acres', color: 'yellow' }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visualization & Reporting</h1>
          <p className="text-gray-600 mt-2">Interactive maps, charts, and comprehensive reports</p>
        </div>
        <Button 
          color="primary" 
          className="bg-green-600 hover:bg-green-700"
        >
          Generate Report
        </Button>
      </div>

      {/* Visualization Tabs */}
      <Card>
        <CardBody className="p-0">
          <Tabs 
            selectedKey={activeTab} 
            onSelectionChange={setActiveTab}
            className="w-full"
            classNames={{
              tabList: "bg-gray-100",
              tab: "data-[selected=true]:bg-white data-[selected=true]:text-green-600"
            }}
          >
            <Tab key="maps" title="Health Maps">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vegetationMaps.map((map, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardBody className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{map.name}</h3>
                          <Chip color="success" size="sm">{map.status}</Chip>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{map.type}</p>
                        <div className="bg-gradient-to-r from-green-200 to-blue-200 h-32 rounded-lg flex items-center justify-center">
                          <span className="text-gray-700 font-medium">{map.name}</span>
                        </div>
                        <Button size="sm" className="w-full mt-3 bg-green-600">
                          View Map
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Tab>
            
            <Tab key="trends" title="Time Series">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardBody className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">NDVI vs Soil Moisture</h4>
                      <div className="bg-gradient-to-r from-blue-200 to-green-200 h-48 rounded-lg flex items-center justify-center">
                        <span className="text-gray-700 font-medium">NDVI vs Moisture Chart</span>
                      </div>
                    </CardBody>
                  </Card>
                  
                  <Card>
                    <CardBody className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Temperature Trends</h4>
                      <div className="bg-gradient-to-r from-red-200 to-yellow-200 h-48 rounded-lg flex items-center justify-center">
                        <span className="text-gray-700 font-medium">Temperature Chart</span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
            
            <Tab key="zones" title="Risk Zones">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Zone Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {riskZones.map((zone, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardBody className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{zone.zone}</h4>
                          <Chip 
                            color={getRiskColor(zone.risk)}
                            size="sm"
                          >
                            {zone.risk}
                          </Chip>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Area: {zone.area}</p>
                        <div className={`h-24 rounded-lg flex items-center justify-center ${
                          zone.color === 'green' ? 'bg-green-200' :
                          zone.color === 'yellow' ? 'bg-yellow-200' :
                          'bg-red-200'
                        }`}>
                          <span className="text-gray-700 font-medium">{zone.zone}</span>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">75%</div>
            <div className="text-sm text-gray-600">Healthy Coverage</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">0.72</div>
            <div className="text-sm text-gray-600">Average NDVI</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">52%</div>
            <div className="text-sm text-gray-600">Soil Moisture</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">25°C</div>
            <div className="text-sm text-gray-600">Avg Temperature</div>
          </CardBody>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Export & Download</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              color="primary" 
              variant="bordered"
              className="h-20 flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">📊</span>
              <span>Export Charts</span>
            </Button>
            
            <Button 
              color="primary" 
              variant="bordered"
              className="h-20 flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">🗺️</span>
              <span>Download Maps</span>
            </Button>
            
            <Button 
              color="primary" 
              variant="bordered"
              className="h-20 flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">📄</span>
              <span>Generate Report</span>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
