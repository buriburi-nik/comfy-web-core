import { Search, X } from 'lucide-react';
import { categories } from '@/data/mockProducts';
import { useProducts } from '@/contexts/ProductContext';
import { FilterOptions, defaultFilters } from '@/utils/productUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  showStatusFilter?: boolean;
}

export const ProductFilters = ({
  filters,
  onFilterChange,
  showStatusFilter = false,
}: ProductFiltersProps) => {
  const { vendors } = useProducts();

  const handleReset = () => {
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.vendor ||
    filters.inStock ||
    filters.status ||
    filters.priceMin > 0 ||
    filters.priceMax < 1000;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label>Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange({ ...filters, category: value === 'all' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vendor */}
      <div className="space-y-2">
        <Label>Vendor</Label>
        <Select
          value={filters.vendor}
          onValueChange={(value) => onFilterChange({ ...filters, vendor: value === 'all' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Vendors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            {vendors.map((vendor) => (
              <SelectItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status (for admin/vendor) */}
      {showStatusFilter && (
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status || ''}
            onValueChange={(value) => onFilterChange({ ...filters, status: value === 'all' ? '' : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${filters.priceMin} - ${filters.priceMax}
          </span>
        </div>
        <Slider
          value={[filters.priceMin, filters.priceMax]}
          min={0}
          max={1000}
          step={10}
          onValueChange={([min, max]) =>
            onFilterChange({ ...filters, priceMin: min, priceMax: max })
          }
        />
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={filters.inStock}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, inStock: checked as boolean })
          }
        />
        <Label htmlFor="inStock" className="cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={handleReset} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};
