import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { type UserColumns } from '@/modules/user/interfaces/user-columns.interface';
import { type UserRole, UserRoleNames } from '@/modules/user/enums/user-role.enum';

import { UserInfoCard } from '@/modules/user/components/cards/info/UserInfoCard';
import { UserInactivateCard } from '@/modules/user/components/cards/inactivate/UserInactivateCard';

import { Button } from '@/shared/components/ui/button';

export const userInactivateColumns: Array<ColumnDef<UserColumns, any>> = [
  {
    id: 'id',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.getValue();
      return id.substring(0, 7);
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'firstNames',
    accessorKey: 'firstNames',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'lastNames',
    accessorKey: 'lastNames',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'roles',
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
          className='font-bold text-[14px] md:text-[14px]'
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
          className='font-bold text-[14px] md:text-[14px] text-blue-500 hover:text-blue-500'
          variant='ghost'
        >
          Info
        </Button>
      );
    },
  },

  {
    id: 'inactivateRecord',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <UserInactivateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px] text-red-500 hover:text-red-500'
          variant='ghost'
        >
          Inactivar
        </Button>
      );
    },
  },
];
