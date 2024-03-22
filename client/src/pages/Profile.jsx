import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  // firebase storage
  // allow read
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
        );
      },
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Meu perfil</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Houve um erro! (A imagem deve ter até 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Fazendo o upload ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>
              Upload de imagem feito com sucesso!
            </span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='Nome'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='E-mail'
          id='email'
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='Senha'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className='w-60 mx-auto bg-emerald-700 rounded-lg text-white p-3 hover:opacity-90 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-black cursor-pointer font-semibold'>
          Deletar minha conta
        </span>
        <span className='text-black cursor-pointer font-semibold'>
          Deslogar
        </span>
      </div>
    </div>
  );
}
