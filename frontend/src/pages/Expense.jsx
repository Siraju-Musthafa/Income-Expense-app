import { useEffect, useState } from "react";
import {
  getExpense,
  createExpense,
  deleteExpense,
} from "../services/transaction.service";

import { getCategories } from "../services/category.service";

function Expense() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    type: "expense",
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });
  const [message, setMessage] = useState({
  type: "",
  text: "",
});

  const fetchTransactions = async () => {
    try {
      const data = await getExpense();

      setTransactions(data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error loading Expense"
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      const expenseCategories = data.filter(
        (item) => item.type === "expense"
      );

      setCategories(expenseCategories);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error loading categories"
      );
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createExpense({
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        type: "expense",
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
      });

      fetchTransactions();

      setMessage({
        type: "success",
        text: "Transaction added successfully",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Error adding transaction",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      fetchTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error deleting transaction"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 md:pl-64">
      
      {/* Header */}
      <header className="flex h-20 items-center border-b bg-white px-4 md:px-8">
        <h2 className="text-2xl font-semibold">
          Expense
        </h2>
      </header>

      <main className="p-4 md:p-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          
          {/* Form Section */}
          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
            
            <h3 className="mb-5 text-lg font-semibold">
              Add New Expense
            </h3>
             
            {message.text && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${message.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                  }`}
              >
                {message.text}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4"
              >
                <option value="expense">
                  Expense
                </option>
              </select>

              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4"
              />

              <input
                name="amount"
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4"
              />

              <textarea
                name="note"
                placeholder="Note"
                value={form.note}
                onChange={handleChange}
                className="min-h-[120px] w-full rounded-xl border px-4 py-3"
              />

              <button className="h-12 w-full rounded-xl bg-cyan-600 font-semibold text-white transition hover:bg-cyan-700">
                Add Expense
              </button>
            </form>
          </div>

          {/* Transactions */}
          <div className="xl:col-span-2 rounded-xl border bg-white p-5 shadow-sm md:p-6">
            
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold">
                Transaction List
              </h3>

              <p className="text-sm text-gray-500">
                Total: {transactions.length}
              </p>
            </div>

            {transactions.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-center text-gray-500">
                No transactions found
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="p-3">Title</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3 font-medium">
                            {item.title}
                          </td>

                          <td className="p-3 capitalize">
                            {item.type}
                          </td>

                          <td className="p-3 font-semibold text-red-500">
                            ₹{item.amount}
                          </td>

                          <td className="p-3">
                            {item.category}
                          </td>

                          <td className="p-3">
                            {new Date(
                              item.date
                            ).toLocaleDateString()}
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() =>
                                handleDelete(item._id)
                              }
                              className="rounded-lg bg-red-50 px-3 py-1 text-red-600 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 lg:hidden">
                  {transactions.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl border p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        
                        <div>
                          <h4 className="font-semibold break-words">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.category}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {new Date(
                              item.date
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-red-500">
                            ₹{item.amount}
                          </p>

                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            className="mt-3 rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Expense;