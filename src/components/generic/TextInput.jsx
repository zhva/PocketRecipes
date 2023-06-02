import React from 'react'

export const TextInput = ({ value, label, name, placeholder, type, onChange, errors, id }) => {
  return (
    <div className='text-input-container'>
      { label && <label htmlFor={id}>{label}</label> }
      <input
        type={type}
        value={value}
        name={name}
        className="text-input"
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
      <span className='formik-errors'>
        {errors && errors}
      </span>
    </div>
  )
}
