import { useState } from 'react';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('A foto pode ter no máximo 2 MB.');
          setUploading(false);
        });
    } else {
      setImageUploadError('O limite máximo é de 4 fotos.');
      setUploading(false);
    }
  };
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Anuncie o seu carro
      </h1>
      <form className='flex flex-col'>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Marca'
              className='border p-3 rounded-lg w-full'
              id='carBrand'
              maxLength='10'
              required
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Carro'
              className='border p-3 rounded-lg w-full'
              id='carName'
              maxLength='30'
              required
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Modelo'
              className='border p-3 rounded-lg w-full'
              id='carModel'
              maxLength='80'
              required
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Quilometragem'
              className='border p-3 rounded-lg w-full'
              id='carMiles'
              maxLength='80'
              required
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Ano de fabricação'
              className='border p-3 rounded-lg w-full'
              id='carProductionYear'
              maxLength='4'
              minLength='4'
              required
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Ano do carro'
              className='border p-3 rounded-lg w-full'
              id='carModelYear'
              maxLength='4'
              minLength='4'
              required
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Cor'
              className='border p-3 rounded-lg w-full'
              id='carColor'
              maxLength='20'
              minLength='4'
              required
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Cidade'
              className='border p-3 rounded-lg w-full'
              id='location'
              maxLength='80'
              required
            />
          </div>
        </div>
        <div className='mb-4'>
          <textarea
            placeholder='Descreva o seu carro...'
            className='border p-3 rounded-lg w-full resize-none'
            id='description'
            maxLength='500'
            style={{ height: '6rem' }}
            required
          />
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Fotos:
            <span className='font-normal text-gray-600 ml-2'>
              A primeira foto servirá de capa. (max. 4){' '}
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full  text-gray-700 focus:outline-none focus:border-emerald-500'
              type='file'
              id='images'
              accept='images/*'
              multiple
            />

            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-emerald-700 border border-emerald-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Carregando...' : 'Carregar'}
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 md:flex md:flex-wrap md:justify-center'>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={index} className='p-5 border items-center'>
                <div className='flex flex-col items-center'>
                  <img
                    src={url}
                    alt='Imagem do anúncio'
                    className='w-40 h-40 md:w-30 md:h-30 rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => handleDeleteImage(index)}
                    className='mt-2 font-semibold hover:opacity-70'
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
        </div>
        <p className='text-red-700 text-center text-sm font-semibold'>
          {imageUploadError && imageUploadError}
        </p>
        <button
          type='button'
          onClick={() => handleDeleteImage(index)}
          className='w-80 mt-4 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'
        >
          Criar Anúncio
        </button>
      </form>
    </main>
  );
}
