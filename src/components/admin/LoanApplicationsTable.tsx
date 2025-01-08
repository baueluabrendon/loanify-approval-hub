import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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

interface LoanApplicationsTableProps {
  applications: LoanApplication[];
  onStatusUpdate: (id: string, status: 'approved' | 'rejected') => void;
}

export const LoanApplicationsTable = ({ applications, onStatusUpdate }: LoanApplicationsTableProps) => {
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
                      onClick={() => onStatusUpdate(application.id, 'approved')}
                      className="bg-green-500 hover:bg-green-600"
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => onStatusUpdate(application.id, 'rejected')}
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
};