import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const AdminDashboard = () => {
  const cards = [
    {
      title: "User Management",
      description: "Manage users, approve/reject loan applications.",
      link: "/admin/users",
      buttonText: "Manage Users",
    },
    {
      title: "Loan Applications",
      description: "Review and process loan applications submitted by users.",
      link: "/admin/loans",
      buttonText: "View Applications",
    },
    {
      title: "Reports",
      description: "Generate and view reports on loan performance and user activity.",
      link: "/admin/reports",
      buttonText: "Generate Reports",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-4">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4">{card.description}</p>
                <Link
                  to={card.link}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
