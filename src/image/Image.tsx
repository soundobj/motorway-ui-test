import React from 'react'
import classnames from "classnames"

import "./Image.scss"

interface Props {
  src: string
  className?: string
}

const Image = (props: Props) => {
  const { src, className } = props
  return (
    <img src={src} alt="" className={classnames("image", className)}/>
  )
}

export default Image
