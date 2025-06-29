
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BeverageItem } from "@/data/menuData";

interface BeverageCardProps {
  beverage: BeverageItem;
}

const BeverageCard = ({ beverage }: BeverageCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-semibold text-sm">{beverage.name}</h5>
          <span className="text-orange-500 font-bold">Kes. {beverage.price}</span>
        </div>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
          <Plus size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default BeverageCard;
