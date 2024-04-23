import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    carBrand: '',
    carModel: '',
    carMiles: '',
    carColor: '',
    carModelYear: '',
    carProductionYear: '',
    location: '',
    price: '',
    description: '',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
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
          console.log(`Carregamento sendo feito: ${progress}%`);
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

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('Você precisa carregar pelo menos uma foto!');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Editar anúncio
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Marca'
              className='border p-3 rounded-lg w-full'
              id='carBrand'
              maxLength='10'
              required
              onChange={handleChange}
              value={formData.carBrand}
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Modelo do carro'
              className='border p-3 rounded-lg w-full'
              id='carModel'
              maxLength='80'
              required
              onChange={handleChange}
              value={formData.carModel}
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='number'
              placeholder='Quilometragem'
              className='border p-3 rounded-lg w-full'
              id='carMiles'
              min='0'
              required
              onChange={handleChange}
              value={formData.carMiles}
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Cor'
              className='border p-3 rounded-lg w-full'
              id='carColor'
              maxLength='20'
              required
              onChange={handleChange}
              value={formData.carColor}
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='number'
              placeholder='Ano do carro'
              className='border p-3 rounded-lg w-full'
              id='carModelYear'
              min='1885'
              required
              onChange={handleChange}
              value={formData.carModelYear}
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='number'
              placeholder='Ano de fabricação'
              className='border p-3 rounded-lg w-full'
              id='carProductionYear'
              min='1885'
              required
              onChange={handleChange}
              value={formData.carProductionYear}
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <input
              type='text'
              placeholder='Cidade'
              className='border p-3 rounded-lg w-full'
              id='location'
              maxLength='30'
              minLength='4'
              required
              onChange={handleChange}
              value={formData.location}
            />
          </div>
          <div className='w-full sm:w-1/2'>
            <input
              type='number'
              placeholder='Preço'
              className='border p-3 rounded-lg w-full'
              id='price'
              min='500'
              max='5000000'
              required
              onChange={handleChange}
              value={formData.price}
            />
          </div>
        </div>
        <div className='mb-4'>
          <textarea
            type='text'
            placeholder='Descreva o seu carro...'
            className='border p-3 rounded-lg w-full resize-none'
            id='description'
            maxLength='500'
            style={{ height: '6rem' }}
            required
            onChange={handleChange}
            value={formData.description}
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
              accept='image/*'
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
        <p className='text-red-700 text-center text-sm'>
          {imageUploadError && imageUploadError}
        </p>
        <button
          disabled={loading || uploading}
          className='w-80 mt-4 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'
        >
          {loading ? 'Carregando...' : 'Confirmar'}
        </button>
        {error && <p className='text-red-700 text-center text-sm'>{error}</p>}
      </form>
    </main>
  );
}
