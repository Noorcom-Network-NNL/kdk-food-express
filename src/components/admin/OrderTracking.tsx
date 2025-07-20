import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  CheckCircle, 
  ChefHat, 
  Package, 
  Truck, 
  XCircle,
  User,
  Calendar
} from 'lucide-react';

interface OrderStatusHistory {
  id: string;
  status: string;
  created_at: string;
  notes?: string;
  changed_by?: string;
}

interface OrderTrackingProps {
  orderId: string;
  currentStatus: string;
}

export function OrderTracking({ orderId, currentStatus }: OrderTrackingProps) {
  const [statusHistory, setStatusHistory] = useState<OrderStatusHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchStatusHistory();
    }
  }, [orderId]);

  const fetchStatusHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStatusHistory(data || []);
    } catch (error) {
      console.error('Error fetching status history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        icon: Clock,
        label: 'Order Received',
        description: 'Your order has been received and is being reviewed',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-300'
      },
      confirmed: {
        icon: CheckCircle,
        label: 'Order Confirmed',
        description: 'Your order has been confirmed and sent to kitchen',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-300'
      },
      preparing: {
        icon: ChefHat,
        label: 'Preparing',
        description: 'Your food is being freshly prepared',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-300'
      },
      ready: {
        icon: Package,
        label: 'Ready for Pickup',
        description: 'Your order is ready for pickup or delivery',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-300'
      },
      delivered: {
        icon: Truck,
        label: 'Delivered',
        description: 'Your order has been delivered. Enjoy your meal!',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-300'
      },
      cancelled: {
        icon: XCircle,
        label: 'Cancelled',
        description: 'This order has been cancelled',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300'
      }
    };

    return configs[status as keyof typeof configs] || configs.pending;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOrderSteps = () => {
    const allSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    
    if (currentStatus === 'cancelled') {
      return ['pending', 'cancelled'];
    }
    
    const currentIndex = allSteps.indexOf(currentStatus);
    return allSteps.slice(0, currentIndex + 1);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const steps = getOrderSteps();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Status Overview */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-3">
              {React.createElement(getStatusConfig(currentStatus).icon, {
                className: `h-6 w-6 ${getStatusConfig(currentStatus).color}`
              })}
              <div>
                <h4 className="font-semibold">{getStatusConfig(currentStatus).label}</h4>
                <p className="text-sm text-muted-foreground">
                  {getStatusConfig(currentStatus).description}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const config = getStatusConfig(step);
              const isCompleted = steps.indexOf(step) <= steps.indexOf(currentStatus);
              const isCurrent = step === currentStatus;
              
              return (
                <div key={step} className="flex items-start gap-3">
                  {/* Step Icon */}
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2
                    ${isCompleted 
                      ? `${config.bgColor} ${config.borderColor} ${config.color}` 
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                    }
                  `}>
                    {React.createElement(config.icon, { className: 'h-5 w-5' })}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {config.label}
                      </h4>
                      {isCurrent && (
                        <Badge variant="outline" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                      {config.description}
                    </p>
                    
                    {/* Timestamp from history */}
                    {statusHistory.find(h => h.status === step) && (
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDateTime(statusHistory.find(h => h.status === step)!.created_at)}
                      </div>
                    )}
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 mt-10 w-0.5 h-8 bg-muted-foreground/20"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed History */}
          {statusHistory.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground">Status History</h4>
              <div className="space-y-2">
                {statusHistory.map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center text-xs bg-muted/50 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {entry.status}
                      </Badge>
                      {entry.notes && (
                        <span className="text-muted-foreground">• {entry.notes}</span>
                      )}
                    </div>
                    <span className="text-muted-foreground">
                      {formatDateTime(entry.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}