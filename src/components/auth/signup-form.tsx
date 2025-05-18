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
import { postData } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { errorToast, successToast } from '../shared/custom-toast';
import { fields } from '@/lib/constants';
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
    delete values.confirm;
    const data = await postData({ url: '/users', data: values });
    if (!data) {
      errorToast('Error', 'something went wrong');
    } else {
      successToast('Done', 'user created successfuly');
      router.push('/login');
    }
  }

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
            name={itm.name}
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
