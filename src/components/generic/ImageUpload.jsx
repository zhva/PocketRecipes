import React from 'react'
import { BackLink } from './BackLink'
import { NewImgButton } from './NewImgButton'

export const ImageUpload = ({ imageSrc, setImageSrc, valuesImageSrc, submitCount }) => {
  const isSubmitted = submitCount > 0
  const handleLoadImage = (event) => {
    const file = event.target.files[0]

    const b64Reader = new Promise((resolve) => {
      const blobReader = new FileReader()
      blobReader.onload = () => {
        resolve({ image: blobReader.result, fileName: file.name })
      }
      blobReader.readAsDataURL(file)
    })
    const blobReader = new Promise((resolve) => {
      const blobReader = new FileReader()
      blobReader.onload = () => {
        resolve({ image: blobReader.result, fileName: file.name })
      }
      blobReader.readAsArrayBuffer(file)
    })

    Promise.all([b64Reader, blobReader]).then(([base64, blob]) => {
      setImageSrc({ blob: blob.image, base64: base64.image, file: base64.fileName })
    })
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
