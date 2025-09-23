import { useState } from 'react';
import { Button, Card, CardBody, Progress, Chip, Tabs, Tab } from "@heroui/react";

export default function FeatureExtraction() {
  const [activeTab, setActiveTab] = useState('vegetation');
  const [extractionProgress, setExtractionProgress] = useState(0);

  const vegetationIndices = [
    { name: 'NDVI', formula: '(NIR - Red) / (NIR + Red)', value: 0.75, status: 'calculated' },
    { name: 'SAVI', formula: '((NIR - Red) / (NIR + Red + L)) * (1 + L)', value: 0.68, status: 'calculated' },
    { name: 'GNDVI', formula: '(NIR - Green) / (NIR + Green)', value: 0.72, status: 'calculated' },
    { name: 'EVI', formula: '2.5 * ((NIR - Red) / (NIR + 6*Red - 7.5*Blue + 1))', value: 0.65, status: 'calculated' },
    { name: 'NDWI', formula: '(Green - NIR) / (Green + NIR)', value: 0.45, status: 'calculated' }
  ];

  const soilIndices = [
    { name: 'NDSI', formula: '(SWIR1 - SWIR2) / (SWIR1 + SWIR2)', value: 0.32, status: 'calculated' },
    { name: 'Moisture Index', formula: '(NIR - SWIR1) / (NIR + SWIR1)', value: 0.58, status: 'calculated' },
    { name: 'Soil Brightness', formula: 'sqrt(Red² + Green² + Blue²)', value: 0.42, status: 'calculated' }
  ];

  const textureFeatures = [
    { name: 'GLCM Contrast', value: 0.85, status: 'calculated' },
    { name: 'GLCM Homogeneity', value: 0.72, status: 'calculated' },
    { name: 'GLCM Entropy', value: 0.68, status: 'calculated' },
    { name: 'GLCM Energy', value: 0.45, status: 'calculated' }
  ];

  const startExtraction = () => {
    setExtractionProgress(0);
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const renderIndexCard = (index, type) => (
    <Card key={index.name} className="hover:shadow-lg transition-shadow">
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{index.name}</h3>
          <Chip 
            color={index.status === 'calculated' ? 'success' : 'default'}
            size="sm"
          >
            {index.status}
          </Chip>
        </div>
        <p className="text-sm text-gray-600 mb-3 font-mono bg-gray-100 p-2 rounded">
          {index.formula}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Value:</span>
          <span className="font-bold text-lg text-green-600">{index.value}</span>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feature Extraction</h1>
          <p className="text-gray-600 mt-2">Compute vegetation and soil indices from spectral data</p>
        </div>
        <Button 
          color="primary" 
          className="bg-green-600 hover:bg-green-700"
          onPress={startExtraction}
        >
          Start Extraction
        </Button>
      </div> */}

      {/* Extraction Progress */}
      {/* {extractionProgress > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Extracting Features</span>
              <span className="text-sm text-blue-600">{extractionProgress}%</span>
            </div>
            <Progress value={extractionProgress} className="w-full" color="primary" />
          </CardBody>
        </Card>
      )} */}

      {/* Feature Tabs */}
      {/* <Card>
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
            <Tab key="vegetation" title="Vegetation Indices">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vegetationIndices.map(index => renderIndexCard(index, 'vegetation'))}
                </div>
              </div>
            </Tab>
            
            <Tab key="soil" title="Soil Indices">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {soilIndices.map(index => renderIndexCard(index, 'soil'))}
                </div>
              </div>
            </Tab>
            
            <Tab key="texture" title="Texture Features">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {textureFeatures.map(index => renderIndexCard(index, 'texture'))}
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card> */}

      {/* Feature Matrix Summary */}
      {/* <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Feature Matrix Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Total Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">21,025</div>
              <div className="text-sm text-gray-600">Samples</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">252,300</div>
              <div className="text-sm text-gray-600">Feature Vectors</div>
            </div>
          </div>
        </CardBody>
      </Card> */}

      {/* Feature Visualization */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">NDVI Distribution</h3>
            <div className="bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 h-32 rounded-lg flex items-center justify-center">
              <span className="text-gray-700 font-medium">NDVI Heatmap Visualization</span>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Correlation</h3>
            <div className="bg-gradient-to-r from-blue-200 to-purple-200 h-32 rounded-lg flex items-center justify-center">
              <span className="text-gray-700 font-medium">Correlation Matrix</span>
            </div>
          </CardBody>
        </Card>
      </div> */}
    </div>
  );
}
