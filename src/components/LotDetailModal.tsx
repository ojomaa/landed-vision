import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lot, getStatusLabel } from "@/data/lots";
import { MapPin, Ruler, DollarSign, Check } from "lucide-react";

interface LotDetailModalProps {
  lot: Lot | null;
  open: boolean;
  onClose: () => void;
}

const LotDetailModal = ({ lot, open, onClose }: LotDetailModalProps) => {
  if (!lot) return null;

  const getStatusBadgeClass = (status: Lot["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500 text-white";
      case "sold":
        return "bg-gray-400 text-white";
      case "reserved":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <DialogTitle className="font-display text-2xl">
              Lot {lot.lotNumber}
            </DialogTitle>
            <span
              className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${getStatusBadgeClass(
                lot.status
              )}`}
            >
              {getStatusLabel(lot.status)}
            </span>
          </div>
          <DialogDescription className="sr-only">
            Details for Lot {lot.lotNumber}
          </DialogDescription>
        </DialogHeader>

        {/* Lot Stats */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-3">
            <Ruler size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Size</p>
              <p className="font-semibold text-foreground">{lot.acres} acres</p>
            </div>
          </div>
          {lot.price && (
            <div className="flex items-center gap-3">
              <DollarSign size={18} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-semibold text-foreground">{lot.price}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="py-2">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {lot.description}
          </p>
        </div>

        {/* Features */}
        {lot.features.length > 0 && (
          <div className="py-2">
            <p className="text-sm font-medium text-foreground mb-3">Features</p>
            <div className="flex flex-wrap gap-2">
              {lot.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1.5 border border-border px-3 py-1.5"
                >
                  <Check size={12} className="text-muted-foreground" />
                  <span className="text-xs text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {lot.status === "available" && (
          <div className="pt-4">
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full bg-primary text-primary-foreground py-3 font-medium text-sm hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              Inquire About This Lot
            </Link>
          </div>
        )}

        {lot.status === "reserved" && (
          <div className="pt-4">
            <p className="text-center text-sm text-muted-foreground">
              This lot is currently reserved. Contact us to join the waitlist.
            </p>
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full mt-3 bg-secondary text-foreground py-3 font-medium text-sm hover:bg-secondary/80 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Join Waitlist
            </Link>
          </div>
        )}

        {lot.status === "sold" && (
          <div className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              This lot has been sold. Browse other available lots or contact us
              to find your perfect property.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LotDetailModal;
