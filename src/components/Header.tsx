
import { ShoppingCart, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3d568dbd-6d84-4d53-a9f4-8415a4e8bf35.png" 
              alt="KDK Food Express" 
              className="h-10 w-auto sm:h-12"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#menu" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</a>
            <a href="/about" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
            <a href="/admin/login" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Admin</a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:0728777712" className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
              <Phone size={18} />
              <span className="hidden lg:inline">Order Now</span>
            </a>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <ShoppingCart size={18} className="mr-2" />
              <span className="hidden sm:inline">Cart (0)</span>
              <span className="sm:hidden">0</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white p-2">
              <ShoppingCart size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#menu" 
                className="text-gray-700 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </a>
              <a 
                href="/about" 
                className="text-gray-700 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="tel:0728777712" 
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone size={18} />
                <span>Call to Order</span>
              </a>
              <a 
                href="/admin/login" 
                className="text-gray-600 hover:text-orange-500 transition-colors py-2 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
