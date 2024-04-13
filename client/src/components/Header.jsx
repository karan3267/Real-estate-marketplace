import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-slate-500">
      <div className=" flex items-center justify-between mx-4 p-3">
        <Link to={'/'}>
        <h1 className="text-xl md:text-3xl font-bold">
          <span>Logo</span>
        </h1>
        </Link>
        <form className="bg-slate-200 flex items-center justify-center rounded-lg p-3">
          <input type="text" placeholder="search..." className="bg-transparent focus:outline-none w-24 md:w-64" />
          <FaSearch className='text-slate-600 hover:cursor-pointer'/>
        </form>
        <ul className='sm:flex items-center gap-4 hidden text-xl '>
            <Link to={'/'}>
            <li className='hover:text-slate-200'>Home</li>
            </Link>
            <Link to={'/about'}>
            <li className='hover:text-slate-200'>About</li>
            </Link>
            <Link to={'/sign-in'}>
            <li className='hover:text-slate-200'>Signin</li>
            </Link>
        </ul>
      </div>
    </header>
  );
}
