import { BanknoteIcon, Users, RefreshCw, Calculator, ChartBar, FileText } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType;
}

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AdminNavigation = ({ activeTab, onTabChange }: AdminNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'loans', label: 'Loans', icon: BanknoteIcon },
    { id: 'borrowers', label: 'Borrowers', icon: Users },
    { id: 'recoveries', label: 'Recoveries', icon: RefreshCw },
    { id: 'accounting', label: 'Accounting', icon: Calculator },
    { id: 'analytics', label: 'Analytics', icon: ChartBar },
  ];

  return (
    <nav className="px-4">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left mb-2 transition-colors ${
            activeTab === item.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-gray-100'
          }`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </button>
      ))}
    </nav>
  );
};