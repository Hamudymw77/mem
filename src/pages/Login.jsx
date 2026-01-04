import { useState } from "react";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 3) return setError("Jméno musí mít alespoň 3 znaky");
    if (password.length < 5) return setError("Heslo musí mít alespoň 5 znaků");
    login(username);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Přihlášení</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4"><label className="block text-sm font-medium mb-1">Username</label><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border p-2 rounded focus:ring-2 ring-yellow-400 outline-none" /></div>
        <div className="mb-6"><label className="block text-sm font-medium mb-1">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded focus:ring-2 ring-yellow-400 outline-none" /></div>
        <button type="submit" className="w-full bg-slate-800 text-white p-2 rounded hover:bg-slate-700 transition">Vstoupit</button>
      </form>
    </div>
  );
};
export default Login;