import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Não foi possível fazer o login com Google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='w-60 mx-auto bg-black rounded-lg text-white p-3 flex justify-center hover:opacity-80'
    >
      <span className='flex items-center'>
        <FcGoogle size={24} className='mr-2' />{' '}
        <span className='inline-block'>Entrar com Google</span>
      </span>
    </button>
  );
}
