import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  activeFiltersCount: number;
}

export interface FilterState {
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
}

const AVAILABLE_COLORS = [
  { name: "Noir", value: "black", hex: "#000000" },
  { name: "Blanc", value: "white", hex: "#FFFFFF" },
  { name: "Gris", value: "gray", hex: "#808080" },
  { name: "Bleu", value: "blue", hex: "#3B82F6" },
  { name: "Rouge", value: "red", hex: "#EF4444" },
  { name: "Vert", value: "green", hex: "#10B981" },
  { name: "Orange", value: "orange", hex: "#F97316" },
  { name: "Rose", value: "pink", hex: "#EC4899" },
];

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductFilters = ({ onFilterChange, activeFiltersCount }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    applyFilters(priceRange, newColors, selectedSizes);
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    applyFilters(priceRange, selectedColors, newSizes);
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    applyFilters(newRange, selectedColors, selectedSizes);
  };

  const applyFilters = (
    price: [number, number],
    colors: string[],
    sizes: string[]
  ) => {
    onFilterChange({
      priceRange: price,
      colors,
      sizes,
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 200]);
    setSelectedColors([]);
    setSelectedSizes([]);
    applyFilters([0, 200], [], []);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filtres
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Affine ta recherche pour trouver le produit parfait
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Prix</Label>
              <span className="text-sm text-muted-foreground">
                {priceRange[0]}€ - {priceRange[1]}€
              </span>
            </div>
            <Slider
              min={0}
              max={200}
              step={5}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Couleurs</Label>
            <div className="grid grid-cols-4 gap-3">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorToggle(color.value)}
                  className={`relative flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedColors.includes(color.value)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: color.value === "white" ? "inset 0 0 0 1px #e5e7eb" : "none",
                    }}
                  />
                  <span className="text-xs text-center">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Tailles</Label>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`py-2 px-4 rounded-lg border-2 font-medium transition-all hover:scale-105 ${
                    selectedSizes.includes(size)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          {(selectedColors.length > 0 ||
            selectedSizes.length > 0 ||
            priceRange[0] !== 0 ||
            priceRange[1] !== 200) && (
            <Button
              variant="outline"
              className="w-full"
              onClick={resetFilters}
            >
              <X className="w-4 h-4 mr-2" />
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
