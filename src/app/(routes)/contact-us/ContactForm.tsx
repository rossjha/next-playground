'use client'

import Card from '@/components/Card'
import { Button } from '@/components/Button'
import ValidationMessage from '@/components/ValidationMessage'

export default function ContactForm() {
  return (
    <Card className="w-[500px] p-8 shadow-lg">
      <form>
        <h1 className="mb-6 text-2xl text-slate-700">Contact us</h1>

        <div className="mb-6">
          <label htmlFor="full-name" className="mb-1 block text-slate-700">
            Name
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="Full name"
            className="w-full rounded border p-2"
          />
          <ValidationMessage>Enter your full name</ValidationMessage>
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
          />
          <ValidationMessage>Enter your email address</ValidationMessage>
          <ValidationMessage>Not a valid email address</ValidationMessage>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="mb-1 block text-slate-700">
            Message
          </label>
          <textarea className="w-full rounded border p-1" rows={5}></textarea>
          <ValidationMessage>You need to add a message</ValidationMessage>
        </div>

        <div className="flex justify-end pt-6">
          <Button variant="outline" className="mr-3">
            Cancel
          </Button>
          <Button>Send</Button>
        </div>
      </form>
    </Card>
  )
}
