
import { 
  LayoutDashboard, 
  Receipt, 
  FileText, 
  UserCircle, 
  LogOut 
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex justify-center p-6">
          <img 
            src="/lovable-uploads/8515b465-52f2-4f7b-a34e-4399dfc8009e.png" 
            alt="MDC-CAST Logo" 
            className="h-16 w-16"
          />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard" className="w-full">
              <SidebarMenuButton className="w-full">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/dashboard" className="w-full">
              <SidebarMenuButton className="w-full">
                <Receipt />
                <span>Expenses</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/dashboard" className="w-full">
              <SidebarMenuButton className="w-full">
                <FileText />
                <span>Expense Reports</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/dashboard" className="w-full">
              <SidebarMenuButton className="w-full">
                <UserCircle />
                <span>Profile</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full text-red-500 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
