import { createContext,useState,useEffect } from "react"; 
import { format } from "date-fns";
import api from "../Api/posts"
import { useNavigate } from "react-router-dom";
// import { useState,useEffect } from 'react-router-dom'

const DataContext = createContext({})

export const DataProvider=({children}) =>{

    const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [createBody, setCreateBody] = useState("");
  const [createTitle, setCreateTitle] = useState("");
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const navi=useNavigate()

  useEffect(()=>{
    const fetchPosts=async ()=>{ 
      try {
        const response= await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error : ${err.message}`)
        }
      }
    } 
    fetchPosts();
  }, [] )

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit1 =async (e) => {
    e.preventDefault();
    const id = posts.length ? (parseInt(posts[posts.length - 1].id) + 1).toString() : 1;
    // const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // const datetime= format(new Date(),'dd ,mm ,yyyy')
    // const date=format(datetime())
    const datetime = format(new Date(), "dd-MM-yyyy ,pp");
    const newPost = { id, title: createTitle, datetime, body: createBody };
    try{
    const response=await api.post('/posts',newPost)
    const AllPosts = [...posts, response.data];
    setPosts(AllPosts);
    setCreateTitle("");
    setCreateBody("");
    navi('/')
  }catch(err){
    console.log(`Error :${err.message}`)
  }
  };

    const handleDelete1 = async (id)=>{
      try{
        await api.delete(`/posts/${id}`)
      const postlist=posts.filter(post=>post.id !==id)
      setPosts(postlist)
      navi('/')
      }catch(err){
        console.log(`Error :${err.message}`)
      }
    }
    const handleEdit =async (id)=>{
      // const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), "dd-MM-yyyy ,pp");
      const updatedPost = { id, title: editTitle, datetime, 
        body: editBody };
      try{
        const response=await api.put(`/posts/${id}`,updatedPost)
        setPosts(posts.map(post=>post.id===id? {...response.data} : post));
        setEditTitle('')
        setEditBody('')

        navi('/') 
      }catch(err){
        console.log(`Error :${err.message}`)
      }
    }

    return(
    <DataContext.Provider value={{
        search,setSearch,handleSubmit1,createBody,setCreateBody,
        createTitle,setCreateTitle,posts,editTitle,setEditTitle,
            editBody,setEditBody,handleEdit,handleDelete1,searchResults
    }}>
{children}
        
    </DataContext.Provider>
    )
}
 export default DataContext