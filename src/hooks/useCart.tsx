
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';
import { AnalyticsService } from '@/services/analytics.service';

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  brand?: string;
  productId?: number | string;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number | string) => void;
  updateItemQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);
        
        // Track add to cart event
        AnalyticsService.trackAddToCart(
          item.productId?.toString() || item.id.toString(), 
          item.quantity
        );
        
        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) => 
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + (item.price * item.quantity),
          }));
          
          toast({
            description: `Quantité mise à jour (${existingItem.quantity + item.quantity})`,
          });
        } else {
          set((state) => ({
            items: [...state.items, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + (item.price * item.quantity),
          }));
          
          toast({
            description: "Produit ajouté au panier",
          });
        }
      },
      
      removeItem: (id: number | string) => {
        const { items } = get();
        const itemToRemove = items.find((i) => i.id === id);
        
        if (itemToRemove) {
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
          }));
        }
      },
      
      updateItemQuantity: (id: number | string, quantity: number) => {
        const { items } = get();
        const itemToUpdate = items.find((i) => i.id === id);
        
        if (itemToUpdate) {
          if (quantity <= 0) {
            get().removeItem(id);
            return;
          }
          
          const quantityDiff = quantity - itemToUpdate.quantity;
          
          set((state) => ({
            items: state.items.map((i) => 
              i.id === id ? { ...i, quantity } : i
            ),
            totalItems: state.totalItems + quantityDiff,
            totalPrice: state.totalPrice + (itemToUpdate.price * quantityDiff),
          }));
        }
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
