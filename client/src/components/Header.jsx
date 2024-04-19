import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-500 text-slate-300">
      <div className=" flex items-center justify-between mx-4 p-3">
        <Link to={"/"}>
          <h1 className="text-xl md:text-3xl font-bold">
            <span>Logo</span>
          </h1>
        </Link>
        <form className="bg-slate-200 flex items-center justify-center rounded-lg p-3">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 md:w-64"
          />
          <FaSearch className="text-slate-600 hover:cursor-pointer" />
        </form>
        <ul className="sm:flex items-center gap-4 hidden text-xl ">
          <Link to={"/"}>
            <li className="hover:text-slate-50 hover:font-semibold">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hover:text-slate-50 hover:font-semibold">About</li>
          </Link>
        </ul>
        <Link to={"/profile"}>
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt="profile"
              className="rounded-full h-10 w-10 object-cover"
            />
          ) : (
            <li className="hover:text-slate-50 hover:font-semibold">Signin</li>
          )}
        </Link>
      </div>
    </header>
  );
}
