import { useState } from 'react';
import { Button, Card, CardBody, Progress, Chip, Switch } from "@heroui/react";

export default function Preprocessing() {
  const [processingSteps, setProcessingSteps] = useState({
    radiometric: false,
    atmospheric: false,
    dimensionality: false,
    cleaning: false,
    registration: false
  });

  const [processingProgress, setProcessingProgress] = useState(0);

  const preprocessingSteps = [
    {
      id: 'radiometric',
      name: 'Radiometric Correction',
      description: 'Remove noise and normalize pixel values',
      status: processingSteps.radiometric ? 'completed' : 'pending',
      duration: '2-3 minutes'
    },
    {
      id: 'atmospheric',
      name: 'Atmospheric Correction',
      description: 'Remove atmospheric effects and haze',
      status: processingSteps.atmospheric ? 'completed' : 'pending',
      duration: '3-4 minutes'
    },
    {
      id: 'dimensionality',
      name: 'Dimensionality Reduction',
      description: 'Apply PCA or MNF to reduce spectral bands',
      status: processingSteps.dimensionality ? 'completed' : 'pending',
      duration: '5-7 minutes'
    },
    {
      id: 'cleaning',
      name: 'Data Cleaning',
      description: 'Fill missing values and smooth noisy signals',
      status: processingSteps.cleaning ? 'completed' : 'pending',
      duration: '1-2 minutes'
    },
    {
      id: 'registration',
      name: 'Band Registration',
      description: 'Align image bands if needed',
      status: processingSteps.registration ? 'completed' : 'pending',
      duration: '2-3 minutes'
    }
  ];

  const handleStepToggle = (stepId) => {
    setProcessingSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const startProcessing = () => {
    setProcessingProgress(0);
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Preprocessing</h1>
          <p className="text-gray-600 mt-2">Apply corrections and prepare data for analysis</p>
        </div>
        <Button 
          color="primary" 
          className="bg-green-600 hover:bg-green-700"
          onPress={startProcessing}
        >
          Start Processing
        </Button>
      </div> */}

      {/* Processing Progress */}
      {/* {processingProgress > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Processing Data</span>
              <span className="text-sm text-blue-600">{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="w-full" color="primary" />
          </CardBody>
        </Card>
      )} */}

      {/* Preprocessing Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* {preprocessingSteps.map((step, index) => (
          <Card key={step.id} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    processingSteps[step.id] ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`font-bold ${
                      processingSteps[step.id] ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                <Switch
                  isSelected={processingSteps[step.id]}
                  onValueChange={() => handleStepToggle(step.id)}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estimated Duration:</span>
                <span className="font-medium">{step.duration}</span>
              </div>

              <div className="mt-4">
                <Chip 
                  color={getStatusColor(step.status)}
                  variant="flat"
                  size="sm"
                >
                  {processingSteps[step.id] ? 'Completed' : 'Pending'}
                </Chip>
              </div>
            </CardBody>
          </Card>
        ))} */}
      </div>

      {/* Processing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">220</div>
            <div className="text-sm text-gray-600">Spectral Bands</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">21,025</div>
            <div className="text-sm text-gray-600">Pixels Processed</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-gray-600">Minutes Total</div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">98.5%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </CardBody>
        </Card> */}
      </div>

      {/* Before/After Comparison */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Processing Results</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Before Processing</h3>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Raw Hyperspectral Data</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">After Processing</h3>
              <div className="bg-green-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-green-700">Corrected & Cleaned Data</span>
              </div>
            </div>
          </div> */}
        </CardBody>
      </Card>
    </div>
  );
}
