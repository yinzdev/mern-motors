export default function CreateListing() {
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
        {/* Dropdown Menus */}
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='w-full sm:w-1/2'>
            <select
              className='border p-3 rounded-lg appearance-none w-full bg-white hover:border-gray-500 focus:outline-none focus:ring focus:border-blue-500'
              id='colorOption'
              required
            >
              <option value='' disabled selected hidden>
                Cor
              </option>
              <option value='sim'>Sim</option>
              <option value='não'>Não</option>
            </select>
          </div>
          <div className='w-full sm:w-1/2'>
            <select
              className='border p-3 rounded-lg appearance-none w-full bg-white hover:border-gray-500 focus:outline-none focus:ring focus:border-blue-500'
              id='cityOption'
              required
            >
              <option value='' disabled selected hidden>
                Cidade
              </option>
              <option value='sim'>Sim</option>
              <option value='não'>Não</option>
            </select>
          </div>
        </div>
        {/* Textarea */}
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
            Imagens:
            <span className='font-normal text-gray-600 ml-2'>
              A primeira imagem será usada como capa (max. 6){' '}
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='images/*'
              multiple
            />
            <button className='p-3 text-emerald-700 border border-emerald-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
        </div>
        <button className='w-80 mt-4 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'>
          Criar Anúncio
        </button>
      </form>
    </main>
  );
}
