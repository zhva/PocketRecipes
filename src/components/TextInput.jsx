import React from 'react'

export const TextInput = ({ value, label, name, placeholder, type, onChange }) => {
  return (
    <div className='text-input-container'>
      { label && <label htmlFor="input-field">{label}</label> }
      <input
        type={type}
        value={value}
        name={name}
        className="text-input"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}
