import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "expense",
  });

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error loading categories"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      type: "expense",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, form);

        alert("Category updated successfully");
      } else {
        await createCategory(form);

        alert("Category added successfully");
      }

      resetForm();

      fetchCategories();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error saving category"
      );
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);

    setForm({
      name: category.name,
      type: category.type,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      fetchCategories();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error deleting category"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 md:pl-64">
      
      {/* Header */}
      <header className="flex h-20 items-center border-b bg-white px-4 md:px-8">
        <h2 className="text-2xl font-semibold">
          Categories
        </h2>
      </header>

      <main className="p-4 md:p-6">
        
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          
          {/* Form Section */}
          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
            
            <h3 className="mb-5 text-lg font-semibold">
              {editingId
                ? "Update Category"
                : "Add Category"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Category name"
                className="h-12 w-full rounded-xl border px-4"
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4"
              >
                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>
              </select>

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-cyan-600 font-semibold text-white transition hover:bg-cyan-700"
              >
                {editingId
                  ? "Update Category"
                  : "Add Category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="h-12 w-full rounded-xl border font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Categories List */}
          <div className="rounded-xl border bg-white p-5 shadow-sm md:p-6 xl:col-span-2">
            
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              
              <h3 className="text-lg font-semibold">
                Category List
              </h3>

              <p className="text-sm text-gray-500">
                Total: {categories.length}
              </p>
            </div>

            {categories.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-center text-gray-500">
                No categories found
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  
                  <table className="w-full border-collapse">
                    
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="p-3">
                          Name
                        </th>

                        <th className="p-3">
                          Type
                        </th>

                        <th className="p-3">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {categories.map((category) => (
                        <tr
                          key={category._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3 font-medium">
                            {category.name}
                          </td>

                          <td className="p-3 capitalize">
                            <span
                              className={
                                category.type === "income"
                                  ? "rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600"
                                  : "rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-500"
                              }
                            >
                              {category.type}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="flex gap-2">
                              
                              <button
                                onClick={() =>
                                  handleEdit(category)
                                }
                                className="rounded-lg bg-cyan-50 px-3 py-1 text-cyan-700 hover:bg-cyan-100"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(category._id)
                                }
                                className="rounded-lg bg-red-50 px-3 py-1 text-red-600 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 lg:hidden">
                  
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="rounded-xl border p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        
                        <div>
                          <h4 className="font-semibold break-words">
                            {category.name}
                          </h4>

                          <span
                            className={
                              category.type === "income"
                                ? "mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600"
                                : "mt-2 inline-block rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-500"
                            }
                          >
                            {category.type}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          
                          <button
                            onClick={() =>
                              handleEdit(category)
                            }
                            className="rounded-lg bg-cyan-50 px-3 py-1 text-sm text-cyan-700 hover:bg-cyan-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(category._id)
                            }
                            className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
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

export default Categories;