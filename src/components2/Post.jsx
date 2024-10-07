// import React from 'react'

import { Link } from "react-router-dom"

const Post = ({post}) => {
  return (
    <div className="post">
      <Link to={`post/${post.id}`}>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p> 
        <p>{(post.body).length <=25 ? 
        post.body : `${(post.body).slice(0,25)}...`
        }</p> 
</Link>
    </div>
  )
}

export default Post
