import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  keepUnusedDataFor: 1000 * 60 * 60 * 24 * 7,
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => '/users',
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
});

export const { useContactsQuery, useContactQuery, useAddContactMutation } =
  contactsApi;
