import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from '@/app/api/types'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<{ orders: Order[] }, null>({
      query: () => 'orders',
    }),
    getOrderById: builder.query<Order, { id: string }>({
      query: ({ id }) => `orders/${id}`,
    }),
    searchOrders: builder.query<{ orders: Order[] }, { query: string }>({
      query: ({ query }) => `orders/?q=${encodeURIComponent(query)}`,
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useSearchOrdersQuery,
  useLazySearchOrdersQuery,
} = ordersApi
