import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Upload, Trash2, ChevronDown, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { Product, categories } from '@/data/mockProducts';
import { VendorProductTable } from '@/components/products/VendorProductTable';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductFilters } from '@/components/products/ProductFilters';
import { BulkUploadModal } from '@/components/products/BulkUploadModal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { filterProducts, FilterOptions, defaultFilters } from '@/utils/productUtils';

const VendorDashboard = () => {
  const { products, currentVendorId, bulkDeleteProducts, bulkUpdateStatus, bulkUpdateCategory, loading } = useProducts();
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const vendorProducts = useMemo(() => {
    return products.filter((p) => p.vendorId === currentVendorId);
  }, [products, currentVendorId]);

  const filteredProducts = useMemo(() => {
    return filterProducts(vendorProducts, filters);
  }, [vendorProducts, filters]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/products"><ArrowLeft className="h-4 w-4" /></Link>
              </Button>
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setBulkUploadOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />Bulk Upload
              </Button>
              <Button onClick={() => setFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />Add Product
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters filters={filters} onFilterChange={setFilters} showStatusFilter />
          </aside>

          <main className="lg:col-span-3">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-4 bg-muted rounded-lg">
                <span className="text-sm font-medium">{selectedIds.length} selected</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => bulkUpdateStatus(selectedIds, 'active')}>Activate All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => bulkUpdateStatus(selectedIds, 'inactive')}>Deactivate All</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Change Category</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {categories.map((cat) => (
                          <DropdownMenuItem key={cat} onClick={() => bulkUpdateCategory(selectedIds, cat)}>{cat}</DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem className="text-destructive" onClick={() => { bulkDeleteProducts(selectedIds); setSelectedIds([]); }}>
                      <Trash2 className="h-4 w-4 mr-2" />Delete All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>Clear</Button>
              </div>
            )}

            <div className="border rounded-lg bg-card">
              <VendorProductTable products={filteredProducts} onEdit={handleEdit} selectedIds={selectedIds} onSelectChange={setSelectedIds} />
            </div>
          </main>
        </div>
      </div>

      <ProductForm open={formOpen} onClose={handleCloseForm} product={editingProduct} mode={editingProduct ? 'edit' : 'add'} />
      <BulkUploadModal open={bulkUploadOpen} onClose={() => setBulkUploadOpen(false)} />
    </div>
  );
};

export default VendorDashboard;
