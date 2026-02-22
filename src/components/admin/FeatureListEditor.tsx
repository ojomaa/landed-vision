import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface FeatureListEditorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const FeatureListEditor = ({ value, onChange }: FeatureListEditorProps) => {
  const add = () => onChange([...value, ""]);

  const update = (index: number, text: string) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => update(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => remove(index)}
          >
            <X size={14} />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1">
        <Plus size={14} />
        Add Feature
      </Button>
    </div>
  );
};

export default FeatureListEditor;
