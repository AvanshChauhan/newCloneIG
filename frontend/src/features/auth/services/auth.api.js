import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const res = await api.post("/register", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
}

export async function login(usernameOrEmail, password) {
  try {
    const res = await api.post("/login", {
      username: usernameOrEmail,
      email: usernameOrEmail,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
}

export async function getMe() {
  try {
    const res = await api.get("/get-me");

    return res.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
}