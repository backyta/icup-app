/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ColumnDef } from '@tanstack/react-table';
// import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
// import { Checkbox } from '@/components/ui/checkbox';

import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Member {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  date_birth: string;
}

export const columns: Array<ColumnDef<Member, any>> = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => {
  //         table.toggleAllPageRowsSelected(!!value);
  //       }}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => {
  //         row.toggleSelected(!!value);
  //       }}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'first_name',
    header: 'Nombres',
  },
  {
    accessorKey: 'last_name',
    header: 'Apellidos',
  },
  {
    accessorKey: 'gender',
    header: 'Genero',
  },
  {
    accessorKey: 'date_birth',
    header: 'Fecha de Nacimiento',
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy'),
  },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant='ghost'
  //         onClick={() => {
  //           column.toggleSorting(column.getIsSorted() === 'asc');
  //         }}
  //       >
  //         Email
  //         <ArrowUpDown className='ml-2 h-4 w-4' />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'amount',
  //   header: () => <div className='text-right'>Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue('amount'));
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount);

  //     return <div className='text-right font-medium'>{formatted}</div>;
  //   },
  // },
  {
    id: 'search',
    cell: () => {
      return (
        <Button
          variant='ghost'
          className='h-full w-auto px-4 py-2 border border-slate-500 bg-slate-200 hover:bg-slate-300 dark:bg-slate-950 dark:hover:bg-slate-900'
        >
          Ver Información
        </Button>
      );
    },
  },
  // {
  //   id: 'actions',

  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant='ghost' className='h-8 w-8 p-0'>
  //             <span className='sr-only'>Open menu</span>
  //             <MoreHorizontal className='h-4 w-4' />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align='end'>
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={async () => {
  //               await navigator.clipboard.writeText(payment.id);
  //             }}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
