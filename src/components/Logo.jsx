import React from 'react'
import logoImage from '../assets/logo.png'

function Logo({ width = '80px', height = 'auto', alt = 'Logo', className = '' }) {
  return (
    <img
      src={logoImage}
      alt={alt}
      style={{
        width,
        height,
        backgroundColor: 'transparent', // optional, safe to include
      }}
      className={className}
    />
  )
}

export default Logo