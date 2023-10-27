import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Run } from '@/app/api/types'

export const runsApi = createApi({
  reducerPath: 'runsApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getRuns: builder.query<{ runs: Run[] }, null>({
      query: () => 'runs',
    }),
    getRunById: builder.query<Run, { id: string }>({
      query: ({ id }) => `runs/${id}`,
    }),
    searchRuns: builder.query<{ runs: Run[] }, { query: string }>({
      query: ({ query }) => `runs/?q=${encodeURIComponent(query)}`,
    }),
  }),
})

export const {
  useGetRunsQuery,
  useGetRunByIdQuery,
  useSearchRunsQuery,
  useLazySearchRunsQuery,
} = runsApi
