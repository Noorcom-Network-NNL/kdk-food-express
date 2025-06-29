
import { useState } from "react";
import { menuItems } from "@/data/menuItems";
import MenuCategory from "./MenuCategory";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const categories = [...new Set(menuItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Menu
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of Middle Eastern cuisine
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className={`text-sm sm:text-base px-3 sm:px-6 py-2 ${
              selectedCategory === null 
                ? "bg-orange-500 hover:bg-orange-600 text-white" 
                : "border-orange-500 text-orange-500 hover:bg-orange-50"
            }`}
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm sm:text-base px-3 sm:px-6 py-2 ${
                selectedCategory === category 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "border-orange-500 text-orange-500 hover:bg-orange-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <MenuCategory key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
