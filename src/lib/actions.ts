'use server';

import { cookies } from 'next/headers';

export const getToken = async () => {
  const cookie = await cookies();
  return cookie.get('token')?.value || null;
};
export const setToken = async (token: string) => {
  const cookie = await cookies();
  cookie.set('token', token);
};
export const deleteToken = async () => {
  const cookie = await cookies();
  cookie.delete('token');
};

export const getHeaders = async (token: boolean) => {
  const locale = 'en';
  const headers: {
    lang: string;
    'Accept-Language': string;
    Authorization?: string;
    'content-type': string;
  } = {
    lang: locale,
    'Accept-Language': locale,
    'content-type': 'application/json',
  };
  if (token) {
    const token = await getToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const getData = async (args: { url: string; token?: boolean }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${args.url}`
    );
    const data = await response.json();
    return data;
  } catch (err: any) {
    return err;
  }
};

export const postData = async (args: {
  url: string;
  token?: boolean;
  data?: any;
}) => {
  const data = JSON.stringify(args.data || {});
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${args.url}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }
    );
    const fdata = await response.json();
    return fdata;
  } catch (err: any) {
    return err;
  }
};
