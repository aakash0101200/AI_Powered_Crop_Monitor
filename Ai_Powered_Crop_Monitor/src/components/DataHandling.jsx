import { useState } from 'react';
import { Button, Card, CardBody, Progress, Chip } from "@heroui/react";

export default function DataHandling() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const datasets = [
    {
      name: "Indian Pines Hyperspectral",
      type: "Hyperspectral Cube",
      size: "2.1 GB",
      status: "Ready",
      bands: 220,
      resolution: "145x145",
      date: "2024-01-15"
    },
    {
      name: "Multispectral Crop Data",
      type: "Multispectral",
      size: "850 MB",
      status: "Processing",
      bands: 8,
      resolution: "1024x1024",
      date: "2024-01-15"
    },
    {
      name: "Ground Truth Labels",
      type: "Annotation",
      size: "45 MB",
      status: "Ready",
      bands: 1,
      resolution: "145x145",
      date: "2024-01-14"
    }
  ];

  const handleUpload = () => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hyperspectral Data Management</h1>
          <p className="text-gray-600 mt-2">Process and manage hyperspectral imaging datasets and multispectral sensor data</p>
        </div>
        <Button 
          color="primary" 
          className="bg-green-600 hover:bg-green-700"
          onPress={handleUpload}
          isLoading={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Upload New Dataset'}
        </Button>
      </div>

      {/* Upload Progress */}
      {isProcessing && (
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Uploading Dataset</span>
              <span className="text-sm text-blue-600">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" color="primary" />
          </CardBody>
        </Card>
      )}

      {/* Dataset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{dataset.name}</h3>
                  <p className="text-sm text-gray-500">{dataset.type}</p>
                </div>
                <Chip 
                  color={dataset.status === 'Ready' ? 'success' : 'warning'}
                  variant="flat"
                  size="sm"
                >
                  {dataset.status}
                </Chip>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{dataset.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bands:</span>
                  <span className="font-medium">{dataset.bands}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Resolution:</span>
                  <span className="font-medium">{dataset.resolution}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{dataset.date}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="bordered" className="flex-1">
                  View
                </Button>
                <Button size="sm" color="primary" className="flex-1 bg-green-600">
                  Process
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Data Processing Pipeline */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Processing Pipeline</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Load Hyperspectral Dataset</h3>
                <p className="text-sm text-gray-600">Indian Pines dataset with 220 spectral bands</p>
              </div>
              <Chip color="success" size="sm">Completed</Chip>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Load Multispectral Data</h3>
                <p className="text-sm text-gray-600">RGB and NIR bands for crop analysis</p>
              </div>
              <Chip color="success" size="sm">Completed</Chip>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Data Preprocessing</h3>
                <p className="text-sm text-gray-600">Apply radiometric and atmospheric corrections</p>
              </div>
              <Chip color="primary" size="sm">In Progress</Chip>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
