import React from 'react'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ImageUpload } from '../components/generic/ImageUpload'
import imageCompression from 'browser-image-compression'

jest.setTimeout(30000)  // Set timeout to 30 seconds

jest.mock('browser-image-compression', () => ({
  imageCompression: jest.fn((file) => Promise.resolve(file))
}))

describe('<ImageUpload />', () => {
  beforeEach(() => {
    function MockFileReader() {
        this.onload = null;
        this.onerror = null;
    }

    MockFileReader.prototype.readAsDataURL = function () {
      this.result = 'data:image/png;base64,base64image';
      setImmediate(() => this.onload());
    }


    MockFileReader.prototype.readAsArrayBuffer = function () {
        this.result = new ArrayBuffer();
        setImmediate(() => this.onload());
    }
    global.FileReader = MockFileReader;
})



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


  jest.mock('browser-image-compression', () => ({
    imageCompression: jest.fn(() => Promise.resolve(new Blob()))
  }))


  afterEach(() => {
    jest.resetAllMocks()
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
