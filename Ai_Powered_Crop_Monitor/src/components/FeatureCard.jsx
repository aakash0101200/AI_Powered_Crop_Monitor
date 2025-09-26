import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";

/**
 * FeatureCard
 * Props:
 *  - imageSrc: string (optional)
 *  - title: string (required)
 *  - description: string (optional)
 *  - ctaText: string (default: "Learn more")
 *  - href: string (optional)  -> if provided, CTA is a link
 *  - onClick: func (optional) -> if provided, CTA is a button
 *  - Icon: React component (optional) -> small decorative icon
 */
const FeatureCard = ({
  imageSrc,
  title,
  description,
  ctaText = "Learn more",
  href,
  onClick,
  Icon,
}) => {
  const ariaId = `feature-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Card
      className="h-full flex flex-col justify-between p-0 overflow-hidden rounded-2xl
                 bg-ui-bg shadow-sm border border-ui-border transition-shadow hover:shadow-lg"
      role="article"
      aria-labelledby={ariaId}
    >
      {/* Image (optional) */}
      {imageSrc && (
        <div className="w-full h-40 md:h-44 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
      )}

      <CardBody className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-3">
          {Icon && (
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg
                         bg-gradient-to-br from-leaf-3/30 to-leaf-2/20 border border-white/40 shrink-0"
              aria-hidden="true"
            >
              <Icon className="w-5 h-5 text-leaf-2" />
            </div>
          )}

          <div className="min-w-0">
            <h3 id={ariaId} className="text-base font-semibold text-ui-text">
              {title}
            </h3>
            {description && (
              <p className="mt-2 text-sm text-ui-muted/90 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardBody>

      {/* CTA area */}
      <div className="p-4 pt-0">
        {onClick ? (
          <Button
            onClick={onClick}
            className="w-full rounded-2xl px-4 py-3 bg-leaf-2 text-white font-semibold hover:bg-leaf-2/90 transition"
            aria-label={`${ctaText} - ${title}`}
          >
            {ctaText} →
          </Button>
        ) : href ? (
          <a
            href={href}
            className="inline-flex items-center justify-center w-full rounded-2xl px-4 py-3
                       bg-white/6 border border-ui-border text-leaf-2 font-semibold hover:bg-ui-bg-3 transition"
            aria-label={`${ctaText} - ${title}`}
          >
            {ctaText} →
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="w-full rounded-2xl px-4 py-3 bg-ui-bg text-ui-muted border border-ui-border cursor-not-allowed"
            aria-disabled="true"
          >
            {ctaText}
          </button>
        )}
      </div>
    </Card>
  );
};

export default FeatureCard;
