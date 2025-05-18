'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { getData, setToken } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { errorToast } from '../shared/custom-toast';

type Name = 'email' | 'password';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'password must be 8 characters at least',
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: any) {
    const { email, password } = values;
    const users: User[] | undefined = await getData({ url: 'users' });
    if (!users) {
      errorToast('Error', 'something went wrong');
      return;
    }
    const user = users.find((u) => u.email == email);
    if (!user) {
      errorToast('Error', 'no such user exists');
      return;
    }
    if (user.password != password) {
      errorToast('Error', 'incorrect password');
      return;
    }
    await setToken(user.id);
    router.push('/');
  }
  const fields: {
    label: string;
    name: Name;
    type: 'text' | 'password';
  }[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 gap-y-8"
      >
        {fields.map((itm) => (
          <FormField
            key={itm.name}
            control={form.control}
            name={itm.name as Name}
            render={({ field }) => (
              <FormItem className="col-span-1 relative">
                <FormLabel className="text-xl">{itm.label}</FormLabel>
                <FormControl>
                  <Input
                    type={itm.type}
                    placeholder={itm.label}
                    {...field}
                    className="focus-visible:ring-0 !text-xl !px-3 !py-5 border-primary"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-5" />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className=" text-xl !px-4 !py-5">
          Log in
          {false && <LoaderCircle className="animate-spin text-white " />}
        </Button>
      </form>
    </Form>
  );
}
