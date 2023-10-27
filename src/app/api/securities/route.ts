import { securities } from '@/data.json'
import { Security } from '@/app/api/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const isSearch = searchParams.has('q')

  let results: Security[] = []

  if (isSearch) {
    if (query) {
      const regex = new RegExp(query, 'ig')
      results = securities.filter((security) => {
        return regex.test(security.title)
      })
    }
  } else {
    results = securities
  }

  return Response.json({ securities: results })
}
