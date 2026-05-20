import axios from "axios";

export async function register(username, email, password) {
  try {
    // Register ke liye form ka data backend ko bhejte hain; backend user create karke auth cookie set karta hai.
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(res.data);
  } catch (error) {
    // Backend validation error bheje to wahi message log hota hai, warna normal error message.
    console.log(error.response?.data?.message || error.message);
  }
}

export async function login(usernameOrEmail, password) {
  const isEmail = usernameOrEmail.includes("@");

  try {
    // User email ya username dono se login kar sakta hai; backend ko sirf matching field bhejte hain.
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        username: isEmail ? "" : usernameOrEmail,
        email: isEmail ? usernameOrEmail : "",
        password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(res.data);
  } catch (error) {
    // Password galat ho ya user na mile, backend ka clear message console me aayega.
    console.log(error.response?.data?.message || error.message);
  }
}
