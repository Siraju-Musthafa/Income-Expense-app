import api from "./api";

/* =========================
   ALL TRANSACTIONS
========================= */

export const getTransactions = async () => {
  const res = await api.get("/transactions");
  return res.data;
};

export const addTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const updateTransaction = async (id, data) => {
  const res = await api.put(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id) => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};

/* =========================
   INCOME
========================= */

export const getIncome = async () => {
  const res = await api.get("/income");
  return res.data;
};

export const createIncome = async (data) => {
  const res = await api.post("/income", data);
  return res.data;
};

export const updateIncome = async (id, data) => {
  const res = await api.put(`/income/${id}`, data);
  return res.data;
};

export const deleteIncome = async (id) => {
  const res = await api.delete(`/income/${id}`);
  return res.data;
};

/* =========================
   EXPENSE
========================= */

export const getExpense = async () => {
  const res = await api.get("/expense");
  return res.data;
};

export const createExpense = async (data) => {
  const res = await api.post("/expense", data);
  return res.data;
};

export const updateExpense = async (id, data) => {
  const res = await api.put(`/expense/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await api.delete(`/expense/${id}`);
  return res.data;
};