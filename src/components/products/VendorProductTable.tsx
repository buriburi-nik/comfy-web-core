import { useState } from 'react';
import { Edit, Trash2, MoreHorizontal, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Product, categories } from '@/data/mockProducts';
import { useProducts } from '@/contexts/ProductContext';
import { formatPrice, formatDate } from '@/utils/productUtils';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VendorProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  selectedIds: string[];
  onSelectChange: (ids: string[]) => void;
}

export const VendorProductTable = ({
  products,
  onEdit,
  selectedIds,
  onSelectChange,
}: VendorProductTableProps) => {
  const { deleteProduct, updateProduct, loading } = useProducts();

  const handleSelectAll = (checked: boolean) => {
    onSelectChange(checked ? products.map((p) => p.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    onSelectChange(
      checked ? [...selectedIds, id] : selectedIds.filter((i) => i !== id)
    );
  };

  const handleToggleStatus = async (product: Product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    await updateProduct(product.id, { status: newStatus });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.length === products.length && products.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectOne(product.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell>
                <div className="font-medium text-foreground line-clamp-1">
                  {product.name}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
              <TableCell>
                <span
                  className={
                    product.stock === 0
                      ? 'text-destructive'
                      : product.stock < 10
                      ? 'text-yellow-600'
                      : 'text-foreground'
                  }
                >
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={product.status} />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(product.updatedAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={loading}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(product)}>
                      {product.status === 'active' ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Change Category
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {categories.map((cat) => (
                          <DropdownMenuItem
                            key={cat}
                            onClick={() => updateProduct(product.id, { category: cat })}
                          >
                            {cat}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
