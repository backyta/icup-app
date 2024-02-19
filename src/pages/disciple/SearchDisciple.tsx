import { type Payment, columns } from '@/components/payments/columns';
import { DataTable } from '@/components/payments/data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

const data = await getData();
export default function SearchDisciple(): JSX.Element {
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
