import api from "./api";

export const getReport = async (filters) => {
  const res = await api.get("/reports", {
    params: filters,
  });

  return res.data;
};