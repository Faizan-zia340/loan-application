import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const adminEmail = localStorage.getItem("adminemail");
    if (adminEmail === formData.email) {
      navigate("/admin");
    } else {
      alert("Your request has been delivered");
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-green-700 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
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
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-black rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
