export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7'>
        <form>
          <div className='mb-4'>
            <label className='font-semibold mb-2 block'>Pesquisar:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Marca, modelo, cidade, ano...'
              className='border rounded-lg p-3 w-full'
            />
          </div>
          <div className='flex flex-col gap-2 mb-2'>
            <label className='font-semibold'>Filtrar por:</label>
            <select id='sort_order' className='border rounded-lg p-3'>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Mais novos</option>
              <option>Mais antigos</option>
            </select>
          </div>
          <div className='text-center'>
            <button className='w-60 mt-4 mx-auto bg-emerald-700 rounded-lg text-white p-3 text-center hover:opacity-90 disabled:opacity-80'>
              Pesquisar
            </button>
          </div>
        </form>
      </div>
      <div className='text-center md:text-left'>
        <h1 className='text-3xl font-semibold border-b p-3 mt-0 md:mt-5'>
          Resultados da busca:
        </h1>
      </div>
    </div>
  );
}
