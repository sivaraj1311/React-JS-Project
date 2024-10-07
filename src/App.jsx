import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [addItems, setAddItems] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading,setIsLoading] =useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not Received");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }finally{
        setIsLoading(false)
      }

      
    };
    setTimeout(() => {
      (async () => fetchItems())();
    }, 2000);
    
  }, []);

  const addItem =async (item) => {
    const id = items.length ? (parseInt(items[items.length - 1].id) + 1).toString() : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    // after useEffect for data loading
    // localStorage.setItem("todo_list", JSON.stringify(listItems));
   const postOptions =  {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }
    const result=await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
  };

  const handleCheck =async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
  const myItem=listItems.filter(item=>item.id===id)
  const updateOptions={
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({checked:myItem[0].checked})
  }
  const reqUrl=`${API_URL}/${id}`
  const result=await apiRequest(reqUrl,updateOptions)
  if(result) setFetchError(result)
  };


  const handleDelete =async (id) => {
    const deleteItems = items.filter((item) => item.id !== id);
    setItems(deleteItems);
    // localStorage.setItem("todo_list", JSON.stringify(deleteItems));
    const deleteOptions= {
      method:'DELETE'
    }
    const reqUrl=`${API_URL}/${id}`
  const result=await apiRequest(reqUrl,deleteOptions)
  if(result) setFetchError(result)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    // add
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="sivaraj" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Data Loading ...</p>}
        {fetchError && <p> {`Error : ${fetchError}`} </p>}
        {!isLoading && !fetchError && <Body
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        
        />}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
