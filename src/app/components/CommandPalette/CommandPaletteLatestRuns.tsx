import Link from 'next/link'
import { Run } from '@/app/api/types'
import { useGetRunsQuery } from '@/redux/services/runsApi'

export default function CommandPalettePendingOrders() {
  // @ts-ignore
  const { isLoading, isFetching, data, error } = useGetRunsQuery()

  const runs = data?.runs ?? []

  return (
    <>
      {runs.length > 0 ? (
        <div className="py-6">
          <h2 className="mb-4 px-6 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
            Today's latest runs
          </h2>

          <ul className="px-4">
            {runs.map((run: Run) => (
              <li
                className="px-2 flex border-b border-b-gray-100 py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer rounded-md"
                key={`latest-run-${run.id}`}
              >
                <Link
                  href={`/trades/pending-orders/{order.id}`}
                  className="mr-3 text-forest-green dark:text-teal-500"
                >
                  {run.title}
                </Link>
                <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                  {run.status}
                </div>
                <div className="mr-6 dark:text-slate-200 text-gray-700">
                  {run.releaseStatus}
                </div>
                <div className="mr-6 dark:text-slate-200 text-gray-700">{run.updatedAt}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}
