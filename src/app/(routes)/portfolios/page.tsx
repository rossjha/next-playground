'use client'

import { useSearchPortfoliosQuery } from '@/redux/services/portfoliosApi'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Portfolio } from '@/app/api/types'
import { getInitials } from '@/app/lib/utils'

export default function Portfolios() {
  const [query, setQuery] = useState<string>('')
  const [starredPortfolios, setStarredPortfolios] = useState<Portfolio[]>([])
  const { isLoading, isFetching, data, error } = useSearchPortfoliosQuery({
    query,
  })

  useEffect(() => {
    const starredPortfolios = getStarredPortfolios()
    setStarredPortfolios(starredPortfolios)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target?.value || ''
    setQuery(query)
  }

  const getStarredPortfolios = () => {
    const appData = localStorage.getItem('appData') || ''
    const { portfolios } = JSON.parse(appData)
    return portfolios || []
  }

  const toggleStarredPortfolio = (
    portfolio: Portfolio,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const portfolios = getStarredPortfolios()

    const portfolioIsStarred = portfolios.find(
      (p: Portfolio) => p.id === portfolio.id,
    )

    let updatedPortfolios

    if (portfolioIsStarred) {
      updatedPortfolios = portfolios.filter(
        (p: Portfolio) => p.id !== portfolio.id,
      )
    } else {
      updatedPortfolios = [portfolio, ...portfolios]
    }

    setStarredPortfolios(updatedPortfolios)
    localStorage.setItem(
      'appData',
      JSON.stringify({ portfolios: updatedPortfolios }),
    )
  }

  const isPortfolioStarred = (id: string) => {
    return starredPortfolios.find((p: Portfolio) => p.id === id)
  }

  return (
    <main className="p-12">
      <h1 className="mb-6 text-3xl">Portfolios</h1>

      <div>
        <input
          type="search"
          onChange={handleInputChange}
          name="query"
          className="mb-8 w-96 rounded border border-blue-500 bg-white p-1"
          autoComplete="off"
        />
      </div>

      {starredPortfolios.length > 0 && (
        <div className="mb-8 border-b">
          <h2 className="text-1xl mb-2 font-semibold">Starred portfolios</h2>
          <div className="mb-4">
            {starredPortfolios.map((portfolio: Portfolio) => (
              <div
                className="mb-4 flex items-center"
                key={`starred-portfolio-${portfolio.id}`}
              >
                <div className="mr-2 text-2xl">
                  {getInitials(portfolio.title)}
                </div>
                <div>{portfolio.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error ? (
        <div className="text-read-500">There was an error</div>
      ) : isLoading || isFetching ? (
        <div className="text-slate-700">loading...</div>
      ) : data ? (
        <ul>
          {data.map((portfolio: Portfolio) => (
            <li key={portfolio.id} className="mb-4 flex items-center">
              <Link href={`/portfolios/${portfolio.id}`} className="mr-4">
                {portfolio.title}
              </Link>
              <button
                onClick={(evt) => toggleStarredPortfolio(portfolio, evt)}
                className="rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-6 w-6 ${
                    isPortfolioStarred(portfolio.id)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-slate-500'
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
