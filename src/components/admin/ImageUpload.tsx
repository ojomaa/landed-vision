import { useCallback } from "react";
import { fileToBase64 } from "@/lib/storage";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const ImageUpload = ({ value, onChange, label }: ImageUploadProps) => {
  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const base64 = await fileToBase64(file);
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (value) {
    return (
      <div className="relative group">
        <img
          src={value}
          alt={label || "Upload"}
          className="w-full h-40 object-cover border border-border"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onChange("")}
        >
          <X size={14} />
        </Button>
      </div>
    );
  }

  return (
    <label
      className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border cursor-pointer hover:border-muted-foreground/50 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Upload size={20} className="text-muted-foreground mb-2" />
      <span className="text-xs text-muted-foreground">
        {label || "Drop image or click to upload"}
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInput}
      />
    </label>
  );
};

export default ImageUpload;
