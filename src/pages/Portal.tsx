import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const Portal = () => {
  const navigate = useNavigate();
  const [application] = useState({
    id: "LA-2024-001",
    status: "pending",
    amount: 5000,
    submittedDate: "2024-03-15",
    monthlyPayment: 438.71,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-500" />;
      case "rejected":
        return <XCircle className="text-red-500" />;
      default:
        return <Clock className="text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Customer Portal</h1>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            New Application
          </Button>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/90">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <h2 className="text-2xl font-semibold">Loan Application</h2>
                <p className="text-gray-500">Application ID: {application.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(application.status)}
                <span className="capitalize font-medium">
                  {application.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Loan Amount</p>
                <p className="text-2xl font-bold text-primary">
                  ${application.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Monthly Payment</p>
                <p className="text-2xl font-bold text-primary">
                  ${application.monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Submission Date</p>
                <p className="text-lg">
                  {new Date(application.submittedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Interest Rate</p>
                <p className="text-lg">5.0% APR</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Portal;