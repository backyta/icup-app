import { type Member, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      first_name: 'Roberto Carlos',
      last_name: 'García',
      date_birth: '1985-03-15',
      gender: 'male',
    },
    // ...
  ];
}

export default async function DemoPage(): Promise<JSX.Element> {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
