import { Clock, MapPin, Phone, Mail, Users, Award, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About KDK</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Bringing authentic Middle Eastern flavors to Nairobi with passion, quality, and speed.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Established in early 2024, Kumi Doner Kebab (KDK) was born from a passion for authentic Middle Eastern cuisine and a vision to bring fresh, flavorful fast food to the heart of Nairobi.
                </p>
                <p className="text-gray-600 mb-4">
                  Located in the bustling KTDA Plaza on Tom Mboya Street, we've quickly become a favorite destination for food lovers seeking quality shawarma, kebabs, and doner wraps that satisfy both taste and hunger.
                </p>
                <p className="text-gray-600">
                  Our commitment to using fresh ingredients, traditional recipes, and modern preparation techniques ensures every bite delivers an exceptional experience.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <img 
                  src="/lovable-uploads/3d568dbd-6d84-4d53-a9f4-8415a4e8bf35.png" 
                  alt="KDK Food Express" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">What Makes Us Special</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Authentic Recipes</h3>
                <p className="text-gray-600">
                  Traditional Middle Eastern recipes passed down through generations, ensuring authentic flavors in every bite.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Fast Service</h3>
                <p className="text-gray-600">
                  Quick preparation without compromising quality. Perfect for busy professionals and food enthusiasts alike.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3">Quality Ingredients</h3>
                <p className="text-gray-600">
                  Fresh ingredients sourced daily, halal-certified meats, and house-made sauces for the best taste experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Specialties */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">Our Specialties</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold text-orange-500 mb-3">Signature Doner Kebabs</h3>
                <p className="text-gray-600 mb-4">
                  Tender, marinated meat cooked on traditional rotating spits, served in fresh pita with crisp vegetables and our signature sauces.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Chicken Doner</li>
                  <li>• Beef Doner</li>
                  <li>• Mixed Doner</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold text-orange-500 mb-3">Fresh Shawarma</h3>
                <p className="text-gray-600 mb-4">
                  Authentic shawarma wraps with perfectly seasoned meat, fresh vegetables, and our house-made garlic and tahini sauces.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Chicken Shawarma</li>
                  <li>• Beef Shawarma</li>
                  <li>• Vegetarian Options</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold text-orange-500 mb-3">Trio Plates</h3>
                <p className="text-gray-600 mb-4">
                  Complete meals featuring your choice of kebab with rice or fries, complementary sides, and a refreshing drink.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Chicken Kebab Plate</li>
                  <li>• Meat Kebab Plate</li>
                  <li>• Includes sides & drink</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold text-orange-500 mb-3">Sides & More</h3>
                <p className="text-gray-600 mb-4">
                  Perfect accompaniments to complete your meal, from crispy fries to traditional Middle Eastern sides.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Crispy Chips/Fries</li>
                  <li>• Hummus & Pita</li>
                  <li>• Fresh Beverages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="bg-orange-500 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Visit Us Today</h2>
            <p className="text-lg mb-8 opacity-90">
              Experience the authentic taste of Middle Eastern cuisine in the heart of Nairobi.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <MapPin size={24} className="mb-2" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm opacity-90">KTDA Plaza, Tom Mboya Street<br />Nairobi, Kenya</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Clock size={24} className="mb-2" />
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-sm opacity-90">Mon-Fri: 10AM-10PM<br />Sat-Sun: 11AM-11PM</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Phone size={24} className="mb-2" />
                <h3 className="font-semibold mb-1">Contact</h3>
                <p className="text-sm opacity-90">0728777712<br />info@kdk-restaurant.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;