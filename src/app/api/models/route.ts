import { models } from '@/data.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (query) {
    const regex = new RegExp(query, 'ig')
    const filteredModels = models.filter((model) => {
      return regex.test(model.title) || regex.test(model.type)
    })
    return Response.json(filteredModels)
  }

  return Response.json(models)
}
