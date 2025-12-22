import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, LayoutGrid, List } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { SortDropdown } from '@/components/products/SortDropdown';
import { RoleSwitcher } from '@/components/products/RoleSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { filterProducts, sortProducts, paginateProducts, FilterOptions, SortOption, defaultFilters } from '@/utils/productUtils';

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const { products, role, loading } = useProducts();
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);

  // Only show active products for public users
  const visibleProducts = useMemo(() => {
    if (role === 'public') {
      return products.filter((p) => p.status === 'active');
    }
    return products;
  }, [products, role]);

  const filteredProducts = useMemo(() => {
    return filterProducts(visibleProducts, filters);
  }, [visibleProducts, filters]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  const { products: paginatedProducts, totalPages, totalItems } = useMemo(() => {
    return paginateProducts(sortedProducts, page, ITEMS_PER_PAGE);
  }, [sortedProducts, page]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="text-xl font-bold text-foreground">
              Marketplace
            </Link>
            <div className="flex items-center gap-4">
              <RoleSwitcher />
              {role === 'vendor' && (
                <Button asChild>
                  <Link to="/vendor/dashboard">Vendor Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <ProductFilters filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {totalItems} product{totalItems !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <ProductFilters filters={filters} onFilterChange={setFilters} />
                  </SheetContent>
                </Sheet>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={paginatedProducts} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
