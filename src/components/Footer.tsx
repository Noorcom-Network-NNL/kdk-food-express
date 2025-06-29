
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/3d568dbd-6d84-4d53-a9f4-8415a4e8bf35.png" 
                alt="KDK Food Express" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm">
              Authentic Middle Eastern cuisine delivered fresh to your door.
            </p>
            <div className="flex space-x-4">
              <Facebook size={20} className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm">info@kdkfoodexpress.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Main Street, Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-orange-500 flex-shrink-0" />
                <div className="text-sm">
                  <div>Mon - Fri: 10:00 AM - 10:00 PM</div>
                  <div>Sat - Sun: 11:00 AM - 11:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Quick Links</h3>
            <div className="space-y-2">
              <a href="#menu" className="block text-sm text-gray-300 hover:text-orange-500 transition-colors">
                Our Menu
              </a>
              <a href="#about" className="block text-sm text-gray-300 hover:text-orange-500 transition-colors">
                About Us
              </a>
              <a href="#contact" className="block text-sm text-gray-300 hover:text-orange-500 transition-colors">
                Contact
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-orange-500 transition-colors">
                Order Online
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © 2024 KDK Food Express. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
