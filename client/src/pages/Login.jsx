import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://recipe-task-heckathon.vercel.app/api/auth/login", {
        email, password
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful 🚀");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input className="border p-2 rounded" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 rounded" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
