import { useState, useRef, useCallback } from "react";
import siteMap from "@/assets/Site-development-plan-before-forest-conservation-plan.png";

interface Point {
  x: number;
  y: number;
}

interface LotPolygon {
  lotNumber: string;
  points: Point[];
}

const CoordinatePicker = () => {
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [completedLots, setCompletedLots] = useState<LotPolygon[]>([]);
  const [lotNumber, setLotNumber] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const img = imgRef.current;
      if (!img) return;

      const rect = img.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setCurrentPoints((prev) => [...prev, { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }]);
    },
    []
  );

  const finishLot = () => {
    if (currentPoints.length < 3 || !lotNumber) return;
    setCompletedLots((prev) => [
      ...prev,
      { lotNumber, points: [...currentPoints] },
    ]);
    setCurrentPoints([]);
    setLotNumber("");
  };

  const undoPoint = () => {
    setCurrentPoints((prev) => prev.slice(0, -1));
  };

  const clearCurrent = () => {
    setCurrentPoints([]);
  };

  const deleteLot = (index: number) => {
    setCompletedLots((prev) => prev.filter((_, i) => i !== index));
  };

  const formatCoordinates = (points: Point[]) =>
    points.map((p) => `${p.x},${p.y}`).join(" ");

  const exportAll = () => {
    const output = completedLots
      .sort((a, b) => parseInt(a.lotNumber) - parseInt(b.lotNumber))
      .map(
        (lot) =>
          `  // Lot ${lot.lotNumber}\n  "${formatCoordinates(lot.points)}",`
      )
      .join("\n");
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const exportJSON = () => {
    const output = completedLots
      .sort((a, b) => parseInt(a.lotNumber) - parseInt(b.lotNumber))
      .map((lot) => ({
        lotNumber: lot.lotNumber,
        coordinates: formatCoordinates(lot.points),
      }));
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    alert("JSON copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-bold mb-2">Lot Coordinate Picker</h1>
        <p className="text-neutral-400 text-sm mb-4">
          Click the corners of each lot on the image. The coordinates are percentages (0-100) of the image dimensions.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            value={lotNumber}
            onChange={(e) => setLotNumber(e.target.value)}
            placeholder="Lot #"
            className="bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm w-24"
          />
          <button
            onClick={finishLot}
            disabled={currentPoints.length < 3 || !lotNumber}
            className="bg-green-600 hover:bg-green-700 disabled:bg-neutral-700 disabled:text-neutral-500 px-4 py-2 text-sm font-medium"
          >
            Save Lot ({currentPoints.length} pts)
          </button>
          <button
            onClick={undoPoint}
            disabled={currentPoints.length === 0}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-neutral-700 disabled:text-neutral-500 px-4 py-2 text-sm font-medium"
          >
            Undo Point
          </button>
          <button
            onClick={clearCurrent}
            disabled={currentPoints.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 px-4 py-2 text-sm font-medium"
          >
            Clear Current
          </button>
          <span className="text-neutral-400 text-sm ml-auto">
            {completedLots.length} lots saved
          </span>
        </div>

        <div className="flex gap-4">
          {/* Image with overlay */}
          <div className="flex-1">
            <div
              className="relative cursor-crosshair inline-block"
              onClick={handleClick}
            >
              <img
                ref={imgRef}
                src={siteMap}
                alt="Site Development Plan"
                className="w-full h-auto"
                draggable={false}
              />

              {/* SVG overlay for completed lots and current points */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Completed lots */}
                {completedLots.map((lot, i) => (
                  <g key={i}>
                    <polygon
                      points={formatCoordinates(lot.points)}
                      fill="rgba(34, 197, 94, 0.3)"
                      stroke="#22c55e"
                      strokeWidth="0.3"
                    />
                    <text
                      x={
                        lot.points.reduce((s, p) => s + p.x, 0) /
                        lot.points.length
                      }
                      y={
                        lot.points.reduce((s, p) => s + p.y, 0) /
                        lot.points.length
                      }
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="2"
                      fontWeight="bold"
                      style={{ textShadow: "0 0 2px rgba(0,0,0,0.9)" }}
                    >
                      {lot.lotNumber}
                    </text>
                  </g>
                ))}

                {/* Current polygon being drawn */}
                {currentPoints.length >= 2 && (
                  <polyline
                    points={formatCoordinates(currentPoints)}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="#3b82f6"
                    strokeWidth="0.3"
                    strokeDasharray="0.5"
                  />
                )}

                {/* Current points */}
                {currentPoints.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="0.6"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="0.15"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Sidebar: saved lots */}
          <div className="w-80 flex-shrink-0">
            <div className="flex gap-2 mb-3">
              <button
                onClick={exportAll}
                disabled={completedLots.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-500 px-3 py-2 text-sm font-medium"
              >
                Copy Coordinates
              </button>
              <button
                onClick={exportJSON}
                disabled={completedLots.length === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-700 disabled:text-neutral-500 px-3 py-2 text-sm font-medium"
              >
                Copy JSON
              </button>
            </div>

            <div className="space-y-2 max-h-[80vh] overflow-y-auto">
              {completedLots
                .sort((a, b) => parseInt(a.lotNumber) - parseInt(b.lotNumber))
                .map((lot, i) => (
                  <div
                    key={i}
                    className="bg-neutral-800 border border-neutral-700 p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-green-400">
                        Lot {lot.lotNumber}
                      </span>
                      <button
                        onClick={() => deleteLot(completedLots.indexOf(lot))}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                    <code className="text-xs text-neutral-400 break-all">
                      {formatCoordinates(lot.points)}
                    </code>
                  </div>
                ))}

              {completedLots.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-8">
                  No lots saved yet. Enter a lot number, click corners on the image, then click "Save Lot".
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatePicker;
