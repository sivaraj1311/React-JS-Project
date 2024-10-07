import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from '../context/DataContext'

const EditPost = () => {
        const {posts,editTitle,setEditTitle,
            editBody,setEditBody,handleEdit}=useContext(DataContext)
        const{id} =useParams()
        const post=posts.find(post=>(post.id).toString()===id)
        useEffect(()=>{
            if(post){
                setEditTitle(post.title)
                setEditBody(post.body)
                console.log(post.title)
                console.log(post.body)
            }

        },[post,setEditTitle,setEditBody])

 return(   
<main>
 {
    editTitle && <>
    <h2>Edit Post</h2>
    <form>
        <label htmlFor='post title'>Title :</label>
        <input 
            type='text'
            id='edittitle'
            required
            value={editTitle}
            onChange={(e)=>setEditTitle(e.target.value)}
        />
        <label 
            htmlFor='edit Body'
        >Edit Body :</label>
        <input 
            required
            type='text'
            id='editbody'
            value={editBody}
            onChange={(e)=>setEditBody(e.target.value)}
        />
        <button type='button' 
        onClick={()=>(handleEdit(post.id))}>Submit</button>
    </form>
    
    </>
 }
 {!editTitle && 
 <>
 <h2>Sorry ...no chance to Edit this Post</h2>
 <p><Link to={'/'}
 Visit Our Home Page /></p>
 </>}
</main>
  )
}

export default EditPost