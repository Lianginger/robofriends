import React from 'react'

function Scroll({ children }) {
  return (
    <div
      style={{
        overflowY: 'scroll',
        borderTop: '5px solid black',
        height: '80vh',
      }}
    >
      {children}
    </div>
  )
}

export default Scroll
