import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Security } from '@/app/api/types'

export const securitiesApi = createApi({
  reducerPath: 'securitiesApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getSecurities: builder.query<Security[], null>({
      query: () => 'securities',
    }),
    getSecurityById: builder.query<Security, { id: string }>({
      query: ({ id }) => `securities/${id}`,
    }),
    searchSecurities: builder.query<
      { securities: Security[] },
      { query: string }
    >({
      query: ({ query }) => `securities/?q=${encodeURIComponent(query)}`,
    }),
  }),
})

export const {
  useGetSecuritiesQuery,
  useGetSecurityByIdQuery,
  useSearchSecuritiesQuery,
} = securitiesApi
