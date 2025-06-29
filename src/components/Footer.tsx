
import { Phone, MapPin, Clock, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/3d568dbd-6d84-4d53-a9f4-8415a4e8bf35.png" 
              alt="KDK Food Express" 
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4">
              Authentic Middle Eastern cuisine delivered fresh to your door. 
              Experience the taste of tradition with modern convenience.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-500" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-500" />
                <span>info@kdkfoodexpress.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-orange-500" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock size={18} className="text-orange-500" />
                <div>
                  <p>Mon - Sun</p>
                  <p className="text-gray-300">10:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 KDK Food Express. All rights reserved. | Online Food Ordering System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
