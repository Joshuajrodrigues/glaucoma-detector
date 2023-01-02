import React, { FunctionComponent, ReactNode } from 'react'

const Button:FunctionComponent<{
    children:ReactNode
}> = ({children}) => {
  return (
    <button className='p-5 m-5 border rounded border-black'>{children}</button>
  )
}

export default Button