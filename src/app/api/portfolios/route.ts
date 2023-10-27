import { portfolios } from '@/data.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (query) {
    const regex = new RegExp(query, 'ig')
    const filteredPortfolios = portfolios.filter((portfolio) => {
      return regex.test(portfolio.title) || regex.test(portfolio.type)
    })
    return Response.json(filteredPortfolios)
  }

  return Response.json({ portfolios: results })
}
