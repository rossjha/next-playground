import { z } from 'zod'

export const contactFormSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Enter a valid email address'),
  body: z.string().min(10, 'Message must be at least 10 characters long'),
})

export type TContactFormSchema = z.infer<typeof contactFormSchema>
