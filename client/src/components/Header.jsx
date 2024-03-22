import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-black'>Shopping</span>
            <span className='text-emerald-700'>Carros</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-full flex items-center'>
          <input
            type='text'
            placeholder='Procurar...'
            className='bg-transparent focus:outline-none w-24 h-4 sm:w-64'
          />{' '}
          <FaSearch className='text-slate-500' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline hover:text-emerald-700'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline hover:text-emerald-700'>Sobre</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' hover:text-emerald-700'>Entrar</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
