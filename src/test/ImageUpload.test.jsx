import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ImageUpload } from '../components/generic/ImageUpload'

describe('<ImageUpload />', () => {
  it('renders the image correctly', () => {
    const imageSrc = 'path/to/image.jpg'
    const { getByAltText } = render(
      <MemoryRouter>
        <ImageUpload imageSrc={imageSrc} />
      </MemoryRouter>
    )
    const imageElement = getByAltText('Captured Image')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement.getAttribute('src')).toBe(imageSrc)
  })

it('handles image load and sets image source', async () => {
    const setImageSrcMock = jest.fn()
    const file = new File([''], 'test.png', { type: 'image/png' })
    const event = {
      target: {
        files: [file],
      },
    }

    render(
      <MemoryRouter>
        <ImageUpload imageSrc="" setImageSrc={setImageSrcMock} valuesImageSrc="" submitCount={0} />
      </MemoryRouter>
    )

    const inputElement = screen.getByLabelText('Choose new image')

    fireEvent.change(inputElement, event)

    await waitFor(() => {
      expect(setImageSrcMock).toHaveBeenCalledTimes(1)
      expect(setImageSrcMock).toHaveBeenCalledWith({
        blob: expect.any(ArrayBuffer),
        base64: expect.any(String),
        file: 'test.png',
      })
    })
  })

  it('displays formik errors correctly', () => {
    const submitCount = 1
    const { getByText } = render(
      <MemoryRouter>
        <ImageUpload submitCount={submitCount} />
      </MemoryRouter>
    )
    const formikErrorElement = getByText('Image is required')
    expect(formikErrorElement).toBeInTheDocument()
  })
})
