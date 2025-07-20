import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, ChefHat, Timer, AlertCircle } from 'lucide-react';

interface KitchenOrder {
  id: string;
  order_number: string;
  customer_name: string;
  status: string;
  created_at: string;
  estimated_preparation_time: number;
  items: Array<{
    id: string;
    item_name: string;
    quantity: number;
    special_instructions?: string;
  }>;
}

export function KitchenDisplay() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchKitchenOrders();
    
    // Set up real-time subscription for kitchen-relevant orders
    const ordersSubscription = supabase
      .channel('kitchen-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Kitchen order change:', payload);
          fetchKitchenOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersSubscription);
    };
  }, []);

  const fetchKitchenOrders = async () => {
    try {
      // Fetch orders that need kitchen attention (confirmed, preparing)
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['confirmed', 'preparing'])
        .order('created_at', { ascending: true });

      if (ordersError) throw ordersError;

      // Fetch order items for each order
      const ordersWithItems: KitchenOrder[] = [];
      
      for (const order of ordersData || []) {
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        if (itemsError) {
          console.error('Error fetching items for order:', order.id, itemsError);
          continue;
        }

        ordersWithItems.push({
          ...order,
          items: itemsData || []
        });
      }

      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error fetching kitchen orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch kitchen orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Order moved to ${newStatus}`,
      });

      fetchKitchenOrders();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    }
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const getOrderPriority = (createdAt: string, estimatedTime: number) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffMinutes > estimatedTime + 10) return 'urgent';
    if (diffMinutes > estimatedTime) return 'overdue';
    if (diffMinutes > estimatedTime - 5) return 'warning';
    return 'normal';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 border-red-500 text-red-900';
      case 'overdue': return 'bg-orange-100 border-orange-500 text-orange-900';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-900';
      default: return 'bg-green-100 border-green-500 text-green-900';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <ChefHat className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Kitchen Display</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ChefHat className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Kitchen Display</h2>
          <Badge variant="secondary" className="ml-3">
            {orders.length} orders
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">All caught up!</h3>
            <p className="text-muted-foreground">No orders in the kitchen queue.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const priority = getOrderPriority(order.created_at, order.estimated_preparation_time || 15);
            return (
              <Card key={order.id} className={`${getPriorityColor(priority)} border-2`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.order_number}</CardTitle>
                      <p className="text-sm opacity-80">{order.customer_name}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <Timer className="h-4 w-4 mr-1" />
                        {getTimeElapsed(order.created_at)}
                      </div>
                      {priority === 'urgent' && (
                        <AlertCircle className="h-5 w-5 text-red-600 mt-1" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="bg-white/50 p-2 rounded">
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{item.item_name}</span>
                          <Badge variant="outline" className="ml-2">
                            x{item.quantity}
                          </Badge>
                        </div>
                        {item.special_instructions && (
                          <p className="text-xs mt-1 text-muted-foreground">
                            📝 {item.special_instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="flex-1"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Start Preparing
                      </Button>
                    )}
                    
                    {order.status === 'preparing' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="flex-1"
                        variant="default"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Ready
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}