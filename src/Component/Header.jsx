import React from 'react'
function Header({title,cName}) {
  return (
    <div className={cName}>{title}</div>
  )
}

export default Header