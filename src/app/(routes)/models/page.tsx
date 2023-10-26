'use client'

import { useSearchModelsQuery } from '@/redux/services/modelsApi'
import React, { useState } from 'react'
import Link from 'next/link'
import { Model } from '@/app/api/types'

export default function Models() {
  const [query, setQuery] = useState<string>('')
  const { isLoading, isFetching, data, error } = useSearchModelsQuery({
    query,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target?.value || ''
    setQuery(query)
  }

  return (
    <main className="p-12">
      <h1 className="mb-6 text-3xl">Models</h1>

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
          {data.map((model: Model) => (
            <li key={model.id} className="mb-2">
              <Link href={`/models/${model.id}`}>{model.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
