import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';

export default function Search() {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState(false);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || sortFromUrl || orderFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setPagination(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
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

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
    <div className='flex flex-col md:flex-row max-w-6xl mx-auto'>
      <div className='p-7'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='mb-4'>
            <label className='font-semibold mb-2 block'>Pesquisar:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Marca, modelo, cidade, ano...'
              className='border rounded-lg p-3 w-full'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-2 mb-2'>
            <label className='font-semibold'>Filtrar por:</label>
            <select
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='price_asc'>Menor preço</option>
              <option value='price_desc'>Maior preço</option>
              <option value='createdAt_desc'>Mais novos</option>
              <option value='createdAt_asc'>Mais antigos</option>
            </select>
          </div>
          <div className='text-center'>
            <button className='w-60 mt-4 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'>
              Pesquisar
            </button>
          </div>
        </form>
      </div>
      <div className='flex-1 text-center md:text-left'>
        <h1 className='text-3xl font-semibold border-b p-3 mt-0 md:mt-12'>
          Resultados da busca:
        </h1>
        <div className='p-3 flex justify-center items-center flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-zinc-500 font-bold'>
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
