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
        <h2 className="mb-4 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
          Starred portfolios
        </h2>
      </div>
      <ul className="no-scrollbar flex overflow-x-auto px-6">
        {starredPortfolios.map((portfolio: Portfolio) => (
          <li className="py-2 mr-2 flex focus:ring-2 ring-forest-100 hover:bg-forest-100 rounded cursor-pointer" key={`starred-portfolio-${portfolio.id}`}>
            <div className="mr-3 flex h-14 w-14 items-center justify-center text-xl text-gray-700 font-semibold dark:border-slate-400 dark:bg-slate-500">
              {getInitials(portfolio.title)}
            </div>
            <div>
              <div className="line-clamp-2 inline-block justify-center bg-gray-200 px-2 py-1 text-[0.7rem] font-normal uppercase leading-tight text-gray-800">
                {portfolio.type}
              </div>
              <div className="w-[150px] dark:text-slate-200 text-gray-700">
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
