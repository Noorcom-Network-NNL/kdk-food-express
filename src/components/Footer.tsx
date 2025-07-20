
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter, CreditCard } from "lucide-react";

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
                <span className="text-sm">0728777712</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm">orders@kumidoner.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Kumi Doner Kebab (KDK)<br />KTDA Plaza, Moi Avenue Street, Nairobi, Kenya</span>
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

          {/* Payment Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CreditCard size={16} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm">Cash on Delivery</span>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone size={16} className="text-white flex-shrink-0" />
                  <span className="text-sm font-semibold text-white">LIPA NA MPESA</span>
                </div>
                <div className="text-xs text-green-100">
                  Till Number: <span className="font-bold text-white">8037737</span>
                </div>
                <div className="text-xs text-green-100 mt-1">
                  Share payment reference on WhatsApp: 0728777712
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional MPESA Section */}
        <div className="mt-6 sm:mt-8 p-4 bg-green-700 rounded-lg">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-2">Quick MPESA Payment</h4>
            <p className="text-green-100 text-sm mb-3">Pay instantly via MPESA for faster order processing</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Phone size={20} />
                <span className="font-bold">Till Number: 8037737</span>
              </div>
              <div className="text-green-100">•</div>
              <span className="text-sm">Share payment reference on WhatsApp: 0728777712</span>
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
