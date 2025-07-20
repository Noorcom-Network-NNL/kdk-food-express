import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Bell, BellRing, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderAlert {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  created_at: string;
  status: string;
  isNew?: boolean;
}

interface OrderAlertsProps {
  onViewOrder?: (orderId: string) => void;
}

export function OrderAlerts({ onViewOrder }: OrderAlertsProps) {
  const [alerts, setAlerts] = useState<OrderAlert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial pending orders
    fetchPendingOrders();
    
    // Set up real-time subscription for new orders
    const ordersSubscription = supabase
      .channel('new-orders-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          const newOrder = payload.new as OrderAlert;
          handleNewOrder(newOrder);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersSubscription);
    };
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, total_amount, created_at, status')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setAlerts(data || []);
      setUnreadCount(data?.length || 0);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const handleNewOrder = (newOrder: OrderAlert) => {
    // Add to alerts list
    setAlerts(prev => [{ ...newOrder, isNew: true }, ...prev.slice(0, 9)]);
    setUnreadCount(prev => prev + 1);
    
    // Show toast notification
    toast({
      title: "🔔 New Order Received!",
      description: `Order ${newOrder.order_number} from ${newOrder.customer_name}`,
    });

    // Play notification sound (if supported)
    if (typeof Audio !== 'undefined') {
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhAQAA');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore errors if audio fails
      } catch (error) {
        // Ignore audio errors
      }
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isNew: false })));
    setUnreadCount(0);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      {/* Alert Bell Button */}
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative"
        >
          {unreadCount > 0 ? (
            <BellRing className="h-4 w-4 text-primary" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Alerts Panel */}
      {isExpanded && (
        <div className="bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold text-sm">Order Alerts</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No pending orders
              </div>
            ) : (
              alerts.map((alert) => (
                <Alert 
                  key={alert.id} 
                  className={`m-2 ${alert.isNew ? 'border-primary bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <AlertTitle className="text-sm flex items-center gap-2">
                        {alert.isNew && <div className="h-2 w-2 bg-primary rounded-full" />}
                        {alert.order_number}
                      </AlertTitle>
                      <AlertDescription className="text-xs">
                        <div>{alert.customer_name}</div>
                        <div className="flex justify-between items-center mt-1">
                          <span>KSh {Number(alert.total_amount).toLocaleString()}</span>
                          <span className="text-muted-foreground">{formatTime(alert.created_at)}</span>
                        </div>
                      </AlertDescription>
                    </div>
                    <div className="flex gap-1 ml-2">
                      {onViewOrder && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewOrder(alert.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}