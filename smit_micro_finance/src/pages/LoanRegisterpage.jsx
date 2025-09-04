import { useState } from "react";
import Layout from "../components/Layout";

const LoanRegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    loanCategory: "",
    loanAmount: "",
    loanTerm: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loan Registration Data Submitted:", formData);
    alert("Loan registration submitted successfully!");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-400 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Loan Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              placeholder="CNIC"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <select
              name="loanCategory"
              value={formData.loanCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Loan Category</option>
              <option value="Wedding Loans">Wedding Loans</option>
              <option value="Home Construction Loans">Home Construction Loans</option>
              <option value="Business Startup Loans">Business Startup Loans</option>
              <option value="Education Loans">Education Loans</option>
            </select>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              placeholder="Loan Amount (PKR)"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <input
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleInputChange}
              placeholder="Loan Term (Years)"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoanRegisterPage;
