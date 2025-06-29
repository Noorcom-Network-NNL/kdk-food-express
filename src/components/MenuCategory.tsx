
import { menuItems } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";

interface MenuCategoryProps {
  category: string;
  title: string;
  quantities: {[key: string]: number};
  onUpdateQuantity: (itemId: string, change: number) => void;
}

const MenuCategory = ({ category, title, quantities, onUpdateQuantity }: MenuCategoryProps) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-orange-500 mb-6">{title}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems
          .filter(item => item.category === category)
          .map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              quantity={quantities[item.id]}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
      </div>
    </div>
  );
};

export default MenuCategory;
