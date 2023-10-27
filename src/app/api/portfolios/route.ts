import { portfolios } from '@/data.json'
import { Portfolio } from '@/app/api/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const isSearch = searchParams.has('q')

  let results: Portfolio[] = []

  if (isSearch) {
    if (query) {
      const regex = new RegExp(query, 'ig')
      results = portfolios.filter((portfolio) => {
        return regex.test(portfolio.title)
      })
    }
  } else {
    results = portfolios
  }

  return Response.json({ portfolios: results })
}
