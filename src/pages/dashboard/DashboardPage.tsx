import { 
  IoAccessibilityOutline, 
  IoHeartOutline, 
  IoListOutline, 
  IoLockClosedOutline, 
  IoPawOutline } 
  from 'react-icons/io5';
import { WhiteCard } from '../../components/shared/cards/WhiteCard';
// import { useAuthStore, useBearStore, usePersonStore, useTaskStore } from '../../stores';

export const Dashboard = () => {

  // const totalBears = useBearStore( state => state.totalBears );
  // const firstName = usePersonStore( state => state.firstName );
  // const tasks = useTaskStore( state => state.tasks );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user');

  // const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1 className="font-sans text-3xl font-bold text-blue-500">Panel Administrativo</h1>
      <p className="font-sans text-lg font-bold">Resumen informativo y gráfico</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{/* 
        <WhiteCard centered>
          <IoPawOutline size={ 50 } className="text-indigo-600" />
          <h2>Osos</h2>
          <p>{ totalBears() }</p>
        </WhiteCard> */}

      //TODO : Usar shadcn para generar el dashboard y usar los cards para las demas paginas.

        {/* <WhiteCard centered>
          <IoAccessibilityOutline size={ 50 } className="text-indigo-600" />
          <h2>Persona</h2>
          <p>{ firstName }</p>
        </WhiteCard> */}


        {/* <WhiteCard centered>
          <IoListOutline size={ 50 } className="text-indigo-600" />
          <h2>Tareas</h2>
          <p>{ taskCount }</p>
        </WhiteCard> */}
{/* 

        <WhiteCard centered>
          <IoHeartOutline size={ 50 } className="text-indigo-600" />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard> */}


        {/* <WhiteCard centered>
          <IoLockClosedOutline size={ 50 } className="text-indigo-600" />
          <h2>Auth</h2>
          {userName}
        </WhiteCard> */}



      </div>

    </>
  );
};