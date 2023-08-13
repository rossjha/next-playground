import { NextResponse } from 'next/server'
import { TContactFormSchema, contactFormSchema } from '@/lib/types'
import Ajv, { ErrorObject } from 'ajv'
import ajvFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'

const ajv = new Ajv({ allErrors: true })

ajvFormats(ajv, ['email'])
ajvErrors(ajv)

const parseErrors = (validationErrors: ErrorObject[]) => {
  if (!validationErrors) return {}

  let errors = {}
  validationErrors.forEach((error) => {
    const field = error.instancePath.replace('/', '')
    errors = { ...errors, [field]: error.message }
  })
  return errors
}

export async function POST(req: Request) {
  const body: unknown = await req.json()
  const validate = ajv.compile<TContactFormSchema>(contactFormSchema)

  const result = validate(body)
  let errors = {}

  if (!result && validate.errors) {
    errors = parseErrors(validate.errors)
  }

  const response =
    Object.keys(errors).length > 0 ? { errors } : { success: true }

  const status = response.success ? 200 : 422

  return NextResponse.json(response, { status })
}
