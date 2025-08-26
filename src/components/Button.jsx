import React from 'react'

function Button({
    children,
    type='button',
   variant = 'primary', 
    className='',
    ...props
}) {
  return (
   <button type={type} className={`btn btn-${variant}  ${className}`} {...props}>
    {children}
    </button>
  )
}

export default Button
