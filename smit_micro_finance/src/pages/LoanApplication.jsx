import { useState } from "react";
import Layout from "../components/Layout";

export default function LoanApplication() {
  const [data, setData] = useState({
    address: "",
    phone: "",
    guarantors: [
      { name: "", email: "", location: "", cnic: "" },
      { name: "", email: "", location: "", cnic: "" },
    ],
    statement: null,
    salarySheet: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [slip, setSlip] = useState(null);

  const onInput = (e, field, idx = null) => {
    if (idx !== null) {
      const g = [...data.guarantors];
      g[idx][field] = e.target.value;
      setData((s) => ({ ...s, guarantors: g }));
    } else {
      setData((s) => ({ ...s, [field]: e.target.value }));
    }
  };
  const onFile = (e, field) => setData((s) => ({ ...s, [field]: e.target.files[0] }));

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const validCNIC = (v) => /^(\d{13}|\d{5}-\d{7}-\d{1})$/.test(v);
  const validPhone = (v) => /^0\d{10,11}$/.test(v); // simple local format

  const onSubmit = (e) => {
    e.preventDefault();
    // basic checks
    if (!data.address) return alert("Address required");
    if (!validPhone(data.phone)) return alert("Enter valid phone (e.g. 03XXXXXXXXX)");
    for (const g of data.guarantors) {
      if (!g.name || !validEmail(g.email) || !g.location || !validCNIC(g.cnic)) {
        return alert("Please enter valid guarantors info");
      }
    }
    const token = `TOKEN-${Math.floor(1000 + Math.random() * 9000)}`;
    const appointment = { date: new Date().toLocaleDateString(), time: "10:00 AM", location: "Microfinance Office" };
    setSlip({ token, appointment });
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Application</h1>

        {!submitted ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Address</label>
              <input value={data.address} onChange={(e) => onInput(e, "address")} className="w-full border rounded-lg p-2" placeholder="Enter your address" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <input value={data.phone} onChange={(e) => onInput(e, "phone")} className="w-full border rounded-lg p-2" placeholder="03XXXXXXXXX" required />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">Guarantors</h2>
            {data.guarantors.map((g, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={g.name} onChange={(e) => onInput(e, "name", i)} className="border rounded-lg p-2" placeholder="Name" required />
                <input value={g.email} onChange={(e) => onInput(e, "email", i)} className="border rounded-lg p-2" placeholder="Email" required />
                <input value={g.location} onChange={(e) => onInput(e, "location", i)} className="border rounded-lg p-2" placeholder="Location" required />
                <input value={g.cnic} onChange={(e) => onInput(e, "cnic", i)} className="border rounded-lg p-2" placeholder="CNIC" required />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold mb-2">Statement (Optional)</label>
              <input type="file" onChange={(e) => onFile(e, "statement")} accept=".pdf,.doc,.docx" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Salary Sheet (Optional)</label>
              <input type="file" onChange={(e) => onFile(e, "salarySheet")} accept=".pdf,.doc,.docx" />
            </div>

            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
              Submit Application
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Application Submitted</h2>
            <p className="mb-4">Here are your application details:</p>
            <div className="p-4 bg-gray-100 rounded-lg shadow inline-block text-left">
              <p><strong>Token Number:</strong> {slip.token}</p>
              <p><strong>Appointment Date:</strong> {slip.appointment.date}</p>
              <p><strong>Appointment Time:</strong> {slip.appointment.time}</p>
              <p><strong>Office Location:</strong> {slip.appointment.location}</p>
              {/* QR will be generated on backend later */}
              <div className="mt-3 w-32 h-32 grid place-items-center bg-white border rounded">
                <span className="text-xs text-gray-500">QR on backend</span>
              </div>
              <button
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => window.print()}
              >
                Print / Download
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
