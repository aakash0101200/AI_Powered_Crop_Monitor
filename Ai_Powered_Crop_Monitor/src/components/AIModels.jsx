import { useState } from 'react';
import { Button, Card, CardBody, Progress, Chip, Tabs, Tab } from "@heroui/react";

export default function AIModels() {
  const [activeTab, setActiveTab] = useState('cnn');
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const models = {
    cnn: {
      name: 'Convolutional Neural Network',
      description: 'Classify healthy vs stressed crops from image patches',
      accuracy: 94.2,
      precision: 92.8,
      recall: 95.1,
      f1Score: 93.9,
      status: 'trained',
      epochs: 50,
      loss: 0.156
    },
    lstm: {
      name: 'LSTM Network',
      description: 'Predict stress/pest risk from time-series sensor data',
      accuracy: 89.7,
      precision: 88.3,
      recall: 91.2,
      f1Score: 89.7,
      status: 'training',
      epochs: 30,
      loss: 0.234
    },
    fusion: {
      name: 'Fusion Model',
      description: 'Combine CNN features with sensor inputs',
      accuracy: 96.8,
      precision: 95.4,
      recall: 97.2,
      f1Score: 96.3,
      status: 'trained',
      epochs: 75,
      loss: 0.089
    }
  };

  const trainingHistory = [
    { epoch: 1, loss: 0.856, accuracy: 0.234 },
    { epoch: 5, loss: 0.623, accuracy: 0.456 },
    { epoch: 10, loss: 0.445, accuracy: 0.678 },
    { epoch: 15, loss: 0.312, accuracy: 0.789 },
    { epoch: 20, loss: 0.234, accuracy: 0.856 },
    { epoch: 25, loss: 0.189, accuracy: 0.901 },
    { epoch: 30, loss: 0.156, accuracy: 0.942 }
  ];

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'trained': return 'success';
      case 'training': return 'primary';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const renderModelCard = (modelKey, model) => (
    <Card key={modelKey} className="hover:shadow-lg transition-shadow">
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{model.description}</p>
          </div>
          <Chip 
            color={getStatusColor(model.status)}
            variant="flat"
            size="sm"
          >
            {model.status}
          </Chip>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{model.f1Score}%</div>
            <div className="text-xs text-gray-600">F1 Score</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Precision:</span>
            <span className="font-medium">{model.precision}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Recall:</span>
            <span className="font-medium">{model.recall}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Epochs:</span>
            <span className="font-medium">{model.epochs}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Loss:</span>
            <span className="font-medium">{model.loss}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="bordered" className="flex-1">
            View Details
          </Button>
          <Button size="sm" color="primary" className="flex-1 bg-green-600">
            {model.status === 'trained' ? 'Retrain' : 'Train'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Models</h1>
          <p className="text-gray-600 mt-2">Train and manage machine learning models for crop analysis</p>
        </div>
        <Button 
          color="primary" 
          className="bg-green-600 hover:bg-green-700"
          onPress={startTraining}
          isLoading={isTraining}
        >
          {isTraining ? 'Training...' : 'Start Training'}
        </Button>
      </div>

      {/* Training Progress */}
      {isTraining && (
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Training Model</span>
              <span className="text-sm text-blue-600">{trainingProgress}%</span>
            </div>
            <Progress value={trainingProgress} className="w-full" color="primary" />
          </CardBody>
        </Card>
      )}

      {/* Model Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(models).map(([key, model]) => renderModelCard(key, model))}
      </div>

      {/* Training History */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Training History</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Loss Curve</h3>
              <div className="bg-gradient-to-r from-red-200 to-green-200 h-32 rounded-lg flex items-center justify-center">
                <span className="text-gray-700 font-medium">Loss vs Epochs</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Accuracy Curve</h3>
              <div className="bg-gradient-to-r from-blue-200 to-purple-200 h-32 rounded-lg flex items-center justify-center">
                <span className="text-gray-700 font-medium">Accuracy vs Epochs</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Model Performance Metrics */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Model Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Model</th>
                  <th className="text-center py-2">Accuracy</th>
                  <th className="text-center py-2">Precision</th>
                  <th className="text-center py-2">Recall</th>
                  <th className="text-center py-2">F1 Score</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(models).map(([key, model]) => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="py-2 font-medium">{model.name}</td>
                    <td className="py-2 text-center">{model.accuracy}%</td>
                    <td className="py-2 text-center">{model.precision}%</td>
                    <td className="py-2 text-center">{model.recall}%</td>
                    <td className="py-2 text-center">{model.f1Score}%</td>
                    <td className="py-2 text-center">
                      <Chip 
                        color={getStatusColor(model.status)}
                        size="sm"
                        variant="flat"
                      >
                        {model.status}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
