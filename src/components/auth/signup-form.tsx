'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

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
import { postData } from '@/lib/actions';
import { useRouter } from 'next/navigation';
type Name = 'email' | 'password' | 'confirm' | 'name';

const formSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'password must be 8 characters at least',
    }),
    confirm: z.string().min(8, {
      message: 'password must be 8 characters at least',
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "passwords don't match",
    path: ['confirm'],
  });

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirm: '',
    },
  });

  async function onSubmit(values: any) {
    const data = await postData({ url: '/api/register', data: values });
    if (data.error) {
      toast('Error', {
        description: data.error || 'something went wrong',
        style: {
          backgroundColor: 'red',
          fontSize: '20px',
          color: 'white',
          border: '0',
          fontWeight: 'bold',
        },
      });
    } else {
      toast('Done', {
        description: 'user created successfuly',
        style: {
          backgroundColor: 'green',
          fontSize: '20px',
          color: 'white',
          border: '0',
          fontWeight: 'bold',
        },
      });
      router.push('/login');
    }
  }
  const fields: {
    label: string;
    name: Name;
    type: 'text' | 'password';
  }[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
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
    {
      name: 'confirm',
      label: 'confirm password',
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
          Register
          {false && <LoaderCircle className="animate-spin text-white " />}
        </Button>
      </form>
    </Form>
  );
}
