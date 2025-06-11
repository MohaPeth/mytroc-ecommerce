
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
  category_id: string;
  seller_id: string;
  status: string;
  stock: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  original_price: number;
  metadata: Record<string, any>;
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
          // Transform the database data to match our component interface
          const transformedProduct: Product = {
            id: data.id,
            name: data.name,
            description: data.description || '',
            price: data.price,
            images: Array.isArray(data.images) ? data.images as string[] : [],
            category_id: data.category_id,
            seller_id: data.seller_id,
            status: data.status,
            stock: data.stock || 0,
            is_featured: data.is_featured || false,
            created_at: data.created_at,
            updated_at: data.updated_at,
            original_price: data.original_price || data.price,
            metadata: data.metadata || {}
          };
          setProduct(transformedProduct);
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
      image: product.images[0] || '/placeholder.svg',
      brand: product.metadata?.brand || 'MyTroc',
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

  const discountPercentage = product.original_price > product.price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Carousel className="w-full max-w-md">
            <CarouselContent className="w-full aspect-square">
              {product.images.length > 0 ? product.images.map((image, index) => (
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
              )) : (
                <CarouselItem className="md:basis-1/2">
                  <div className="p-1">
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src="/placeholder.svg"
                        alt={product.name}
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              )}
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
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  {discountPercentage}% Off
                </Badge>
              )}
              <div className="space-y-1">
                <Label>Price</Label>
                <p className="text-xl font-bold">€{product.price.toFixed(2)}
                  {product.original_price && discountPercentage > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      €{product.original_price.toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <Label>Stock Available</Label>
                <p>{product.stock}</p>
                <Progress value={(product.stock / 100) * 100} />
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    id="quantity"
                    defaultValue="1"
                    min="1"
                    max={product.stock}
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
