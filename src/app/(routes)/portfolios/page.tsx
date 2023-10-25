'use client'

import { useSearchPortfoliosQuery } from '@/redux/services/portfolioApi'
import React, { useState } from 'react'
import Link from 'next/link'

import { Portfolio } from '@/app/api/types'

export default function Portfolios() {
  const [query, setQuery] = useState<string>('')
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const { isLoading, isFetching, data, error } = useSearchPortfoliosQuery({
    query,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target?.value || ''
    setQuery(query)
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

      {error ? (
        <div className="text-read-500">There was an error</div>
      ) : isLoading || isFetching ? (
        <div className="text-slate-700">loading...</div>
      ) : data ? (
        <ul>
          {data.map((portfolio: Portfolio) => (
            <li key={portfolio.id} className="mb-2">
              <Link href={`/portfolios/${portfolio.id}`}>
                {portfolio.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
