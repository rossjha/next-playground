import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/types'

export async function POST(req: Request) {
  const body: unknown = await req.json()
  const result = contactFormSchema.safeParse(body)

  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
  }

  const response =
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  const status = response.success ? 200 : 422

  return NextResponse.json(response, { status })
}
