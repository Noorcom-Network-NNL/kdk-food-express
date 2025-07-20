
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Delicious <span className="text-orange-500">Middle Eastern</span> Cuisine
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Experience authentic flavors with our fresh shawarma, grilled kebabs, and refreshing beverages. 
          Order online for quick pickup or delivery!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Order Online Now
            <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
