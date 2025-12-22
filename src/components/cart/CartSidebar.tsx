import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatPrice } from '@/utils/productUtils';
import { Link } from 'react-router-dom';

export const CartSidebar = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button onClick={closeCart} asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <Link 
                      to={`/products/${item.product.slug}`} 
                      onClick={closeCart}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover bg-muted"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="grid gap-2">
                <Button size="lg" className="w-full">
                  Checkout
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
