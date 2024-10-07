import React  from "react";
import ListItems from "./ListItems";
const Body = ({items,handleCheck,handleDelete}) => {
 
  
  return (
    <>
      {(items.length)? (
       <ListItems items={items} handleCheck={handleCheck} handleDelete={handleDelete}/> 
      ) : <p>the list is empty</p>}
    </>
  );
};

export default Body;
