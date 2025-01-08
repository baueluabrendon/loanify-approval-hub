import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { LoanApplicationsTable } from "@/components/admin/LoanApplicationsTable";

interface LoanApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  income: string;
  employment: string;
  loanAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const mockApplications: LoanApplication[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    income: '75000',
    employment: 'Tech Corp',
    loanAmount: 5000,
    status: 'pending',
    createdAt: '2024-01-08'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    income: '85000',
    employment: 'Finance Inc',
    loanAmount: 10000,
    status: 'pending',
    createdAt: '2024-01-07'
  }
];

const Admin = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<LoanApplication[]>(mockApplications);
  const [activeTab, setActiveTab] = useState('applications');

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'rejected') => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    toast({
      title: `Application ${newStatus}`,
      description: `Loan application ${id} has been ${newStatus}`,
      className: newStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'applications':
        return <LoanApplicationsTable applications={applications} onStatusUpdate={handleStatusUpdate} />;
      case 'loans':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
            <p className="text-gray-500">Active loans management coming soon...</p>
          </Card>
        );
      case 'borrowers':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Borrowers Management</h2>
            <p className="text-gray-500">Borrower management features coming soon...</p>
          </Card>
        );
      case 'recoveries':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Loan Recoveries</h2>
            <p className="text-gray-500">Recovery tracking features coming soon...</p>
          </Card>
        );
      case 'accounting':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Accounting Overview</h2>
            <p className="text-gray-500">Accounting features coming soon...</p>
          </Card>
        );
      case 'analytics':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
            <p className="text-gray-500">Analytics features coming soon...</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex">
        <div className="w-64 min-h-screen bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex-1 p-8">
          <Card className="backdrop-blur-sm bg-white/90">
            <div className="p-6">
              {renderContent()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;