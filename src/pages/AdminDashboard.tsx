import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { OrdersManagement } from '@/components/admin/OrdersManagement';
import { useToast } from '@/hooks/use-toast';

type AdminView = 'overview' | 'orders' | 'menu' | 'customers' | 'analytics';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          navigate('/admin/login');
          return;
        }

        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('is_active', true)
          .single();

        if (profileError || !profile) {
          await supabase.auth.signOut();
          navigate('/admin/login');
          toast({
            title: "Access denied",
            description: "Admin privileges required.",
            variant: "destructive",
          });
          return;
        }

        setAdminProfile(profile);
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/admin/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
      toast({
        title: "Logged out",
        description: "Successfully signed out of admin panel.",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'orders':
        return <OrdersManagement />;
      case 'menu':
        return <div className="p-8 text-center"><h3>Menu Management - Coming Soon</h3></div>;
      case 'customers':
        return <div className="p-8 text-center"><h3>Customer Management - Coming Soon</h3></div>;
      case 'analytics':
        return <div className="p-8 text-center"><h3>Analytics - Coming Soon</h3></div>;
      default:
        return <DashboardOverview />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar
          currentView={currentView}
          onViewChange={(view: string) => setCurrentView(view as AdminView)}
          adminProfile={adminProfile}
        />
        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader
            adminProfile={adminProfile}
            onLogout={handleLogout}
          />
          <main className="flex-1 p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;