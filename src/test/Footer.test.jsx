import { render, screen } from '@testing-library/react'
import React from 'react'
import { Footer } from '../components/generic/Footer'

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it("renders footer", () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('has correct links', () => {
    const freepikLink = screen.getByText(/Starting page Image by freepik/i).closest('a')
    expect(freepikLink).toHaveAttribute('href', 'https://www.freepik.com/free-vector/recipe-book-concept-illustration_19245712.htm#query=cooking%20recipe&position=19&from_view=keyword&track=ais')

    const storysetLink = screen.getByText(/Sign-in\/Sign-up Image by storyset/i).closest('a')
    expect(storysetLink).toHaveAttribute('href', 'https://www.freepik.com/free-vector/female-chef-concept-illustration_32318741.htm#query=cooking&position=23&from_view=search&track=sph')

    const vecteezyLink = screen.getByText(/Background pattern Image by vecteezy/i).closest('a')
    expect(vecteezyLink).toHaveAttribute('href', 'https://de.vecteezy.com/vektorkunst/2023765-nahtloses-kuchenwerkzeug-muster-in-vektor-handgezeichnetes-modernes-design')
  })
})
