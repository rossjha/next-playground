import { render, screen } from '@testing-library/react'
import Card from '@/app/components/Card'
import '@testing-library/jest-dom'

describe('Card', () => {
  it('should render a card component', () => {
    const { container } = render(<Card>this is a test</Card>)

    const cardElement = container.firstChild

    expect(cardElement).toHaveClass('Card')
    expect(screen.getByText(/this is a test/i)).toBeInTheDocument()

    //screen.logTestingPlaygroundURL()
  })

  it('should be able to add and override classes', () => {
    const { container } = render(
      <Card className="rounded-xl shadow">this is a test</Card>,
    )

    const cardElement = container.firstChild

    expect(cardElement).toHaveClass('rounded-xl')
    expect(cardElement).not.toHaveClass('rounded')
    expect(cardElement).toHaveClass('shadow')
  })
})
