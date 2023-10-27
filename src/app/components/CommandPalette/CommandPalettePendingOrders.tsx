import { Order } from '@/app/api/types'
import Link from 'next/link'
import { useGetOrdersQuery } from '@/redux/services/ordersApi'

export default function CommandPalettePendingOrders() {
  const { isLoading, isFetching, data, error } = useGetOrdersQuery()

  const orders = data?.orders ?? []

  return (
    <>
      {orders.length > 0 ? (
        <div className="py-6">
          <h2 className="mb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Pending orders
          </h2>

          <ul className="px-6">
            {orders.map((order: Order) => (
              <li
                className="flex border-b py-3 text-sm dark:border-b-slate-500"
                key={`pending-order-${order.id}`}
              >
                <Link
                  href={`/trades/pending-orders/{order.id}`}
                  className="mr-3 font-medium text-teal-700 dark:text-teal-500"
                >
                  {order.title}
                </Link>
                <div className="mr-3 flex items-center justify-center rounded bg-green-100 px-1 text-[0.7rem] font-semibold uppercase text-green-800">
                  {order.status}
                </div>
                <div className="mr-6 dark:text-slate-200">
                  {order.releaseStatus}
                </div>
                <div className="mr-6 dark:text-slate-200">
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
