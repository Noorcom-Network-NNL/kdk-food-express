import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import {
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
  completedOrders: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time subscriptions
    const ordersSubscription = supabase
      .channel('dashboard-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersSubscription);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch orders data
      const { data: orders } = await supabase
        .from('orders')
        .select('*');

      // Fetch customers data
      const { data: customers } = await supabase
        .from('customers')
        .select('id');

      // Fetch recent orders with details
      const { data: recent } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders && customers) {
        const todayOrders = orders.filter(order => 
          order.created_at.split('T')[0] === today
        );
        
        const pendingOrders = orders.filter(order => 
          order.status === 'pending' || order.status === 'confirmed'
        );
        
        const completedOrders = orders.filter(order => 
          order.status === 'delivered'
        );

        setStats({
          totalOrders: orders.length,
          todayOrders: todayOrders.length,
          totalRevenue: orders.reduce((sum, order) => sum + Number(order.total_amount), 0),
          todayRevenue: todayOrders.reduce((sum, order) => sum + Number(order.total_amount), 0),
          totalCustomers: customers.length,
          pendingOrders: pendingOrders.length,
          completedOrders: completedOrders.length,
        });
      }

      if (recent) {
        setRecentOrders(recent);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'outline' as const, label: 'Pending' },
      confirmed: { variant: 'default' as const, label: 'Confirmed' },
      preparing: { variant: 'secondary' as const, label: 'Preparing' },
      ready: { variant: 'default' as const, label: 'Ready' },
      delivered: { variant: 'secondary' as const, label: 'Delivered' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome to your restaurant management dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.todayOrders} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              KSh {stats.todayRevenue.toLocaleString()} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Total registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.order_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_name} • KSh {Number(order.total_amount).toLocaleString()}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No orders yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Order completion overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Pending Orders</span>
              </div>
              <span className="font-medium">{stats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Completed Orders</span>
              </div>
              <span className="font-medium">{stats.completedOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Success Rate</span>
              </div>
              <span className="font-medium">
                {stats.totalOrders > 0 
                  ? Math.round((stats.completedOrders / stats.totalOrders) * 100)
                  : 0}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}