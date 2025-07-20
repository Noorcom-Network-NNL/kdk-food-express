
import React, { useState } from 'react';
import { MenuItem } from "@/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, ShoppingCart } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface MenuCategoryProps {
  item: MenuItem;
}

const MenuCategory = ({ item }: MenuCategoryProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { toast } = useToast();

  const addToCart = () => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      special_instructions: specialInstructions || undefined
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('kdk-cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      existingCart[existingItemIndex].quantity += quantity;
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
      description: `${quantity}x ${item.name} added to your cart`,
    });

    // Reset form
    setQuantity(1);
    setSpecialInstructions('');
    setShowAddDialog(false);

    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col h-full">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
            {item.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg sm:text-xl font-bold text-orange-500">
              Kes. {item.price}
            </span>
            
            {/* Add to Cart Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 sm:px-3 sm:py-2"
                >
                  <Plus size={16} className="sm:mr-1" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add {item.name} to Cart</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
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
                      Total: Kes. {(item.price * quantity).toLocaleString()}
                    </span>
                    <Button onClick={addToCart}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCategory;
