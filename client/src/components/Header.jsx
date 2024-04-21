import { FaSearch, FaBars, FaTimes, FaCar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='bg-slate-200 shadow-sm p-1'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl sm:text-2xl flex flex-wrap p-1 gap-1'>
            <span className='p-1'>
              <FaCar className='text-black' />
            </span>
            <span className='hidden sm:inline text-emerald-700'>MERN</span>
            <span className='hidden md:inline text-black'>MOTORS</span>
          </h1>
        </Link>
        <div className='absolute top-1.2 left-1/2 transform -translate-x-1/2 p-1 '>
          {' '}
          <form
            onSubmit={handleSubmit}
            className='bg-slate-100 p-3 rounded-full flex items-center '
            style={{ minWidth: '200px', maxWidth: '400px' }}
          >
            <input
              type='text'
              placeholder='Buscar carro...'
              className='bg-transparent focus:outline-none w-40 sm:w-56'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-gray-700' />
            </button>
          </form>
        </div>
        <div className='hidden md:flex items-center space-x-4 ml-auto'>
          <Link to='/search'>
            <span className='hover:text-emerald-700 font-semibold'>
              Comprar
            </span>
          </Link>
          <Link to='/create-listing'>
            <span className='hover:text-emerald-700 font-semibold'>Vender</span>
          </Link>
        </div>
        <div className='flex items-center space-x-3'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden focus:outline-none'
          >
            {isMenuOpen ? (
              <FaTimes className='h-6' />
            ) : (
              <FaBars className='h-6' />
            )}
          </button>
          {currentUser ? (
            <Link to='/profile' className='ml-auto'>
              <img
                className='rounded-full h-7 w-7 object-cover mx-auto'
                src={currentUser.avatar}
                alt='profile'
              />
            </Link>
          ) : (
            <Link to='/sign-up' className='ml-auto'>
              <span className='text-emerald-700 font-bold'>Entrar</span>
            </Link>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden p-3 absolute top-16 right-4 bg-white shadow-md rounded-md'>
          <ul className='flex flex-col gap-4'>
            <Link to='/search' onClick={closeMenu}>
              <li className='hover:text-emerald-700 font-semibold'>
                Comprar veículo
              </li>
            </Link>
            <Link to='/create-listing' onClick={closeMenu}>
              <li className='hover:text-emerald-700 font-semibold'>
                Vender veículo
              </li>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
