import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Portfolio } from '@/app/api/types'

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  refetchOnFocus: true,
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
    searchPortfolios: builder.query<Portfolio[], { query: string }>({
      query: ({ query }) => `portfolios/?q=${query}`,
    }),
  }),
})

export const {
  useGetPortfoliosQuery,
  useGetPortfolioByIdQuery,
  useSearchPortfoliosQuery,
} = portfolioApi
