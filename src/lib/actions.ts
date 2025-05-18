'use server';

import { cookies } from 'next/headers';
const baseUrl = 'http://localhost:3000';
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
// function to set the headers of the request
export const getHeaders = async (token: boolean) => {
  const locale = 'en';
  const headers: {
    lang: string;
    'Accept-Language': string;
    Authorization?: string;
  } = {
    lang: locale,
    'Accept-Language': locale,
  };
  if (token) {
    const token = await getToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// function to convert object data to form data
const getFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(key, item);
        });
      } else if (typeof value === 'object' && value !== null) {
        for (const nestedKey in value) {
          if (value.hasOwnProperty(nestedKey)) {
            formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
          }
        }
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
};

// function to get data
export const getData = async (args: { url: string; token?: boolean }) => {
  const headers = await getHeaders(args.token || false);
  try {
    const response = await fetch(`${baseUrl}${args.url}`, {
      headers,
    });
    const data = await response.json();
    return data;
  } catch (err: any) {
    return err;
  }
};

// function to post data
export const postData = async (args: {
  url: string;
  token?: boolean;
  data?: any;
}) => {
  const headers = await getHeaders(args.token || false);
  const data = JSON.stringify(args.data || {});
  try {
    const response = await fetch(`${baseUrl}${args.url}`, {
      method: 'POST',
      ...headers,
      body: data,
    });
    const fdata = await response.json();
    return fdata;
  } catch (err: any) {
    return err;
  }
};
