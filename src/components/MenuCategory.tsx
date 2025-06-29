
import { MenuItem } from "@/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MenuCategoryProps {
  item: MenuItem;
}

const MenuCategory = ({ item }: MenuCategoryProps) => {
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
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 sm:px-3 sm:py-2"
            >
              <Plus size={16} className="sm:mr-1" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCategory;
