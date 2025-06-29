
import { ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/3d568dbd-6d84-4d53-a9f4-8415a4e8bf35.png" 
            alt="KDK Food Express" 
            className="h-12 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#menu" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</a>
          <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
          <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="tel:+254700000000" className="hidden md:flex items-center space-x-2 text-orange-500">
            <Phone size={20} />
            <span>Order Now</span>
          </a>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <ShoppingCart size={20} className="mr-2" />
            Cart (0)
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
