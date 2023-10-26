'use client'

import { useGetModelByIdQuery } from '@/redux/services/modelsApi'

export default function Model({ params }: { params: { id: string } }) {
  const { id } = params
  const { isLoading, isFetching, data, error } = useGetModelByIdQuery({
    id,
  })

  return (
    <main className="p-12">
      {error ? (
        <div className="text-read-500">There was an error</div>
      ) : isLoading || isFetching ? (
        <div className="text-slate-700">loading...</div>
      ) : data ? (
        <div key={data.id} className="mb-2">
          <h1 className="mb-6 text-3xl">{data.title}</h1>
          <div>Type: {data.type}</div>
        </div>
      ) : null}
    </main>
  )
}
