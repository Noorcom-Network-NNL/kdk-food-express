
import { useState } from "react";
import MenuCategory from "./MenuCategory";
import BeverageCategory from "./BeverageCategory";

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

        <MenuCategory 
          category="Shawarma" 
          title="Shawarma Combos" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuCategory 
          category="Wraps" 
          title="Shawarma Wraps" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuCategory 
          category="Plates" 
          title="Shawarma Plates" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuCategory 
          category="Burgers" 
          title="Burgers & Subs" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuCategory 
          category="Fajita" 
          title="Fajita Specials" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuCategory 
          category="Kebab" 
          title="Kebab & Falafel Plates" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />
        <MenuCategory 
          category="Trio" 
          title="Trio Kebab Plates" 
          quantities={quantities}
          onUpdateQuantity={updateQuantity}
        />

        {/* Beverages Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-orange-500 mb-8 text-center">Drinks & Beverages</h3>
          
          <BeverageCategory category="Hot" title="Hot Beverages" columns="lg:grid-cols-3" />
          <BeverageCategory category="Cold" title="Cold Beverages" />
          <BeverageCategory category="Slushies" title="Slushies" />
          <BeverageCategory category="Soft Drinks" title="Soft Drinks" columns="lg:grid-cols-3" />
          <BeverageCategory category="Shakes" title="Shakes" />
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
