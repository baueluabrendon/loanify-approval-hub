import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Card } from "@/components/ui/card";

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

// Mock data - in a real app this would come from your backend
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="max-w-6xl mx-auto p-6 backdrop-blur-sm bg-white/90">
        <h1 className="text-3xl font-bold mb-6">Loan Applications Dashboard</h1>
        
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
      </Card>
    </div>
  );
};

export default Admin;