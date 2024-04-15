import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        setError(data.message);
        return;
      }
      setError(null);
      setIsLoading(false);
      navigate("/")
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button className="uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 p-3">
          {isLoading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="my-5">
        <div className="flex gap-3">
          <p>Dont have an accouny?</p>
          <Link
            to={"/sign-up"}
            className="text-blue-400 hover:text-blue-600 hover:underline"
          >
            signUp
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
