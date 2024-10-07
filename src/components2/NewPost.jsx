import React, { useContext } from "react";
import DataContext from "../context/DataContext";

const NewPost = () => {
  const {
    handleSubmit1,
    createBody,
    setCreateBody,
    createTitle,
    setCreateTitle,
  } = useContext(DataContext);
  return (
    <>
      <h2>New Post Page</h2>
      <form onSubmit={handleSubmit1}>
        <label htmlFor="title">Post Title</label>
        <input
          required
          type="text"
          placeholder="Post Title"
          id="post title"
          value={createTitle}
          onChange={(e) => {
            setCreateTitle(e.target.value);
          }}
        />
        <label htmlFor="">Post Body</label>
        <input
          required
          type="text"
          placeholder="Post Body"
          id="postbody"
          value={createBody}
          onChange={(e) => {
            setCreateBody(e.target.value);
          }}
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
};

export default NewPost;
