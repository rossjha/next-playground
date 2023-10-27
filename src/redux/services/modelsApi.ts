import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Model } from '@/app/api/types'

export const modelsApi = createApi({
  reducerPath: 'modelsApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getModels: builder.query<Model[], null>({
      query: () => 'models',
    }),
    getModelById: builder.query<Model, { id: string }>({
      query: ({ id }) => `models/${id}`,
    }),
    searchModels: builder.query<{ models: Model[] }, { query: string }>({
      query: ({ query }) => `models/?q=${encodeURIComponent(query)}`,
    }),
  }),
})

export const {
  useGetModelsQuery,
  useGetModelByIdQuery,
  useSearchModelsQuery,
  useLazySearchModelsQuery,
} = modelsApi
