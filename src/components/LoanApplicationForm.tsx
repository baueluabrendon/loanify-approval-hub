import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoanCalculator } from "./LoanCalculator";

export const LoanApplicationForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    income: "",
    employment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
      className: "bg-primary text-white",
    });
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-2xl p-8 backdrop-blur-sm bg-white/90 shadow-lg animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Loan Application</h2>
          <p className="text-gray-600">Complete the form below to apply</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`w-1/2 h-2 rounded-full mx-1 transition-colors duration-300 ${
                  i <= step ? "bg-primary" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <div className="space-y-6 animate-slideIn">
              <LoanCalculator onAmountChange={setLoanAmount} />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
              </div>
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
              >
                Next Step
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-slideIn">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
                <Input
                  name="income"
                  type="number"
                  placeholder="Annual Income"
                  value={formData.income}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
                <Input
                  name="employment"
                  placeholder="Current Employer"
                  value={formData.employment}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-200"
                >
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};