import { Link } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';

export default function ListingCard({ listing }) {
  return (
    <div className='bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-lg w-full sm:w-[265px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'https://i.imgur.com/lGHUhO1.png'}
          alt='Capa do anúncio'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 text-center w-full'>
          <p className='truncate capitalize text-lg text-zinc-700 font-bold'>
            {listing.carBrand} {listing.carModel}
          </p>

          <div className='flex flex-row justify-between'>
            <p>
              {listing.carProductionYear}/{listing.carModelYear}
            </p>
            <p>{listing.carMiles.toLocaleString('pt-BR')} Km</p>
          </div>
          <p className='text-2xl text-zinc-700 font-bold mt-2'>
            R$ {listing.price.toLocaleString('pt-BR')}
          </p>
          <div className='flex items-center gap-1 mt-2'>
            <IoLocationSharp className='text-emerald-700 text-lg' />
            <p className='text-sm text-zinc-600'>{listing.location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
