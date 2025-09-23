import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { FiArrowUpRight } from 'react-icons/fi';

const GraphCard = () => {
  // We'll use Tailwind height classes to represent the bar heights
  const barHeights = ['h-8', 'h-12', 'h-10', 'h-16', 'h-20', 'h-24'];

  return (
    <Card className="bg-white/50 backdrop-blur-lg ">
      <CardBody className="flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            {/* MODIFICATION: Updated title and description */}
            <h3 className="font-bold text-gray-800 text-lg">Crop Health Trends</h3>
            <p className="text-sm text-gray-600">6-month historical & predicted data for Zone A.</p>
            {/* MODIFICATION: Updated metric */}
            <p className="text-green-600 font-bold mt-1">Vegetation Index: +0.08 (MoM)</p>
          </div>
          <FiArrowUpRight className="text-2xl text-gray-600" />
        </div>
        
        {/* MODIFICATION: Responsive height and spacing for the chart */}
        <div className="mt-auto flex items-end justify-between space-x-1 md:space-x-2 h-24 md:h-32">
          {barHeights.map((height, index) => (
            <div key={index} className={`w-full bg-lime-400 rounded-lg ${height}`}></div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default GraphCard;