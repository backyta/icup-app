/* eslint-disable @typescript-eslint/no-misused-promises */
import type * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';

import { userSchema } from '../../validations/user-schema';

export const CreateUserPage = (): JSX.Element => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      companyName: '',
    },
  });

  const accountType = form.watch('accountType');

  const handleSubmit = (values: z.infer<typeof userSchema>): void => {
    console.log({ values });
  };

  return (
    <>
      <h1 className='text-center p-2 md:p-4 font-sans text-2xl sm:text-3xl font-bold text-blue-600 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo Discípulo
      </h1>

      <hr className='p-[0.02rem] bg-slate-500' />

      <h1 className='text-center p-2 md:p-4 font-sans text-2xl sm:text-2xl font-bold text-green-600 text-[1.5rem] sm:text-[2.0rem] md:text-[2.2rem] lg:text-4xl xl:text-4xl'>
        Crear un nuevo discípulo
      </h1>
      <p className='text-center font-sans text-sm sm:text-md font-bold px-4 lg:text-base xl:text-lg'>
        Hola, por favor llena los siguientes datos para crear un nuevo
        discípulo.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-24 py-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='emailAddress'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel> Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Email address'
                        type='email'
                        autoComplete='username'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Password'
                        autoComplete='new-password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password Confirm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Password confirm'
                        autoComplete='new-password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='accountType'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select an account type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='personal'>Personal</SelectItem>
                        <SelectItem value='company'>Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {accountType === 'company' && (
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Company name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
