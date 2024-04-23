import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const fetchListings = async () => {
      setLoading(true);
      setPagination(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get`);
      const data = await res.json();
      if (data.length > 11) {
        setPagination(true);
      } else {
        setPagination(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const onPaginationClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 12) {
      setPagination(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col p-7 mx-auto gap-4 text-center mt-12'>
      <h1 className='font-bold text-2xl sm:text-3xl lg:text-5xl'>
        Encontre o veículo <span className='text-emerald-700'>perfeito</span>{' '}
        para você
      </h1>
      <div className='text-gray-600 font-semibold text-md sm:text-lg lg:text-xl'>
        <p>Carros seminovos incríveis com qualidade certificada!</p>
      </div>
      <Link
        className='w-60 mx-auto bg-emerald-700 rounded-lg text-white p-3 hover:opacity-90 disabled:opacity-80'
        to={'/search'}
      >
        Encontre o seu carro!
      </Link>
      <div>
        <h2 className='font-bold text-2xl lg:text-3xl mt-12'>
          Escolha o seu próximo carro
        </h2>
      </div>
      <div>
        <div className='p-3 flex flex-wrap gap-4 max-w-6xl mx-auto justify-center md:justify-center'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-red-700 text-center'>
              Nenhum anúncio foi encontrado!
            </p>
          )}
          {loading && (
            <p className='text-xl text-zinc-700 text-center font-bold w-full'>
              Carregando...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}

          {pagination && (
            <button
              onClick={onPaginationClick}
              className='text-emerald-700 font-bold hover:underline p-7 text-center text-xl w-full'
            >
              Mostrar mais anúncios
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
