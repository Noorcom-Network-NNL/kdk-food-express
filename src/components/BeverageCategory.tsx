
import { beverages } from "@/data/menuData";
import BeverageCard from "./BeverageCard";

interface BeverageCategoryProps {
  category: string;
  title: string;
  columns?: string;
}

const BeverageCategory = ({ 
  category, 
  title, 
  columns = "lg:grid-cols-4" 
}: BeverageCategoryProps) => {
  return (
    <div className="mb-8">
      <h4 className="text-xl font-bold text-orange-600 mb-4">{title}</h4>
      <div className={`grid md:grid-cols-2 ${columns} gap-4`}>
        {beverages
          .filter(drink => drink.category === category)
          .map((drink, index) => (
            <BeverageCard key={index} beverage={drink} />
          ))}
      </div>
    </div>
  );
};

export default BeverageCategory;
