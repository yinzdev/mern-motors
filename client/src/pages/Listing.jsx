import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import { IoLocationSharp } from 'react-icons/io5';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Carregando...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Alguma coisa deu errado!</p>
      )}
      {listing && !loading && !error && (
        <div className='text-center py-12'>
          <Swiper navigation pagination={{ clickable: true }}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='w-[280px] h-[280px] sm:w-[550px] sm:h-[550px] bg-center bg-cover mx-auto'
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex flex-col items-center max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-bold uppercase'>
              {listing.carBrand}{' '}
              <span className='text-emerald-700 uppercase'>
                {listing.carModel}
              </span>{' '}
              - R$ {listing.price.toLocaleString('pt-BR')}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <IoLocationSharp className='text-emerald-700 text-lg' />
              {'O veículo está localizado em '}
              {listing.location}
            </p>
            <ul className='font-semibold text-sm flex flex-wrap items-center gap-8 sm:gap-10'>
              <li className='flex flex-col gap-1 whitespace-nowrap '>
                <span className='text-zinc-700'>Ano: </span>
                {listing.carProductionYear}/{listing.carModelYear}
              </li>
              <li className='flex flex-col gap-1 whitespace-nowrap '>
                <span className='text-zinc-700'>Cor: </span>
                {listing.carColor}
              </li>
              <li className='flex flex-col gap-1 whitespace-nowrap '>
                <span className='text-zinc-700'>KM: </span>
                {listing.carMiles.toLocaleString('pt-BR')}
              </li>
            </ul>
            <p className=' text-slate-800 text-left text-lg'>
              <span className='font-semibold text-black'>Descrição: </span>
              {listing.description}
            </p>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='w-60 mt-4 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'
              >
                Falar com o vendedor
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
