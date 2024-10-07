import React, { useRef } from 'react'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
const inputRef=useRef()

  return (
    <>
    <form action='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">AddItem</label>
        <input 
            required
            id='addItem'
            ref={inputRef}
            autoFocus
            placeholder='Add Item'
            type='text'
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}

        />
        <button type='submit' onClick={()=>inputRef.current.focus()} aria-label='Add Item'>Submit</button>

    </form>
    </>
  )
}

export default AddItem