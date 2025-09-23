import React from 'react';
import { Card, CardBody } from "@heroui/react";

// MODIFICATION: The component now accepts 'title', 'metric', and 'description'
const StatCard = ({ title, metric, description }) => {
  return (
    <Card className="bg-white/50 backdrop-blur-lg h-full">
      <CardBody className="text-center flex flex-col justify-center p-4">
        {/* MODIFICATION: The title is now dynamic */}
        <p className="text-gray-600 text-sm font-semibold">{title}</p>
        
        {/* MODIFICATION: The metric is now dynamic and has responsive text size */}
        <p className="text-3xl md:text-4xl font-bold text-green-800 my-2">{metric}</p>
        
        {/* The description remains dynamic */}
        <p className="text-gray-700 text-xs leading-tight">{description}</p>
      </CardBody>
    </Card>
  );
};

export default StatCard;