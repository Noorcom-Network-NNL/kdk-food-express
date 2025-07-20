import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCart, User, Phone, MapPin, CreditCard, Banknote } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  special_instructions?: string;
}

interface OrderFormProps {
  cartItems: CartItem[];
  total: number;
  onOrderSuccess: () => void;
}

const OrderForm = ({ cartItems, total, onOrderSuccess }: OrderFormProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mpesa'>('cash');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create order
      const { data, error } = await supabase.functions.invoke('create-order', {
        body: {
          customer: customerInfo,
          items: cartItems,
          total,
          paymentMethod,
          mpesaPhone: paymentMethod === 'mpesa' ? mpesaPhone : null,
          specialInstructions
        }
      });

      if (error) throw error;

      if (paymentMethod === 'mpesa' && data?.checkoutRequestId) {
        toast({
          title: "MPESA Payment Initiated",
          description: "Please check your phone and enter your MPESA PIN to complete the payment.",
        });
        
        // Poll for payment status
        checkPaymentStatus(data.checkoutRequestId, data.orderId);
      } else {
        toast({
          title: "Order Placed Successfully",
          description: `Order #${data.orderNumber} has been placed. ${paymentMethod === 'cash' ? 'Pay on delivery.' : ''}`,
        });
        onOrderSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (checkoutRequestId: string, orderId: string) => {
    // Poll payment status for MPESA
    const pollInterval = setInterval(async () => {
      try {
        const { data } = await supabase.functions.invoke('check-mpesa-status', {
          body: { checkoutRequestId, orderId }
        });

        if (data?.status === 'completed') {
          clearInterval(pollInterval);
          toast({
            title: "Payment Successful",
            description: "Your MPESA payment has been confirmed!",
          });
          onOrderSuccess();
        } else if (data?.status === 'failed') {
          clearInterval(pollInterval);
          toast({
            title: "Payment Failed",
            description: "MPESA payment failed. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    }, 3000);

    // Stop polling after 2 minutes
    setTimeout(() => clearInterval(pollInterval), 120000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Complete Your Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="254XXXXXXXXX"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h3>
            <RadioGroup value={paymentMethod} onValueChange={(value: 'cash' | 'mpesa') => setPaymentMethod(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Cash on Delivery
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mpesa" id="mpesa" />
                <Label htmlFor="mpesa" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  MPESA
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'mpesa' && (
              <div>
                <Label htmlFor="mpesa-phone">MPESA Phone Number</Label>
                <Input
                  id="mpesa-phone"
                  type="tel"
                  placeholder="254XXXXXXXXX"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {/* Special Instructions */}
          <div>
            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any special requests or delivery instructions..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : `Place Order - KSh ${total.toLocaleString()}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;