import { render, screen } from '@testing-library/react'
import { Button } from '@/app/components/Button'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('should render a button component', () => {
    const { container } = render(<Button>Click me!</Button>)

    expect(screen.getByText(/Click me!/i)).toBeInTheDocument()

    // screen.logTestingPlaygroundURL()
  })

  it('should be able to set a variant', () => {
    const { container } = render(<Button variant="outline">Click me!</Button>)

    const buttonElement = container.firstChild

    expect(buttonElement).toHaveClass('bg-transparent')
    expect(buttonElement).toHaveClass('border')
    expect(buttonElement).not.toHaveClass('bg-slate-900')
  })

  it('should be able to set a size', () => {
    const { container } = render(<Button size="lg">Click me!</Button>)

    const buttonElement = container.firstChild

    expect(buttonElement).toHaveClass('h-11')
    expect(buttonElement).toHaveClass('px-8')
    expect(buttonElement).not.toHaveClass('h-10')
  })

  it('should be able to add and override classes', () => {
    const { container } = render(
      <Button className="rounded-xl shadow">Click me!</Button>,
    )

    const cardElement = container.firstChild

    expect(cardElement).toHaveClass('rounded-xl')
    expect(cardElement).not.toHaveClass('rounded-md')
    expect(cardElement).toHaveClass('shadow')
  })
})
