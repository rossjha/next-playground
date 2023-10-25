import { securities } from '@/data.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (query) {
    const regex = new RegExp(query, 'ig')
    const filteredSecurities = securities.filter((security) => {
      return regex.test(security.title) || regex.test(security.type)
    })
    return Response.json(filteredSecurities)
  }

  return Response.json(securities)
}
