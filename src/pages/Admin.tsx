import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BanknoteIcon, Users, RefreshCw, Calculator, ChartBar } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState('loans');

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

  const navigationItems = [
    { id: 'loans', label: 'Loans', icon: BanknoteIcon },
    { id: 'borrowers', label: 'Borrowers', icon: Users },
    { id: 'recoveries', label: 'Recoveries', icon: RefreshCw },
    { id: 'accounting', label: 'Accounting', icon: Calculator },
    { id: 'analytics', label: 'Analytics', icon: ChartBar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'loans':
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Employer</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{`${application.firstName} ${application.lastName}`}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.phone}</TableCell>
                    <TableCell>${application.income}</TableCell>
                    <TableCell>{application.employment}</TableCell>
                    <TableCell>${application.loanAmount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        application.status === 'approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
                    </TableCell>
                    <TableCell>{application.createdAt}</TableCell>
                    <TableCell>
                      {application.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleStatusUpdate(application.id, 'approved')}
                            className="bg-green-500 hover:bg-green-600"
                            size="sm"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(application.id, 'rejected')}
                            variant="destructive"
                            size="sm"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
        {/* Sidebar Navigation */}
        <div className="w-64 min-h-screen bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <nav className="px-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
        </div>

        {/* Main Content */}
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