import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Faça seu login
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='E-mail'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Senha'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className='w-60 mx-auto bg-emerald-700 rounded-lg text-white p-3 hover:opacity-90 disabled:opacity-80'
        >
          {loading ? 'Carregando...' : 'Entrar com e-mail'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-4 justify-center text-lg'>
        <p>Ainda não tem uma conta?</p>
        <Link to={'/sign-up'}>
          <span className='text-emerald-700 font-semibold hover:opacity-90'>
            Cadastre-se
          </span>
        </Link>
      </div>
      {error && (
        <p className='text-red-500 mt-5 text-center font-semibold'>{error}</p>
      )}
    </div>
  );
}
