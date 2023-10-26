'use client'

import { useSearchSecuritiesQuery } from '@/redux/services/securitiesApi'
import React, { useState } from 'react'
import Link from 'next/link'
import { Security } from '@/app/api/types'

export default function Portfolios() {
  const [query, setQuery] = useState<string>('')
  const { isLoading, isFetching, data, error } = useSearchSecuritiesQuery({
    query,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target?.value || ''
    setQuery(query)
  }

  return (
    <main className="p-12">
      <h1 className="mb-6 text-3xl">Securities</h1>

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
          {data.map((security: Security) => (
            <li key={security.id} className="mb-2">
              <Link href={`/securities/${security.id}`}>{security.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
