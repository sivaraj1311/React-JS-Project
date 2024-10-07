import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";

const PostPage = () => {
  const {posts,handleDelete1}=useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="postpage">
      <article>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button type="button">
              Edit Post</button></Link>
            <button 
              onClick={() => {
                handleDelete1(post.id);
              }}
            >
              Delete Post
            </button>
          </>
       }
        {!post &&
        <>
        <h1>page is not found</h1>
        <p><Link to='/' >visit our Homepage</Link></p>
        </>
        }
      </article>
    </main>
  );
};

export default PostPage;
