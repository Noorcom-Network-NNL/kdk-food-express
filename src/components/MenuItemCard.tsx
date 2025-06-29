
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/data/types";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onUpdateQuantity: (itemId: string, change: number) => void;
}

const MenuItemCard = ({ item, quantity, onUpdateQuantity }: MenuItemCardProps) => {
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
        <div className="flex items-center justify-between">
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
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
