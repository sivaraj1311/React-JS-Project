// import React from "react";
import { useContext } from "react";
import Feed from "./Feed";
import DataContext from "../context/DataContext";

const Home = () => {
  const {searchResults} =useContext(DataContext)
  return (
    <main className="Home">


      
      <p>home area</p>
      {searchResults.length ? (<Feed searchResults={searchResults}/>):
      (<p style={{marginTop:'2rem'}}>No posts to Display</p>)}
    </main>  
  );
};

export default Home;
