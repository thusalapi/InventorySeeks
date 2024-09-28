import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface PriceRangeFilterProps {
  selectedPriceRange: PriceRange;
  setSelectedPriceRange: (range: PriceRange) => void;
  priceRanges: PriceRange[];
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  selectedPriceRange,
  setSelectedPriceRange,
  priceRanges,
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor="priceRange">Filter by Price Range:</Label>
      <Input
        id="priceRange"
        value={selectedPriceRange.label}
        onChange={(e) =>
          setSelectedPriceRange(
            priceRanges.find((range) => range.label === e.target.value) ||
              priceRanges[0]
          )
        }
        options={priceRanges.map((range) => ({
          label: range.label,
          value: range.label,
        }))}
      />
    </div>
  );
};

export default PriceRangeFilter;
