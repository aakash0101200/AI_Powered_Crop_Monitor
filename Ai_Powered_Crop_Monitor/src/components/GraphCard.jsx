import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FiArrowUpRight } from "react-icons/fi";

const GraphCard = () => {
  // Tailwind height classes to represent bar heights
  const barHeights = ["h-8", "h-12", "h-10", "h-16", "h-20", "h-24"];

  return (
    <Card className="bg-white/50 backdrop-blur-lg h-full flex flex-col">
  <CardBody className="flex flex-col h-full justify-between">

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-ui-text dark:text-ui-text-dark">
              Crop Health Trends
            </h3>
            <p className="text-sm text-ui-muted dark:text-ui-muted-dark">
              6-month historical & predicted data for Zone A.
            </p>
            <p className="text-leaf-2 font-bold mt-1 dark:text-leaf-2/90">
              Vegetation Index: +0.08 (MoM)
            </p>
          </div>
          <FiArrowUpRight className="text-2xl text-ui-muted dark:text-ui-muted-dark" />
        </div>

        <div className="mt-auto flex items-end justify-between space-x-1 md:space-x-2 h-24 md:h-32">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className={`w-full bg-leaf-2 rounded-lg ${height} transition-all`}
            ></div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default GraphCard;
