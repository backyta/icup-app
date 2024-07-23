import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { type UserColumns } from '@/app/user/interfaces';
import { type UserRole, UserRoleNames } from '@/app/user/enums';
import { UserInfoCard, UserUpdateCard, UserPasswordUpdateCard } from '@/app/user/components';

import { Button } from '@/shared/components/ui/button';

export const userUpdateColumns: Array<ColumnDef<UserColumns, any>> = [
  {
    accessorKey: 'id',
    cell: (info) => {
      const id = info.getValue();
      return id.substring(0, 7);
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Nombres
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Apellidos
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Correo Electrónico
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'roles',
    cell: (info) => {
      function convertRolesToSpanishString(roles: string[]): string {
        return roles.map((role) => UserRoleNames[role as UserRole]).join(' - ');
      }

      const roles = info.getValue();
      return convertRolesToSpanishString(roles as string[]);
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Roles
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'showInfo',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <UserInfoCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-blue-500 hover:text-blue-500'
          variant='ghost'
        >
          Info
        </Button>
      );
    },
  },

  {
    id: 'updateInfo',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <UserUpdateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-orange-500 hover:text-orange-500'
          variant='ghost'
        >
          Actualizar
        </Button>
      );
    },
  },
  {
    id: 'updateInfo',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <UserPasswordUpdateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-purple-500 hover:text-purple-500'
          variant='ghost'
        >
          Contraseña
        </Button>
      );
    },
  },
];
