import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://recipe-task-heckathon-1.onrender.com/api/auth/signup", {
        name, email, password
      });
      alert("Signup Successful 🎉 Now login");
      window.location.href = "/";
    } catch (err) {
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input className="border p-2 rounded" type="text" placeholder="Name"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 rounded" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 rounded" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
