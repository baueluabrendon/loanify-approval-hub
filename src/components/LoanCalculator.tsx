import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export const LoanCalculator = ({
  onAmountChange,
}: {
  onAmountChange: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState(5000);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Simple interest calculation (5% annual rate)
    const monthlyRate = 0.05 / 12;
    const months = 12;
    const payment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setMonthlyPayment(payment);
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg animate-fadeIn">
      <h3 className="text-2xl font-semibold mb-4">Loan Calculator</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Loan Amount</label>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-primary">
              ${amount.toLocaleString()}
            </span>
            <Slider
              defaultValue={[5000]}
              max={50000}
              min={1000}
              step={1000}
              onValueChange={(value) => setAmount(value[0])}
              className="flex-1"
            />
          </div>
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monthly Payment</span>
            <span className="text-xl font-semibold">
              ${monthlyPayment.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Annual Interest Rate</span>
            <span className="text-xl font-semibold">5%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};