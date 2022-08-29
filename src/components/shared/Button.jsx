import React from 'react'

function Button({children}) {
  return (
    <button className='btn btn-primary'>{children}</button>
  )
}

export default Button