import { orders } from '@/data.json'
import { Order } from '@/app/api/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const isSearch = searchParams.has('q')

  let results: Order[] = []

  if (isSearch) {
    if (query) {
      const regex = new RegExp(query, 'ig')
      results = orders.filter((order) => {
        return regex.test(order.title)
      })
    }
  } else {
    results = orders
  }

  return Response.json({ orders: results })
}
