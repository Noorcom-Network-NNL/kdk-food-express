import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  MapPin,
  ShoppingCart,
} from 'lucide-react';
import { StatusConfirmationDialog } from './StatusConfirmationDialog';
import { OrderTracking } from './OrderTracking';

export function OrdersManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateNotes, setUpdateNotes] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    orderId: string;
    orderNumber: string;
    currentStatus: string;
    newStatus: string;
  }>({
    isOpen: false,
    orderId: '',
    orderNumber: '',
    currentStatus: '',
    newStatus: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    
    // Set up real-time subscription
    const ordersSubscription = supabase
      .channel('orders-management')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Order change:', payload);
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersSubscription);
    };
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (error) throw error;

      setOrderItems(data || []);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const handleViewOrder = async (order: any) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (orderId: string, orderNumber: string, currentStatus: string, newStatus: string) => {
    setConfirmDialog({
      isOpen: true,
      orderId,
      orderNumber,
      currentStatus,
      newStatus
    });
  };

  const confirmStatusChange = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: confirmDialog.newStatus as 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', confirmDialog.orderId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Order status changed to ${confirmDialog.newStatus}`,
      });

      fetchOrders();
      
      if (selectedOrder?.id === confirmDialog.orderId) {
        setSelectedOrder({ ...selectedOrder, status: confirmDialog.newStatus });
      }
      
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'outline' as const, label: 'Pending', icon: Clock },
      confirmed: { variant: 'default' as const, label: 'Confirmed', icon: CheckCircle },
      preparing: { variant: 'secondary' as const, label: 'Preparing', icon: Clock },
      ready: { variant: 'default' as const, label: 'Ready', icon: CheckCircle },
      delivered: { variant: 'secondary' as const, label: 'Delivered', icon: CheckCircle },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled', icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded w-1/4"></div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        <p className="text-muted-foreground">
          Monitor and manage all customer orders in real-time
        </p>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{order.order_number}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Customer</p>
                      <p className="font-medium">{order.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {order.customer_phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium">KSh {Number(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>

                  {order.customer_address && (
                    <div className="text-sm">
                      <p className="text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Address
                      </p>
                      <p>{order.customer_address}</p>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Ordered: {formatDateTime(order.created_at)}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Order Details - {selectedOrder?.order_number}</DialogTitle>
                        <DialogDescription>
                          Manage order status and view complete order information
                        </DialogDescription>
                      </DialogHeader>

                      {selectedOrder && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Customer Information</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                                <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                                {selectedOrder.customer_address && (
                                  <p><strong>Address:</strong> {selectedOrder.customer_address}</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Order Information</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                                <p><strong>Payment:</strong> {selectedOrder.payment_method || 'Not specified'}</p>
                                <p><strong>Total:</strong> KSh {Number(selectedOrder.total_amount).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Order Items</h4>
                            <div className="space-y-2">
                              {orderItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                                  <div>
                                    <p className="font-medium">{item.item_name}</p>
                                    {item.special_instructions && (
                                      <p className="text-sm text-muted-foreground">
                                        Note: {item.special_instructions}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p>Qty: {item.quantity}</p>
                                    <p className="font-medium">KSh {Number(item.subtotal).toLocaleString()}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Update Status</h4>
                            <div className="flex space-x-2">
                              <Select
                                value={selectedOrder.status}
                                onValueChange={(value) => handleStatusChange(selectedOrder.id, selectedOrder.order_number, selectedOrder.status, value)}
                              >
                                <SelectTrigger className="w-48">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="preparing">Preparing</SelectItem>
                                  <SelectItem value="ready">Ready</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Order Tracking */}
                          <OrderTracking 
                            orderId={selectedOrder.id} 
                            currentStatus={selectedOrder.status} 
                          />

                          {selectedOrder.notes && (
                            <div>
                              <h4 className="font-medium mb-2">Customer Notes</h4>
                              <p className="text-sm bg-muted p-3 rounded">{selectedOrder.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, order.order_number, order.status, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {orders.length === 0 
                  ? "No orders have been placed yet."
                  : "No orders match your current filters."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Status Confirmation Dialog */}
      <StatusConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmStatusChange}
        orderNumber={confirmDialog.orderNumber}
        currentStatus={confirmDialog.currentStatus}
        newStatus={confirmDialog.newStatus}
      />
    </div>
  );
}