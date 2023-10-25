import { portfolios } from '@/data.json'

export async function GET(request: Request, { params }: any) {
  const { id = '' } = params
  const portfolio = portfolios.find((portfolio) => portfolio.id === id) || {}
  return Response.json({ ...portfolio })
}
