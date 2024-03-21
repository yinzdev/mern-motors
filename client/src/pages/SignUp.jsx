import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Crie sua conta ou inicie sessão
      </h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Nome'
          className='border p-3 rounded-lg'
          id='username'
        />
        <input
          type='text'
          placeholder='E-mail'
          className='border p-3 rounded-lg'
          id='email'
        />
        <input
          type='text'
          placeholder='Senha'
          className='border p-3 rounded-lg'
          id='password'
        />
        <button className='w-60 mx-auto bg-emerald-700 rounded-lg text-white p-3 hover:opacity-90 disabled:opacity-80'>
          Criar minha conta
        </button>
      </form>
      <div className='flex gap-2 mt-4 justify-center'>
        <p>Já tem uma conta?</p>
        <Link to={'/sign-in'}>
          <span className='text-emerald-700 font-semibold hover:opacity-90'>
            Entrar
          </span>
        </Link>
      </div>
    </div>
  );
}
