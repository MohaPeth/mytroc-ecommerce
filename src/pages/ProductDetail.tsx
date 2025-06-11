import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from '@/hooks/useCart';
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Progress } from "@/components/ui/progress"
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useAnalytics } from '@/hooks/useAnalytics';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  condition: string;
  weight: number;
  dimensions: string;
  created_at: string;
  updated_at: string;
  original_price: number;
  discount_percentage: number;
  quantity_available: number;
  // Ajoutez d'autres propriétés ici
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addItem } = useCart();
  const { trackProductView } = useAnalytics();

  useEffect(() => {
    if (!id) {
      console.error("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
          toast({
            title: "Error",
            description: "Failed to load product details.",
            variant: "destructive",
          });
        }

        if (data) {
          setProduct(data as Product);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  useEffect(() => {
    if (product) {
      trackProductView(product.id);
    }
  }, [product, trackProductView]);

  const handleAddToCart = () => {
    if (!product) {
      toast({
        title: "Error",
        description: "Product details not loaded yet.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      quantity: quantity,
      image: product.images[0],
      brand: product.brand,
      productId: product.id,
    });

    toast({
      title: "Success",
      description: `${quantity} ${product.name} added to cart.`,
    });
  };

  if (loading) {
    return <div className="text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Carousel className="w-full max-w-md">
            <CarouselContent className="w-full aspect-square">
              {product.images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1">
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Product Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.discount_percentage > 0 && (
                <Badge variant="destructive">
                  {product.discount_percentage}% Off
                </Badge>
              )}
              <div className="space-y-1">
                <Label>Price</Label>
                <p className="text-xl font-bold">€{product.price.toFixed(2)}
                  {product.original_price && product.discount_percentage > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      €{product.original_price.toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <p>{product.category}</p>
              </div>
              <div className="space-y-1">
                <Label>Brand</Label>
                <p>{product.brand}</p>
              </div>
              <div className="space-y-1">
                <Label>Condition</Label>
                <p>{product.condition}</p>
              </div>
              <div className="space-y-1">
                <Label>Quantity Available</Label>
                <p>{product.quantity_available}</p>
                <Progress value={(product.quantity_available / 100) * 100} />
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    id="quantity"
                    defaultValue="1"
                    min="1"
                    max={product.quantity_available}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
