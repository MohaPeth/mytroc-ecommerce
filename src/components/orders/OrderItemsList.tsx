
import React from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList = ({ items }: OrderItemsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Articles</h3>
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-4 py-3 border-b">
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItemsList;
