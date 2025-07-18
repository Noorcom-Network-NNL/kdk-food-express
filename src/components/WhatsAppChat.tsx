import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppChat = () => {
  const phoneNumber = "+254728777712";
  const message = "Hello! I'd like to place an order at KDK Food Express.";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="lg"
      >
        <MessageCircle size={24} />
        <span className="sr-only">Chat on WhatsApp</span>
      </Button>
    </div>
  );
};

export default WhatsAppChat;