import React, { FunctionComponent, ReactNode } from 'react'

const Button:FunctionComponent<{
    children:ReactNode,
    onClick?:React.MouseEventHandler<HTMLButtonElement>
}> = ({children,onClick,...other}) => {
  return (
    <button onClick={onClick} className=' border-black border text-sm rounded-sm m-2 p-1 '>{children}</button>
  )
}

export default Button