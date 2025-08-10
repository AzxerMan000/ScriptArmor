import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Shield, Home, Code, Key, Users, Link, LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, logoutMutation } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "scripts", label: "My Scripts", icon: Code },
    { id: "keys", label: "Keys & Access", icon: Key },
    { id: "whitelist", label: "Whitelist", icon: Users },
    { id: "links", label: "Generated Links", icon: Link },
  ];

  const getUserInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center mr-3">
              <Shield className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">ScriptArmor</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
                  activeTab === item.id
                    ? "text-brand-blue bg-blue-50"
                    : "text-gray-600 hover:text-brand-blue hover:bg-gray-50"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user ? getUserInitials(user.username) : "U"}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user?.username || "User"}
              </p>
              <Button
                variant="link"
                size="sm"
                className="text-xs text-gray-500 hover:text-red-600 p-0 h-auto"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="w-3 h-3 mr-1" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
