import { Order } from '@/app/api/types'
import Link from 'next/link'
import { useGetOrdersQuery } from '@/redux/services/ordersApi'

export default function CommandPalettePendingOrders() {
  // @ts-ignore
  const { isLoading, isFetching, data, error } = useGetOrdersQuery()

  const orders = data?.orders ?? []

  return (
    <>
      {orders.length > 0 ? (
        <div className="py-6">
          <h2 className="mb-4 px-6 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
            Pending orders
          </h2>

          <ul className="px-4">
            {orders.map((order: Order) => (
              <li
                className="px-2 flex border-b border-b-gray-100 py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer rounded-md"
                key={`pending-order-${order.id}`}
              >
                <Link
                  href={`/trades/pending-orders/{order.id}`}
                  className="mr-3 text-forest-green dark:text-teal-500"
                >
                  {order.title}
                </Link>
                <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                  {order.status}
                </div>
                <div className="mr-6 dark:text-slate-200 text-gray-700">
                  {order.releaseStatus}
                </div>
                <div className="mr-6 dark:text-slate-200 text-gray-700">
                  {order.updatedAt}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}
