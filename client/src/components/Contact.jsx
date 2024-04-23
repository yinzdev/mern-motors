import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [carOwner, setcarOwner] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchcarOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setcarOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcarOwner();
  }, [listing.userRef]);
  return (
    <>
      {carOwner && (
        <div className='w-full flex flex-col gap-2 '>
          <div className='p-3 border bg-black text-white border-gray-900 rounded-lg'>
            <p>
              Fale com <span className='font-bold'>{carOwner.username}</span>{' '}
              sobre o{' '}
              <span className='font-bold'>
                {listing.carBrand.toUpperCase()}{' '}
                {listing.carModel.toUpperCase()}
              </span>
            </p>
          </div>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Digite a sua mensagem...'
            className='w-full border p-3 rounded-lg resize-none'
            style={{ height: '8rem' }}
          ></textarea>

          <Link
            to={`mailto:${carOwner.email}?subject=Estou interessado no ${listing.name}&body=${message}`}
            className='w-60 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'
          >
            Enviar mensagem
          </Link>
        </div>
      )}
    </>
  );
}
