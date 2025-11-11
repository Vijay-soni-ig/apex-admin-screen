import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface AdvancedFiltersProps {
  onFilterChange?: (filters: any) => void;
  filterOptions?: {
    cities?: string[];
    statuses?: string[];
    categories?: string[];
  };
}

export function AdvancedFilters({ onFilterChange, filterOptions }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setDateRange({});
    onFilterChange?.({});
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key] !== undefined && activeFilters[key] !== ""
  ).length;

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Advanced Filters</h4>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>

            {filterOptions?.cities && (
              <div className="space-y-2">
                <Label>City</Label>
                <Select
                  value={activeFilters.city}
                  onValueChange={(value) => updateFilter("city", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {filterOptions.cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {filterOptions?.statuses && (
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={activeFilters.status}
                  onValueChange={(value) => updateFilter("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {filterOptions.statuses.map((status) => (
                      <SelectItem key={status} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {filterOptions?.categories && (
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={activeFilters.category}
                  onValueChange={(value) => updateFilter("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {filterOptions.categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {dateRange.from ? (
                        format(dateRange.from, "MMM dd, yyyy")
                      ) : (
                        <span className="text-muted-foreground">From</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => {
                        setDateRange({ ...dateRange, from: date });
                        updateFilter("dateFrom", date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {dateRange.to ? (
                        format(dateRange.to, "MMM dd, yyyy")
                      ) : (
                        <span className="text-muted-foreground">To</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => {
                        setDateRange({ ...dateRange, to: date });
                        updateFilter("dateTo", date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amount Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={activeFilters.minAmount || ""}
                  onChange={(e) => updateFilter("minAmount", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={activeFilters.maxAmount || ""}
                  onChange={(e) => updateFilter("maxAmount", e.target.value)}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || value === "" || value === "all") return null;
            return (
              <Button
                key={key}
                variant="secondary"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => updateFilter(key, undefined)}
              >
                {typeof value === "object" ? format(value, "MMM dd") : value}
                <X className="ml-1 h-3 w-3" />
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
