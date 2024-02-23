
import './App.css';
import BlogForm from './Components/UserComponents/BlogForm/BlogForm';
import Dashbord from './Components/UserComponents/Dashbord/Dashbord';
import Header from './Components/UserComponents/Header/Header';
import { Routes, Route } from "react-router-dom"
import UserLogin from './Components/UserComponents/UserLogin/UserLogin';
import UserRegister from './Components/UserComponents/UserRegister/UserRegister';
import UserReset from './Components/UserComponents/UserReset/UserReset';
import BlogDetails from './Components/UserComponents/BlogDetails/BlogDetails';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/create-form" element={<BlogForm />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-reset" element={<UserReset />} />
        <Route path="/blog-Details" element={<BlogDetails />} />
      </Routes>
    </div>
  );
}

export default App;
