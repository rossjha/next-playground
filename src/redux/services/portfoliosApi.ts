import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Portfolio } from '@/app/api/types'

export const portfoliosApi = createApi({
  reducerPath: 'portfoliosApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query<Portfolio[], null>({
      query: () => 'portfolios',
    }),
    getPortfolioById: builder.query<Portfolio, { id: string }>({
      query: ({ id }) => `portfolios/${id}`,
    }),
    searchPortfolios: builder.query<
      { portfolios: Portfolio[] },
      { query: string }
    >({
      query: ({ query }) => `portfolios/?q=${encodeURIComponent(query)}`,
    }),
  }),
})

export const {
  useGetPortfoliosQuery,
  useGetPortfolioByIdQuery,
  useSearchPortfoliosQuery,
} = portfoliosApi
