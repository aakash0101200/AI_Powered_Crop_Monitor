import React from 'react';
import { Card, CardBody, Button } from "@heroui/react";

const FeatureCard = ({ imageSrc, title, description, buttonText = "Learn More" }) => {
  return (
    <Card className="h-full flex flex-col justify-between p-4">
      <img 
        src={imageSrc} 
        alt={title}
        className="rounded-xl w-full" 
      />
      <CardBody>
        {/* MODIFICATION: Responsive font size for the title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
          {title}
        </h2>
        <p className="text-gray-500 mt-2">
          {description}
        </p>
      </CardBody>
      <Button 
        variant="solid"
        className="w-full bg-lime-400 hover:bg-lime-500 text-gray-800 font-bold py-4 rounded-2xl text-lg flex iteam-center"
      >
        {buttonText} →
      </Button>
    </Card>
  );
};

export default FeatureCard;