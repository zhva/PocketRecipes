import React from 'react'
import { BackLink } from './BackLink'
import { NewImgButton } from './NewImgButton'
import imageCompression from 'browser-image-compression'

export const ImageUpload = ({ imageSrc, setImageSrc, valuesImageSrc, submitCount }) => {
  const isSubmitted = submitCount > 0
  const handleLoadImage = async (event) => {
    const file = event.target.files[0]
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }

    try {
      const compressedFile = await imageCompression(file, options);

      const b64Reader = new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve({ image: reader.result, fileName: compressedFile.name })
        }
        reader.readAsDataURL(compressedFile)
      })

      const blobReader = new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve({ image: reader.result, fileName: compressedFile.name })
        }
        reader.readAsArrayBuffer(compressedFile)
      })

      Promise.all([b64Reader, blobReader]).then(([base64, blob]) => {
        setImageSrc({ blob: blob.image, base64: base64.image, file: base64.fileName })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='upload-image-container'>
      <div className='image-container'>
        {imageSrc && <img src={imageSrc} alt='Captured Image' />}
      </div>
      <BackLink className='back-btn' />
      <div className='button-upload-container'>
        <NewImgButton handleChange={handleLoadImage}></NewImgButton>
        {isSubmitted && !imageSrc && !valuesImageSrc && <div className='formik-errors'>Image is required</div>}
      </div>
    </div>
  )
}
