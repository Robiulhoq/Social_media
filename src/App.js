import Login from "./Components/Auth/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AllPost from "./Components/AllPost/AllPost";
import CreatePost from "./Components/CreatePost/CreatePost";
export const LoginContext = createContext()
function App() {
  let currentTime = new Date().toLocaleTimeString();
  const [login, setLogin] = useState({
    name: '',
    email: ''
  });
  const [newPost, setNewPost] = useState({
    title: '',
    driscripton: '',
    hashTage: localStorage.getItem('Hash'),
    imgUrl: '',
    author: '',
    time: currentTime
  });
 console.log(newPost);
  return (
    <LoginContext.Provider value={[login, setLogin, newPost, setNewPost]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute> <AllPost /> </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/newPost" element={<PrivateRoute><CreatePost /></PrivateRoute> } />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>

  );
}

export default App;
