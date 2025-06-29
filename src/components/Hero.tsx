
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Delicious <span className="text-orange-500">Middle Eastern</span> Cuisine
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience authentic flavors with our fresh shawarma, grilled kebabs, and refreshing beverages. 
          Order online for quick pickup or delivery!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
            Order Online Now
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 text-lg">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
