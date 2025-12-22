import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart, Store, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/utils/productUtils';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, vendors } = useProducts();
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addItem(product, quantity);
    }
  };

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [products, slug]);

  const vendor = useMemo(() => {
    if (!product) return null;
    return vendors.find((v) => v.id === product.vendorId);
  }, [product, vendors]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Link to="/products" className="text-xl font-bold text-foreground">
              Marketplace
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.subcategory && (
                  <Badge variant="outline">{product.subcategory}</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-sm text-destructive">Out of Stock</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock === 0}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.stock === 0}
                >
                  +
                </Button>
              </div>
              <Button 
                className="flex-1 gap-2" 
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <Separator />

            {/* Vendor Info */}
            {vendor && (
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{vendor.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating}</span>
                    <span>•</span>
                    <span>{vendor.productsCount} products</span>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg">
                <Truck className="h-5 w-5 mb-2 text-primary" />
                <span className="text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 mb-2 text-primary" />
                <span className="text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg">
                <RotateCcw className="h-5 w-5 mb-2 text-primary" />
                <span className="text-muted-foreground">Easy Returns</span>
              </div>
            </div>

            <Separator />

            {/* Specifications */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* SKU */}
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
