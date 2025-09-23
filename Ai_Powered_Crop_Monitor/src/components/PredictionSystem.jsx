import { useState } from 'react';
import { Button, Card, CardBody, Progress, Chip, Switch } from "@heroui/react";

export default function PredictionSystem() {
  const [predictions, setPredictions] = useState({
    healthStatus: 'Healthy',
    pestRisk: 'Low',
    diseaseRisk: 'Low',
    stressLevel: 'Normal'
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'High pest risk detected in Zone A', timestamp: '2024-01-15 14:30', zone: 'Zone A' },
    { id: 2, type: 'info', message: 'Optimal growth conditions in Zone B', timestamp: '2024-01-15 14:25', zone: 'Zone B' },
    { id: 3, type: 'error', message: 'Water stress detected in Zone C', timestamp: '2024-01-15 14:20', zone: 'Zone C' }
  ]);

  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionProgress, setPredictionProgress] = useState(0);

  const fieldZones = [
    { id: 'A', health: 'Healthy', pestRisk: 15, diseaseRisk: 8, stressLevel: 'Normal', area: '2.5 acres' },
    { id: 'B', health: 'Healthy', pestRisk: 5, diseaseRisk: 3, stressLevel: 'Low', area: '3.2 acres' },
    { id: 'C', health: 'Stressed', pestRisk: 45, diseaseRisk: 25, stressLevel: 'High', area: '1.8 acres' },
    { id: 'D', health: 'Healthy', pestRisk: 12, diseaseRisk: 6, stressLevel: 'Normal', area: '2.9 acres' }
  ];

  const startPrediction = () => {
    setIsPredicting(true);
    setPredictionProgress(0);
    
    const interval = setInterval(() => {
      setPredictionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPredicting(false);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const getHealthColor = (health) => {
    switch(health) {
      case 'Healthy': return 'success';
      case 'Stressed': return 'warning';
      case 'Diseased': return 'danger';
      default: return 'default';
    }
  };

  const getRiskColor = (risk) => {
    if (risk < 20) return 'success';
    if (risk < 40) return 'warning';
    return 'danger';
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prediction System</h1>
          <p className="text-gray-600 mt-2">Real-time crop health monitoring and risk assessment</p>
        </div>
        <Button 
          color="primary" 
          className="bg-green-600 hover:bg-green-700"
          onPress={startPrediction}
          isLoading={isPredicting}
        >
          {isPredicting ? 'Predicting...' : 'Run Prediction'}
        </Button>
      </div>

      {/* Prediction Progress */}
      {/* {isPredicting && (
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Running Predictions</span>
              <span className="text-sm text-blue-600">{predictionProgress}%</span>
            </div>
            <Progress value={predictionProgress} className="w-full" color="primary" />
          </CardBody>
        </Card>
      )} */}

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">75%</div>
            <div className="text-sm text-gray-600">Healthy Zones</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">19%</div>
            <div className="text-sm text-gray-600">Pest Risk</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-50 to-red-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">11%</div>
            <div className="text-sm text-gray-600">Disease Risk</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </CardBody>
        </Card> */}
      </div>

      {/* Field Zone Analysis */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Field Zone Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* {fieldZones.map((zone) => (
              <Card key={zone.id} className="hover:shadow-lg transition-shadow">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Zone {zone.id}</h3>
                    <Chip 
                      color={getHealthColor(zone.health)}
                      size="sm"
                    >
                      {zone.health}
                    </Chip>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{zone.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pest Risk:</span>
                      <Chip 
                        color={getRiskColor(zone.pestRisk)}
                        size="sm"
                        variant="flat"
                      >
                        {zone.pestRisk}%
                      </Chip>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disease Risk:</span>
                      <Chip 
                        color={getRiskColor(zone.diseaseRisk)}
                        size="sm"
                        variant="flat"
                      >
                        {zone.diseaseRisk}%
                      </Chip>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stress:</span>
                      <span className="font-medium">{zone.stressLevel}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))} */}
          </div>
        </CardBody>
      </Card>

      {/* Health Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          {/* <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Status Map</h3>
            <div className="bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-700 font-medium">NDVI Health Overlay</span>
            </div>
          </CardBody> */}
        </Card>
        
        <Card>
          <CardBody className="p-6">
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Heatmap</h3>
            <div className="bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-700 font-medium">Pest/Disease Risk Heatmap</span>
            </div> */}
          </CardBody>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Alerts</h2>
          {/* <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Chip 
                    color={getAlertColor(alert.type)}
                    size="sm"
                    variant="flat"
                  >
                    {alert.type}
                  </Chip>
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.zone} • {alert.timestamp}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Dismiss
                </Button>
              </div>
            ))}
          </div> */}
        </CardBody>
      </Card>
    </div>
  );
}
