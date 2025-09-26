import React from "react";
import { Card, CardBody } from "@heroui/react";

const StatCard = ({ title, metric, description }) => {
  return (
    <Card className="bg-white/50 backdrop-blur-lg h-full flex flex-col justify-center">
  <CardBody className="text-center p-4 flex flex-col justify-center h-full">

        <p className="text-sm font-semibold text-ui-muted dark:text-ui-muted-dark">
          {title}
        </p>

        <p className="text-3xl md:text-4xl font-bold text-leaf-2 my-2 dark:text-leaf-2/90">
          {metric}
        </p>

        {description && (
          <p className="text-xs leading-tight text-ui-text/90 dark:text-ui-text-dark/80">
            {description}
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default StatCard;
