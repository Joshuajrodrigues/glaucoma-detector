import React, { FunctionComponent, ReactNode } from 'react'

const Button:FunctionComponent<{
    children:ReactNode,
    onClick?:React.MouseEventHandler<HTMLButtonElement>
}> = ({children,onClick,...other}) => {
  return (
    <button onClick={onClick} className='p-5 m-5 border rounded border-black'>{children}</button>
  )
}

export default Button