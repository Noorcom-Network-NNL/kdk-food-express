
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Shawarma Combo",
    description: "Served with fries & soda",
    price: 450,
    image: "/lovable-uploads/98fc10a2-59b4-413c-a278-483ac1a106a0.png",
    category: "Shawarma"
  },
  {
    id: "2", 
    name: "Doner Shawarma Combo",
    description: "Served with fries & soda",
    price: 500,
    image: "/lovable-uploads/98fc10a2-59b4-413c-a278-483ac1a106a0.png",
    category: "Shawarma"
  },
  {
    id: "3",
    name: "Chicken Shawarma Wrap",
    description: "Fresh wrap with tender chicken",
    price: 350,
    image: "/lovable-uploads/dfce79e6-c6b5-4b7b-a658-b6d3cd164935.png",
    category: "Wraps"
  },
  {
    id: "4",
    name: "Doner Shawarma Wrap", 
    description: "Authentic doner in fresh wrap",
    price: 400,
    image: "/lovable-uploads/dfce79e6-c6b5-4b7b-a658-b6d3cd164935.png",
    category: "Wraps"
  },
  {
    id: "5",
    name: "Meat Kebab (Kafta) Plate",
    description: "Served with rice/fries, salad, humus & soda",
    price: 600,
    image: "/lovable-uploads/5ad0868b-6885-4a4b-8614-a9955df9fe40.png",
    category: "Kebab"
  },
  {
    id: "6",
    name: "Beef Kebab Plate",
    description: "Served with rice/fries, salad, humus & soda", 
    price: 700,
    image: "/lovable-uploads/5ad0868b-6885-4a4b-8614-a9955df9fe40.png",
    category: "Kebab"
  },
  {
    id: "7",
    name: "Mixed BBQ Plate",
    description: "Served with rice/fries, salad, humus & soda",
    price: 700,
    image: "/lovable-uploads/5ad0868b-6885-4a4b-8614-a9955df9fe40.png",
    category: "Kebab"
  }
];

const beverages = [
  { name: "Vanilla Shake", price: 300 },
  { name: "Strawberry Shake", price: 300 },
  { name: "Oreo Shake", price: 300 },
  { name: "Mango Shake", price: 300 }
];

const MenuSection = () => {
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">Authentic Middle Eastern flavors made fresh daily</p>
        </div>

        {/* Shawarma & Wraps */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-orange-500 mb-6">Shawarma & Wraps</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(item => item.category === "Shawarma" || item.category === "Wraps").map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!quantities[item.id]}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center">{quantities[item.id] || 0}</span>
                      <Button 
                        size="sm" 
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Kebab Plates */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-orange-500 mb-6">Kebab Plates</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(item => item.category === "Kebab").map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!quantities[item.id]}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center">{quantities[item.id] || 0}</span>
                      <Button 
                        size="sm" 
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Beverages */}
        <div>
          <h3 className="text-2xl font-bold text-orange-500 mb-6">Drinks & Beverages</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {beverages.map((drink, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{drink.name}</h4>
                    <span className="text-orange-500 font-bold">Kes. {drink.price}</span>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Plus size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
