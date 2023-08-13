import { JSONSchemaType } from 'ajv'

export type TContactFormSchema = {
  fullName: string
  email: string
  body: string
}

export const contactFormSchema: JSONSchemaType<TContactFormSchema> = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
      minLength: 3,
      errorMessage: {
        minLength: 'Name must be at least 3 characters long',
      },
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        format: 'Enter a valid email address',
      },
    },
    body: {
      type: 'string',
      minLength: 10,
      errorMessage: {
        minLength: 'Message must be at least 10 characters long',
      },
    },
  },
  required: ['fullName', 'email', 'body'],
} as const
