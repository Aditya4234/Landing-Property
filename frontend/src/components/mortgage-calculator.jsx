"use client";

import React, { useState, useEffect } from "react";
import { Calculator, IndianRupee, Percent, Calendar, TrendingUp, Download, Share2, Home } from "lucide-react";
import Link from "next/link";

const MortgageCalculator = () => {
  const [calculatorType, setCalculatorType] = useState("emi"); // "emi" or "loanAmount"
  const [formData, setFormData] = useState({
    loanAmount: 5000000, // ₹50 Lakhs
    interestRate: 8.5, // 8.5%
    loanTenure: 20, // 20 years
    downPayment: 1000000, // ₹10 Lakhs
    propertyValue: 6000000, // ₹60 Lakhs
  });

  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalAmount: 0,
    totalInterest: 0,
    loanToValue: 0,
    affordability: {
      maxLoanAmount: 0,
      maxEMI: 0,
    }
  });

  const [chartData, setChartData] = useState({
    principal: 0,
    interest: 0,
    labels: []
  });

  // Calculate EMI
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const numberOfPayments = tenure * 12;

    if (monthlyRate === 0) return principal / numberOfPayments;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return emi;
  };

  // Calculate loan amount based on EMI
  const calculateLoanAmount = (emi, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const numberOfPayments = tenure * 12;

    if (monthlyRate === 0) return emi * numberOfPayments;

    const loanAmount = (emi * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
                       (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));

    return loanAmount;
  };

  // Calculate affordability based on income
  const calculateAffordability = (monthlyIncome, existingEMI = 0) => {
    // Using 50% of monthly income for housing (including existing EMI)
    const maxHousingEMI = (monthlyIncome * 0.5) - existingEMI;
    const maxLoanAmount = calculateLoanAmount(maxHousingEMI, formData.interestRate, formData.loanTenure);

    return {
      maxLoanAmount: Math.max(0, maxLoanAmount),
      maxEMI: Math.max(0, maxHousingEMI)
    };
  };

  useEffect(() => {
    let monthlyEMI, totalAmount, totalInterest, loanAmount;

    if (calculatorType === "emi") {
      loanAmount = formData.loanAmount;
      monthlyEMI = calculateEMI(loanAmount, formData.interestRate, formData.loanTenure);
      totalAmount = monthlyEMI * formData.loanTenure * 12;
      totalInterest = totalAmount - loanAmount;
    } else {
      // Calculate loan amount based on affordability
      const affordability = calculateAffordability(formData.monthlyIncome || 50000, formData.existingEMI || 0);
      loanAmount = affordability.maxLoanAmount;
      monthlyEMI = affordability.maxEMI;
      totalAmount = monthlyEMI * formData.loanTenure * 12;
      totalInterest = totalAmount - loanAmount;
    }

    const loanToValue = formData.propertyValue ? (loanAmount / formData.propertyValue) * 100 : 0;

    setResults({
      monthlyEMI,
      totalAmount,
      totalInterest,
      loanToValue,
      affordability: calculateAffordability(formData.monthlyIncome || 50000, formData.existingEMI || 0)
    });

    // Generate chart data
    const principalPercent = (loanAmount / totalAmount) * 100;
    const interestPercent = (totalInterest / totalAmount) * 100;

    setChartData({
      principal: principalPercent,
      interest: interestPercent,
      labels: ['Principal', 'Interest']
    });
  }, [formData, calculatorType]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const exportResults = () => {
    const data = {
      calculatorType,
      inputs: formData,
      results,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mortgage-calculation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Mortgage Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your home loan EMI, check affordability, and plan your property investment with our comprehensive mortgage calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Calculator Type Toggle */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCalculatorType("emi")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  calculatorType === "emi"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Calculate EMI
              </button>
              <button
                onClick={() => setCalculatorType("loanAmount")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  calculatorType === "loanAmount"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Check Affordability
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {calculatorType === "emi" ? (
                <>
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter loan amount"
                      />
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="50000000"
                      step="100000"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1L</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (Annual)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        step="0.1"
                        value={formData.interestRate}
                        onChange={(e) => handleInputChange("interestRate", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter interest rate"
                      />
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange("interestRate", e.target.value)}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Tenure (Years)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange("loanTenure", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter loan tenure"
                      />
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={formData.loanTenure}
                      onChange={(e) => handleInputChange("loanTenure", e.target.value)}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 years</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Monthly Income */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income (After Tax)
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={formData.monthlyIncome || ""}
                        onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter monthly income"
                      />
                    </div>
                  </div>

                  {/* Existing EMI */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing EMI (if any)
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={formData.existingEMI || ""}
                        onChange={(e) => handleInputChange("existingEMI", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter existing EMI"
                      />
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Interest Rate
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        step="0.1"
                        value={formData.interestRate}
                        onChange={(e) => handleInputChange("interestRate", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Loan Tenure
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange("loanTenure", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Results Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Calculation Results</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Monthly EMI</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.monthlyEMI)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Amount Payable</span>
                  <span className="text-xl font-semibold text-green-600">
                    {formatCurrency(results.totalAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Interest</span>
                  <span className="text-xl font-semibold text-orange-600">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>

                {calculatorType === "emi" && results.loanToValue > 0 && (
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Loan-to-Value Ratio</span>
                    <span className="text-xl font-semibold text-purple-600">
                      {formatPercentage(results.loanToValue)}
                    </span>
                  </div>
                )}

                {calculatorType === "loanAmount" && (
                  <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Maximum Loan Amount</span>
                    <span className="text-xl font-semibold text-indigo-600">
                      {formatCurrency(results.affordability.maxLoanAmount)}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={exportResults}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Breakdown</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                    <span className="text-gray-700">Principal Amount</span>
                  </div>
                  <span className="font-semibold">{formatPercentage(chartData.principal)}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${chartData.principal}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                    <span className="text-gray-700">Interest Amount</span>
                  </div>
                  <span className="font-semibold">{formatPercentage(chartData.interest)}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${chartData.interest}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>

              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  • EMI calculations are indicative and may vary based on actual interest rates and terms.
                </p>
                <p>
                  • Affordability calculation assumes 50% of monthly income can be used for housing expenses.
                </p>
                <p>
                  • Actual loan approval depends on credit score, income stability, and lender policies.
                </p>
                <p>
                  • Additional costs like processing fees, insurance, and registration are not included.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link
                  href="/properties"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Interest Rate Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Current Interest Rate Trends</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">8.5% - 9.5%</div>
              <div className="text-gray-700 font-medium">Floating Rate</div>
              <div className="text-sm text-gray-500">Linked to MCLR/Repo Rate</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">6.5% - 8.0%</div>
              <div className="text-gray-700 font-medium">Fixed Rate</div>
              <div className="text-sm text-gray-500">First 2-5 years</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">Up to 90%</div>
              <div className="text-gray-700 font-medium">Loan-to-Value</div>
              <div className="text-sm text-gray-500">Maximum financing</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              * Interest rates are subject to change based on RBI policies, credit score, loan amount, and lender discretion.
              Contact our financial advisors for personalized rates and pre-approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;