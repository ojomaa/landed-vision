import { useState } from "react";
import { motion } from "framer-motion";
import { Lot, getStatusColor } from "@/data/lots";
import LotDetailModal from "./LotDetailModal";

interface InteractiveSiteMapProps {
  image: string;
  imageAlt: string;
  lots: Lot[];
}

const InteractiveSiteMap = ({ image, imageAlt, lots }: InteractiveSiteMapProps) => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [hoveredLot, setHoveredLot] = useState<string | null>(null);

  return (
    <>
      <div className="relative w-full">
        {/* Site map image */}
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-auto rounded-xl"
        />

        {/* SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {lots.map((lot) => (
            <motion.polygon
              key={lot.id}
              points={lot.coordinates}
              fill={getStatusColor(lot.status)}
              fillOpacity={hoveredLot === lot.id ? 0.6 : 0.4}
              stroke={getStatusColor(lot.status)}
              strokeWidth="0.3"
              strokeOpacity={0.8}
              className="cursor-pointer transition-all duration-200"
              onClick={() => setSelectedLot(lot)}
              onMouseEnter={() => setHoveredLot(lot.id)}
              onMouseLeave={() => setHoveredLot(null)}
              whileHover={{ fillOpacity: 0.6 }}
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: hoveredLot === lot.id ? 0.6 : 0.4 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </svg>

        {/* Lot number labels */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {lots.map((lot) => {
            // Calculate center of polygon for label placement
            const points = lot.coordinates.split(" ").map((p) => {
              const [x, y] = p.split(",").map(Number);
              return { x, y };
            });
            const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
            const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

            return (
              <text
                key={`label-${lot.id}`}
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[2px] font-bold fill-white drop-shadow-md"
                style={{ textShadow: "0 0 2px rgba(0,0,0,0.8)" }}
              >
                {lot.lotNumber}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500 opacity-60" />
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500 opacity-60" />
          <span className="text-sm text-muted-foreground">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-400 opacity-60" />
          <span className="text-sm text-muted-foreground">Sold</span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm text-center mt-4">
        Click on any lot to view details and availability.
      </p>

      {/* Lot detail modal */}
      <LotDetailModal
        lot={selectedLot}
        open={selectedLot !== null}
        onClose={() => setSelectedLot(null)}
      />
    </>
  );
};

export default InteractiveSiteMap;
