import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  MenuIcon,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  adminProfile: any;
}

const menuItems = [
  {
    title: 'Overview',
    url: 'overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Orders',
    url: 'orders',
    icon: ShoppingCart,
  },
  {
    title: 'Menu',
    url: 'menu',
    icon: MenuIcon,
  },
  {
    title: 'Customers',
    url: 'customers',
    icon: Users,
  },
  {
    title: 'Analytics',
    url: 'analytics',
    icon: BarChart3,
  },
];

export function AdminSidebar({ currentView, onViewChange, adminProfile }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold">
            {!collapsed && 'KDK Admin'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.url)}
                    className={
                      currentView === item.url
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && adminProfile && (
          <div className="mt-auto p-4 border-t">
            <div className="text-sm">
              <p className="font-medium">{adminProfile.name}</p>
              <p className="text-muted-foreground text-xs">{adminProfile.role}</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}