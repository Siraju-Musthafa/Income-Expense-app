import { useEffect, useState } from "react";
import { getReport } from "../services/report.service";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

function Reports() {
  const [filters, setFilters] = useState({
    reportType: "daily",
    type: "all",
    category: "all",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    report: [],
    transactions: [],
    categories: [],
  });

  const fetchReport = async () => {
    try {
      const result = await getReport(filters);

      setData(result);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error loading report"
      );
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilter = () => {
    fetchReport();
  };

  const chartData = [];

  data.report.forEach((item) => {
    const period = item._id.period;

    const existing = chartData.find(
      (x) => x.period === period
    );

    if (existing) {
      existing[item._id.type] = item.totalAmount;
    } else {
      chartData.push({
        period,
        income:
          item._id.type === "income"
            ? item.totalAmount
            : 0,
        expense:
          item._id.type === "expense"
            ? item.totalAmount
            : 0,
      });
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 md:pl-64">
      
      {/* Header */}
      <header className="flex h-20 items-center border-b bg-white px-4 md:px-8">
        <h2 className="text-2xl font-semibold">
          Reports
        </h2>
      </header>

      <main className="space-y-6 p-4 md:p-6">
        
        {/* Filters */}
        <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
          
          <h3 className="mb-5 text-lg font-semibold">
            Report Filters
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleChange}
              className="h-12 rounded-xl border px-4"
            >
              <option value="daily">
                Daily Report
              </option>

              <option value="monthly">
                Monthly Report
              </option>

              <option value="yearly">
                Yearly Report
              </option>
            </select>

            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="h-12 rounded-xl border px-4"
            >
              <option value="all">
                All Types
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="h-12 rounded-xl border px-4"
            >
              <option value="all">
                All Categories
              </option>

              {data.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              name="fromDate"
              type="date"
              value={filters.fromDate}
              onChange={handleChange}
              className="h-12 rounded-xl border px-4"
            />

            <input
              name="toDate"
              type="date"
              value={filters.toDate}
              onChange={handleChange}
              className="h-12 rounded-xl border px-4"
            />
          </div>

          <button
            onClick={applyFilter}
            className="mt-5 h-12 rounded-xl bg-cyan-600 px-6 font-semibold text-white transition hover:bg-cyan-700"
          >
            Apply Filter
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          
          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
            <p className="text-gray-500">
              Total Income
            </p>

            <h2 className="mt-2 break-words text-2xl font-bold text-green-600 md:text-3xl">
              ₹{data.totalIncome}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
            <p className="text-gray-500">
              Total Expense
            </p>

            <h2 className="mt-2 break-words text-2xl font-bold text-red-500 md:text-3xl">
              ₹{data.totalExpense}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6 sm:col-span-2 xl:col-span-1">
            <p className="text-gray-500">
              Balance
            </p>

            <h2 className="mt-2 break-words text-2xl font-bold text-cyan-600 md:text-3xl">
              ₹{data.balance}
            </h2>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          
          {/* Bar Chart */}
          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
            
            <h3 className="mb-5 text-lg font-semibold">
              Income vs Expense
            </h3>

            <div className="h-72 sm:h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="income"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />

                  <Bar
                    dataKey="expense"
                    fill="#ef4444"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
            
            <h3 className="mb-5 text-lg font-semibold">
              Monthly Trend
            </h3>

            <div className="h-72 sm:h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart data={chartData}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#16a34a"
                  />

                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Report Table */}
        <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
          
          <h3 className="mb-5 text-lg font-semibold capitalize">
            {filters.reportType} Report
          </h3>

          {data.report.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-center text-gray-500">
              No report found
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full border-collapse">
                  
                  <thead>
                    <tr className="border-b bg-gray-50 text-left">
                      <th className="p-3">
                        Period
                      </th>

                      <th className="p-3">
                        Type
                      </th>

                      <th className="p-3">
                        Total Amount
                      </th>

                      <th className="p-3">
                        Count
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.report.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          {item._id.period}
                        </td>

                        <td className="p-3 capitalize">
                          {item._id.type}
                        </td>

                        <td
                          className={
                            item._id.type === "income"
                              ? "p-3 font-semibold text-green-600"
                              : "p-3 font-semibold text-red-500"
                          }
                        >
                          ₹{item.totalAmount}
                        </td>

                        <td className="p-3">
                          {item.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {data.report.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      
                      <div>
                        <h4 className="font-semibold">
                          {item._id.period}
                        </h4>

                        <p className="mt-1 capitalize text-gray-500">
                          {item._id.type}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Transactions: {item.count}
                        </p>
                      </div>

                      <div>
                        <p
                          className={
                            item._id.type === "income"
                              ? "font-bold text-green-600"
                              : "font-bold text-red-500"
                          }
                        >
                          ₹{item.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Reports;