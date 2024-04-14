import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-3">
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="username"
        ></input>
        <input
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
        ></input>
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
        ></input>
        <button className="uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 p-3">signup</button>
      </form>
      <div className="my-5">
        <div className="flex gap-3">
          <p>already have an accouny?</p>
          <Link to={"/sign-in"} className="text-blue-400 hover:text-blue-600 hover:underline">signIn</Link>
        </div>
      </div>
    </div>
  );
}
