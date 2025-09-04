"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [monthlyPayment, setMonthlyPayment] = useState(null)

  const handleCategoryClick = (category) => {
    setSelectedCategory({ ...category, selectedSubs: [] })
    setMonthlyPayment(null)
  }

  const calculatePayment = (e) => {
    e.preventDefault()
    const amount = Number.parseFloat(selectedCategory.limit.replace(/[^0-9]/g, "")) * 100000
    const termInMonths = Number(selectedCategory.timeperiod) * 12

    if (amount && termInMonths) {
      const monthly = amount / termInMonths
      setMonthlyPayment(monthly.toFixed(2))
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-white-500 to-green-500 text-white py-6 shadow-md">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl sm:text-4xl font-bold text-black hover:text-white-200">
            Saylani Microfinance
          </Link>
          <nav className="flex flex-wrap gap-2 sm:gap-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-16 sm:py-20 lg:py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-800 mb-6">
          Empower Your Future with Interest-Free Loans
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8">
          Explore our loan options tailored for weddings, home construction, businesses, and education.
        </p>
        <Link
          to="/LoanApplication"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200"
        >
          Loan Request
        </Link>
      </section>

      {/* Loan Categories */}
      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">Our Loan Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <h4 className="text-lg sm:text-xl font-bold text-blue-600 mb-3">{category.title}</h4>
                <ul className="text-sm text-gray-700 mb-3">
                  <li>
                    <strong>Maximum Loan:</strong> {category.limit}
                  </li>
                  <li>
                    <strong>Loan Period:</strong> {category.timeperiod} Years
                  </li>
                </ul>
                {category.subcategories && (
                  <div>
                    <strong className="text-gray-800">Subcategories:</strong>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                      {category.subcategories.split(",").map((subcategory, index) => (
                        <li key={index}>{subcategory.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 font-bold" 
              onClick={() => setSelectedCategory(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedCategory.title} Form</h3>
            <form onSubmit={calculatePayment} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block font-semibold">Category</label>
                <input type="text" value={selectedCategory.title} readOnly className="w-full border rounded p-2 bg-gray-100" />
              </div>

              {/* Subcategories */}
              {selectedCategory.subcategories && (
                <div>
                  <label className="block font-semibold mb-1">Select Subcategories</label>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
                    {selectedCategory.subcategories.split(",").map((sub, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          value={sub.trim()} 
                          className="form-checkbox"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedCategory((prev) => {
                              let selectedSubs = prev.selectedSubs || [];
                              if (checked) selectedSubs.push(sub.trim());
                              else selectedSubs = selectedSubs.filter(s => s !== sub.trim());
                              return { ...prev, selectedSubs };
                            });
                          }}
                        />
                        {sub.trim()}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Loan Amount */}
              {selectedCategory.limit > 0 && (
                <div>
                  <label className="block font-semibold">Loan Amount</label>
                  <input type="number" value={selectedCategory.limit} readOnly className="w-full border rounded p-2 bg-gray-100" />
                </div>
              )}

              {/* Loan Term */}
              <div>
                <label className="block font-semibold">Loan Term (Years)</label>
                <input type="number" value={selectedCategory.timeperiod} readOnly className="w-full border rounded p-2 bg-gray-100" />
              </div>

              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Calculate</button>
            </form>

            {monthlyPayment && (
              <div className="mt-4 p-4 bg-green-100 rounded-lg text-green-800 font-semibold">
                Estimated Monthly Payment: PKR {monthlyPayment}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="w-full max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm">&copy; {new Date().getFullYear()} Saylani Microfinance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Navigation links
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register" },
  { to: "/login", label: "Login" },
]

// Loan categories
const categories = [
  {
    title: "Wedding Loans",
    subcategories: "Valima,Furniture,Valima Food,Jahez",
    limit: "PKR 5 Lakh",
    timeperiod: "3",
  },
  {
    title: "Home Construction Loans",
    limit: "PKR 10 Lakh",
    timeperiod: "5",
  },
  {
    title: "Business Startup Loans",
    subcategories: "Buy Stall,Advance Rent for Shop,Shop Assets,Shop Machinery",
    limit: "PKR 10 Lakh",
    timeperiod: "5",
  },
  {
    title: "Education Loans",
    subcategories: "University Fees,Child Fees Loan",
    limit: "Based on requirement",
    timeperiod: "4",
  },
]

export default LandingPage
