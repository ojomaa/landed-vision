import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectById,
  addLot,
  updateLot,
  deleteLot,
} from "@/lib/storage";
import { Lot, LotStatus, getStatusColor } from "@/data/lots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FeatureListEditor from "@/components/admin/FeatureListEditor";
import { ArrowLeft, Pencil, Trash2, Undo2, X } from "lucide-react";
import { toast } from "sonner";

function formatPrice(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
}

interface Point {
  x: number;
  y: number;
}

const LotManager = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  const [project, setProject] = useState(() =>
    id ? getProjectById(id) : undefined
  );
  const [lots, setLots] = useState<Lot[]>(project?.lots || []);

  // Coordinate picker state
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [drawing, setDrawing] = useState(false);

  // Sheet state for lot form
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingLot, setEditingLot] = useState<Lot | null>(null);
  const [lotForm, setLotForm] = useState({
    lotNumber: "",
    status: "available" as LotStatus,
    acres: "",
    price: "",
    description: "",
    features: [] as string[],
    coordinates: "",
  });

  useEffect(() => {
    if (!project || !project.siteMap) {
      toast.error("Project not found or has no site map");
      navigate("/admin/projects", { replace: true });
    }
  }, [project]);

  const refreshLots = () => {
    const fresh = id ? getProjectById(id) : undefined;
    setProject(fresh);
    setLots(fresh?.lots || []);
  };

  // ── Coordinate Picker ──────────────────────────────

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!drawing) return;
      const img = imgRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCurrentPoints((prev) => [
        ...prev,
        { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 },
      ]);
    },
    [drawing]
  );

  const formatCoords = (points: Point[]) =>
    points.map((p) => `${p.x},${p.y}`).join(" ");

  const finishDrawing = () => {
    if (currentPoints.length < 3) return;
    const coords = formatCoords(currentPoints);
    setLotForm({
      lotNumber: "",
      status: "available",
      acres: "",
      price: "",
      description: "",
      features: [],
      coordinates: coords,
    });
    setEditingLot(null);
    setSheetOpen(true);
    setCurrentPoints([]);
    setDrawing(false);
  };

  const cancelDrawing = () => {
    setCurrentPoints([]);
    setDrawing(false);
  };

  // ── Lot CRUD ───────────────────────────────────────

  const handleSaveLot = () => {
    if (!id) return;
    if (!lotForm.lotNumber) {
      toast.error("Lot number is required");
      return;
    }

    const lotData = {
      lotNumber: lotForm.lotNumber,
      coordinates: lotForm.coordinates,
      status: lotForm.status,
      acres: lotForm.acres,
      price: lotForm.price || undefined,
      description: lotForm.description,
      features: lotForm.features.filter(Boolean),
    };

    if (editingLot) {
      updateLot(id, editingLot.id, lotData);
      toast.success(`Lot ${lotForm.lotNumber} updated`);
    } else {
      addLot(id, lotData);
      toast.success(`Lot ${lotForm.lotNumber} added`);
    }
    setSheetOpen(false);
    refreshLots();
  };

  const handleEditLot = (lot: Lot) => {
    setEditingLot(lot);
    setLotForm({
      lotNumber: lot.lotNumber,
      status: lot.status,
      acres: lot.acres,
      price: lot.price || "",
      description: lot.description,
      features: lot.features,
      coordinates: lot.coordinates,
    });
    setSheetOpen(true);
  };

  const handleDeleteLot = (lot: Lot) => {
    if (!id) return;
    deleteLot(id, lot.id);
    toast.success(`Lot ${lot.lotNumber} deleted`);
    refreshLots();
  };

  const handleStatusToggle = (lot: Lot) => {
    if (!id) return;
    const order: LotStatus[] = ["available", "reserved", "sold"];
    const next = order[(order.indexOf(lot.status) + 1) % order.length];
    updateLot(id, lot.id, { status: next });
    refreshLots();
  };

  if (!project?.siteMap) return null;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <button
        onClick={() => navigate("/admin/projects")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </button>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-1">
        Manage Lots
      </h1>
      <p className="text-sm text-muted-foreground mb-6">{project.title}</p>

      {/* Drawing controls */}
      <div className="flex items-center gap-3 mb-4">
        {!drawing ? (
          <Button size="sm" onClick={() => setDrawing(true)}>
            Trace New Lot
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              onClick={finishDrawing}
              disabled={currentPoints.length < 3}
            >
              Save Polygon ({currentPoints.length} pts)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setCurrentPoints((prev) => prev.slice(0, -1))
              }
              disabled={currentPoints.length === 0}
            >
              <Undo2 size={14} className="mr-1" />
              Undo
            </Button>
            <Button size="sm" variant="outline" onClick={cancelDrawing}>
              <X size={14} className="mr-1" />
              Cancel
            </Button>
            <span className="text-xs text-muted-foreground ml-auto">
              Click corners of the lot on the map
            </span>
          </>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-6">
        {/* Left: map */}
        <div className="flex-1">
          <div
            className={`relative inline-block w-full ${
              drawing ? "cursor-crosshair" : ""
            }`}
            onClick={handleClick}
          >
            <img
              ref={imgRef}
              src={project.siteMap}
              alt={`${project.title} Site Map`}
              className="w-full h-auto"
              draggable={false}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Existing lots */}
              {lots.map((lot) => {
                const points = lot.coordinates
                  .split(" ")
                  .map((p) => {
                    const [x, y] = p.split(",").map(Number);
                    return { x, y };
                  });
                const cx =
                  points.reduce((s, p) => s + p.x, 0) / points.length;
                const cy =
                  points.reduce((s, p) => s + p.y, 0) / points.length;
                return (
                  <g key={lot.id}>
                    <polygon
                      points={lot.coordinates}
                      fill={getStatusColor(lot.status)}
                      fillOpacity={0.35}
                      stroke={getStatusColor(lot.status)}
                      strokeWidth="0.3"
                    />
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="2"
                      fontWeight="bold"
                      style={{
                        textShadow: "0 0 2px rgba(0,0,0,0.9)",
                      }}
                    >
                      {lot.lotNumber}
                    </text>
                  </g>
                );
              })}

              {/* Current drawing */}
              {currentPoints.length >= 2 && (
                <polyline
                  points={formatCoords(currentPoints)}
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="#3b82f6"
                  strokeWidth="0.3"
                  strokeDasharray="0.5"
                />
              )}
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

        {/* Right: lot list */}
        <div className="w-72 flex-shrink-0 space-y-2 max-h-[80vh] overflow-y-auto">
          <h3 className="text-sm font-medium mb-3">
            Lots ({lots.length})
          </h3>
          {lots.length === 0 && (
            <p className="text-xs text-muted-foreground py-8 text-center">
              No lots yet. Click "Trace New Lot" then click corners on the map.
            </p>
          )}
          {lots.map((lot) => (
            <div
              key={lot.id}
              className="border border-border p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Lot {lot.lotNumber}
                </span>
                <Badge
                  className="cursor-pointer text-xs"
                  style={{
                    backgroundColor: getStatusColor(lot.status),
                    color: "white",
                  }}
                  onClick={() => handleStatusToggle(lot)}
                >
                  {lot.status}
                </Badge>
              </div>
              {lot.acres && (
                <p className="text-xs text-muted-foreground">
                  {lot.acres} acres{lot.price ? ` · ${lot.price}` : ""}
                </p>
              )}
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleEditLot(lot)}
                >
                  <Pencil size={12} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                    >
                      <Trash2 size={12} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Lot {lot.lotNumber}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove the lot.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteLot(lot)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lot detail sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingLot ? `Edit Lot ${editingLot.lotNumber}` : "New Lot"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <div>
              <Label>Lot Number</Label>
              <Input
                value={lotForm.lotNumber}
                onChange={(e) =>
                  setLotForm((f) => ({ ...f, lotNumber: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={lotForm.status}
                onValueChange={(v) =>
                  setLotForm((f) => ({
                    ...f,
                    status: v as LotStatus,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Acres</Label>
                <Input
                  value={lotForm.acres}
                  onChange={(e) =>
                    setLotForm((f) => ({ ...f, acres: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  value={lotForm.price}
                  onChange={(e) =>
                    setLotForm((f) => ({ ...f, price: formatPrice(e.target.value) }))
                  }
                  placeholder="$000,000"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={lotForm.description}
                onChange={(e) =>
                  setLotForm((f) => ({
                    ...f,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
            <div>
              <Label className="mb-2 block">Features</Label>
              <FeatureListEditor
                value={lotForm.features}
                onChange={(features) =>
                  setLotForm((f) => ({ ...f, features }))
                }
              />
            </div>
            <div>
              <Label>Coordinates</Label>
              <Input
                value={lotForm.coordinates}
                readOnly
                className="text-xs text-muted-foreground"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveLot}>
                {editingLot ? "Update Lot" : "Add Lot"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSheetOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LotManager;
