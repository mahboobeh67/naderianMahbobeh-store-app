import React from 'react'

function AddProduct({ setOpenModal}) {
  return (
    <div>


      <button onClick={(() => setOpenModal(true))}>add</button>
    </div>
  )
}

export default AddProduct