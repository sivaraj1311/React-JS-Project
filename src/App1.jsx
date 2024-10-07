import Home from "./components2/Home";
import About from "./components2/About";
import Footer from "./components2/Footer";
// import PostPage from "./components2/PostPage"
import Missing from "./components2/Missing";
import Nav from "./components2/Nav";
import Header from "./components2/Header";
import NewPost from "./components2/NewPost";
import { Route, Routes} from "react-router-dom";
import PostPage from "./components2/PostPage";
// import { id } from "date-fns/locale/id";
// import { Navigate } from 'react-router-dom'
import EditPost from "./components2/EditPost";
import { DataProvider } from "./context/DataContext";

const App1 = () => {
  
  return (
    <>
    <DataProvider>
      <Header title="New Application" />
      <Nav />
      <Routes>
        <Route path="/" element={<Home  />} />

        <Route index
          path="/post" 
          element={
            <NewPost />}/>
          <Route path="/edit/:id" element={<EditPost />}/>
        <Route path="/post/:id" element={<PostPage  /> }/>  
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
      </DataProvider>
    </>
  );
};

export default App1;
