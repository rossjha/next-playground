import Link from 'next/link'
import { Run } from '@/app/api/types'
import { useGetRunsQuery } from '@/redux/services/runsApi'

export default function CommandPalettePendingOrders() {
  const { isLoading, isFetching, data, error } = useGetRunsQuery()

  const runs = data?.runs ?? []

  return (
    <>
      {runs.length > 0 ? (
        <div className="py-6">
          <h2 className="mb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Today's latest runs
          </h2>

          <ul className="px-6">
            {runs.map((run: Run) => (
              <li
                className="flex border-b py-3 text-sm dark:border-b-slate-500"
                key={`latest-run-${run.id}`}
              >
                <Link
                  href={`/trades/pending-orders/{order.id}`}
                  className="mr-3 font-medium text-teal-700 dark:text-teal-500"
                >
                  {run.title}
                </Link>
                <div className="mr-3 flex items-center justify-center rounded bg-green-100 px-1 text-[0.7rem] font-semibold uppercase text-green-800">
                  {run.status}
                </div>
                <div className="mr-6 dark:text-slate-200">
                  {run.releaseStatus}
                </div>
                <div className="mr-6 dark:text-slate-200">{run.updatedAt}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}
