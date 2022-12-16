import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Contact {
  id: string;
  name: string;
  email: string;
}
interface PageNo {
  page: number;
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  //number in seconds specifies how long the data should be kept in the cache
  keepUnusedDataFor: 6000,
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: (page) => `/users/?_limit=3=&_page=${page}`,
      providesTags: ['Contact'],
    }),
    contact: builder.query<Contact, string>({
      query: (id) => `users/${id}`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: '/users',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),

  refetchOnMountOrArgChange: 6000,
});

export const { useContactsQuery, useContactQuery, useAddContactMutation } =
  contactsApi;
