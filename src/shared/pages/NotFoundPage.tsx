import { Link } from 'react-router-dom';

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className='bg-slate-950 min-h-screen p-6 -mb-6'>
      <h1 className='text-5xl md:text-7xl font-black pt-6 text-red-600 mb-4 text-center'>404</h1>

      <h2 className='text-white text-[30px] leading-10 md:text-5xl text-center font-black'>
        Página no encontrada
      </h2>
      <p className='text-white mt-3 mb-6 text-[14px] md:text-[17px] text-center'>
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <img
        src='/images/404.webp'
        alt='Not Found Image'
        className='mx-auto w-[17rem] md:w-[30rem] mb-6 rounded-full shadow-lg'
      />

      <p className='mt-3 md:mt-8 text-[14px] md:text-[18px] text-center text-white'>
        Puedes volver al{' '}
        <Link className='text-fuchsia-500 underline' to={'/dashboard'}>
          Panel Principal
        </Link>{' '}
        o explorar otras secciones de nuestra aplicación.
      </p>

      <p className='text-center mt-8'>
        <Link
          to={'/dashboard'}
          className='px-6 py-2 text-[14px] md:text-[16px] text-center mx-auto bg-fuchsia-500 text-white rounded-lg shadow hover:bg-fuchsia-700'
        >
          Volver a la Página Principal
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
