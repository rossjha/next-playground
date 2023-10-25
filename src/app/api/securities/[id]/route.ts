import { securities } from '@/data.json'

export async function GET(request: Request, { params }: any) {
  const { id = '' } = params
  const security = securities.find((security) => security.id === id) || {}
  return Response.json({ ...security })
}
