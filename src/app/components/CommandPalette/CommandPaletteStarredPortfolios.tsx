import { Portfolio } from '@/app/api/types'
import { getInitials, truncateStr } from '@/app/lib/utils'

type CommandPaletteStarredPortfoliosProps = {
  starredPortfolios: Portfolio[]
}

export default function CommandPaletteStarredPortfolios({
  starredPortfolios,
}: CommandPaletteStarredPortfoliosProps) {
  return (
    <div className="py-6">
      <div className="flex justify-between px-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
          Pinned portfolios
        </h2>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
      <ul className="no-scrollbar flex overflow-x-auto px-6">
        {starredPortfolios.map((portfolio: Portfolio) => (
          <li className="mr-2 flex" key={`starred-portfolio-${portfolio.id}`}>
            <div className="mr-3 flex h-14 w-14 items-center justify-center rounded border border-gray-200 bg-gray-100 text-xl font-semibold dark:border-slate-400 dark:bg-slate-500">
              {getInitials(portfolio.title)}
            </div>
            <div>
              <div className="line-clamp-2 inline-block justify-center rounded bg-red-100 px-1 py-[1px] text-[0.7rem] font-semibold uppercase leading-tight text-red-800">
                {portfolio.type}
              </div>
              <div className="w-[150px] dark:text-slate-200">
                <span title={portfolio.title}>
                  {truncateStr(portfolio.title, 15)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
