'use client'
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { TContactFormSchema, contactFormSchema } from '@/lib/types'
import Card from '@/components/Card'
import { Button } from '@/components/Button'
import ValidationMessage from '@/components/ValidationMessage'
import { toast } from 'react-toastify'
import { fullFormats } from 'ajv-formats/dist/formats'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TContactFormSchema>({
    mode: 'onBlur',
    resolver: ajvResolver(contactFormSchema, { formats: fullFormats }),
  })

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch('/api/contact-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'aa', // TODO temp, cause a server validation error
        email: 'foo', // TODO temp, cause a server validation error
        body: data.body,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      if (response.status === 422) {
        toast.error('Fix validation issues')
      } else {
        toast.error('Submission failed')
        return
      }
    }

    if (responseData.errors) {
      const errors = responseData.errors
      for (const field of Object.keys(errors)) {
        setError(field as keyof TContactFormSchema, {
          type: 'server',
          message: errors[field as keyof TContactFormSchema],
        })
      }
    }
  }

  return (
    <Card className="w-[500px] p-8 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-6 text-2xl text-slate-700">Contact us</h1>

        <div className="mb-6">
          <label htmlFor="fullName" className="mb-1 block text-slate-700">
            Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Full name"
            className="w-full rounded border p-2"
            {...register('fullName')}
          />
          {errors.fullName && (
            <ValidationMessage>{errors.fullName.message}</ValidationMessage>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="mb-1 block text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email address"
            className="w-full rounded border p-2"
            {...register('email')}
          />
          {errors.email && (
            <ValidationMessage>{errors.email.message}</ValidationMessage>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="body" className="mb-1 block text-slate-700">
            Message
          </label>
          <textarea
            className="w-full rounded border p-1"
            rows={5}
            {...register('body')}
          ></textarea>
          {errors.body && (
            <ValidationMessage>{errors.body.message}</ValidationMessage>
          )}
        </div>

        <div className="flex justify-end pt-6">
          <Button
            variant="outline"
            className="mr-3"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
