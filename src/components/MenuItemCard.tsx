
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { MenuItem } from "@/data/types";
import { useToast } from '@/hooks/use-toast';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onUpdateQuantity: (itemId: string, change: number) => void;
}

const MenuItemCard = ({ item, quantity, onUpdateQuantity }: MenuItemCardProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { toast } = useToast();

  const addToCart = () => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: cartQuantity,
      special_instructions: specialInstructions || undefined
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('kdk-cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      existingCart[existingItemIndex].quantity += cartQuantity;
      if (specialInstructions) {
        existingCart[existingItemIndex].special_instructions = specialInstructions;
      }
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }

    // Save back to localStorage
    localStorage.setItem('kdk-cart', JSON.stringify(existingCart));

    toast({
      title: "Added to Cart",
      description: `${cartQuantity}x ${item.name} added to your cart`,
    });

    // Reset form
    setCartQuantity(1);
    setSpecialInstructions('');
    setShowAddDialog(false);

    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h4 className="font-bold text-lg mb-2">{item.name}</h4>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-orange-500">Kes. {item.price}</span>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateQuantity(item.id, -1)}
              disabled={!quantity}
            >
              <Minus size={16} />
            </Button>
            <span className="w-8 text-center">{quantity || 0}</span>
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => onUpdateQuantity(item.id, 1)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
        
        {/* Add to Cart Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add {item.name} to Cart</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cart-quantity">Quantity</Label>
                <Input
                  id="cart-quantity"
                  type="number"
                  min="1"
                  value={cartQuantity}
                  onChange={(e) => setCartQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <div>
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special requests..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">
                  Total: Kes. {(item.price * cartQuantity).toLocaleString()}
                </span>
                <Button onClick={addToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
