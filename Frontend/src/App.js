import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import UploadRecipe from "./components/Upload/UploadRecipe";
import Profile from "./components/Profile/Profile";
import Likes from "./components/Pages/Likes";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/Search/SearchBar";
import RecipeInfo from "./components/Cards/RecipeInfo";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/checkourmenu" element={<SearchBar />} />
        <Route path="/uploadrecipe" element={<UploadRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/recipe/:id" element={<RecipeInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
