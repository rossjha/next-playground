import { runs } from '@/data.json'
import { Run } from '@/app/api/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const isSearch = searchParams.has('q')

  let results: Run[] = []

  if (isSearch) {
    if (query) {
      const regex = new RegExp(query, 'ig')
      results = runs.filter((run) => {
        return regex.test(run.title)
      })
    }
  } else {
    results = runs
  }

  return Response.json({ runs: results })
}
