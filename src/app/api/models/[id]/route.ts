import { models } from '@/data.json'

export async function GET(request: Request, { params }: any) {
  const { id = '' } = params
  const model = models.find((model) => model.id === id) || {}
  return Response.json({ ...model })
}
