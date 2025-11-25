import API from "../lib/api";

export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.data.token);
  return res.data.data.user;
};

export const register = async (name, email, password) => {
  return await API.post("/auth/register", { name, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};
