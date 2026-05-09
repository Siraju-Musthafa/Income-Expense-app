import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDashboardSummary } from "../services/dashboard.service";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [summary, setSummary] = useState({
    user: {
      id: "",
      name: "",
      email: "",
    },
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    recentTransactions: [],
  });
  const navigate = useNavigate();
  const fetchSummary = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      alert(error.response?.data?.message || "Error loading dashboard");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const chartData = [
    {
      name: "Current",
      Income: summary.totalIncome,
      Expense: summary.totalExpense,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 md:pl-64">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b bg-white px-4 py-4 md:h-20 md:flex-row md:items-center md:justify-between md:px-8">
        <h2 className="text-2xl font-semibold">Dashboard</h2>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-200 font-bold text-cyan-700">
            S
          </div>

          <span className="font-medium break-all">
            {summary.user.name}
          </span>
        </div>
      </header>

      <main className="p-4 md:p-6">
        {/* Welcome Card */}
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-xl font-semibold text-cyan-700 md:text-2xl">
              Hey {summary.user.name}, what do you want to do?
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate("/income")} className="w-full rounded-full border border-cyan-600 px-5 py-3 text-cyan-700 hover:bg-cyan-50 sm:w-auto">
                + Income
              </button>

              <button onClick={() => navigate("/expense")}  className="w-full rounded-full border border-red-500 px-5 py-3 text-red-500 hover:bg-red-50 sm:w-auto">
                + Expense
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Income</p>

            <h2 className="mt-2 text-2xl font-bold text-green-600 md:text-3xl">
              ₹{summary.totalIncome}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Expense</p>

            <h2 className="mt-2 text-2xl font-bold text-red-500 md:text-3xl">
              ₹{summary.totalExpense}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Balance</p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-600 md:text-3xl">
              ₹{summary.balance}
            </h2>
          </div>
        </div>

        {/* Charts + Transactions */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Chart */}
          <div className="rounded-xl border bg-white p-4 shadow-sm md:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold">
                Income vs Expense
              </h3>

              <select className="rounded-lg border px-3 py-2 text-sm">
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="Income"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />

                  <Bar
                    dataKey="Expense"
                    fill="#ef4444"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-xl border bg-white p-4 shadow-sm md:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold">
                Recent Transactions
              </h3>

              <button className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                View All
              </button>
            </div>

            {summary.recentTransactions.length === 0 ? (
              <div className="flex h-72 items-center justify-center text-center text-gray-500">
                No transactions found
              </div>
            ) : (
              <div className="space-y-4">
                {summary.recentTransactions.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h4 className="font-semibold break-words">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {item.category}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p
                        className={
                          item.type === "income"
                            ? "font-semibold text-green-600"
                            : "font-semibold text-red-500"
                        }
                      >
                        {item.type === "income" ? "+" : "-"} ₹
                        {item.amount}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;