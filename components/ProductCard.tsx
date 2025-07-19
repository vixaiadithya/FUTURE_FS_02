import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (id: number) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={() => onProductClick(product.id)}
    >
      <CardContent className="p-4">
        <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-semibold">
          ${product.price.toFixed(2)}
        </span>
        <Button onClick={handleAddToCart} size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}