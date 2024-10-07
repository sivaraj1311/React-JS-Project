import React from 'react'

const LineItems = ({item,handleCheck, handleDelete }) => {
  return (
    <>
  
    <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheck(item.id)}
            />

            <label
              onDoubleClick={() => {
                handleCheck(item.id);
              }}
              style={item.checked ? { textDecoration: "line-through" } : null}
            >
              {item.item}
            </label>
            <button
              role="button"
              onClick={() => {
                handleDelete(item.id);  
              }}
              aria-label={`delete ${item.item}`}
            >
              Delete
            </button>
          </li>
    </>
  )
}

export default LineItems