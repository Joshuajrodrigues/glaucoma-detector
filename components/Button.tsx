import React, { FunctionComponent, ReactNode } from 'react'

const Button:FunctionComponent<{
    children:ReactNode,
    onClick?:React.MouseEventHandler<HTMLButtonElement>
}> = ({children,onClick,...other}) => {
  return (
    <button onClick={onClick}
      className=' border-black border  m-2 
                text-lg p-2 rounded-md'
    >{children}</button>
  )
}

export default Button