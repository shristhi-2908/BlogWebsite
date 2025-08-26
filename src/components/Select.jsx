import React ,{useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id=useId() 
  return (
    <div className='w-100'>
      {label && <label htmlFor={id} className=''></label>}
      <select {...props} id={id} ref={ref}
      className={`form-control bg-white text-black rounded w-100 border border-secondary transition ${className}`}>
        {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
