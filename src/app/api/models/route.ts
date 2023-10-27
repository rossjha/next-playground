import { models } from '@/data.json'
import { Model } from '@/app/api/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const isSearch = searchParams.has('q')

  let results: Model[] = []

  if (isSearch) {
    if (query) {
      const regex = new RegExp(query, 'ig')
      results = models.filter((model) => {
        return regex.test(model.title)
      })
    }
  } else {
    results = models
  }

  return Response.json({ models: results })
}
