import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/mockProducts';
import { useProducts } from '@/contexts/ProductContext';
import { formatPrice } from '@/utils/productUtils';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  showStatus?: boolean;
}

export const ProductCard = ({ product, showStatus = false }: ProductCardProps) => {
  const { vendors } = useProducts();
  const vendor = vendors.find((v) => v.id === product.vendorId);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium rounded">
              Sale
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-foreground font-medium">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        {showStatus && (
          <div className="mb-2">
            <StatusBadge status={product.status} />
          </div>
        )}

        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-2">{vendor?.name}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <Button size="icon" variant="ghost" className="h-8 w-8" disabled={product.stock === 0}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
