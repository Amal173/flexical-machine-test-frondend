import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Header from "../Header/Header";
import BlogList from "../BlogLists/BlogLists";
import Footer from "../Footer/Footer";

function Dashboard() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("")
  const navigate = useNavigate()


  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
     
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/user-login")
    fetchUserName()
  }, [user, loading])

  return (
    <div className="dashboard">
        <Header/>
       <div className="dashboard__container">
        <BlogList/>
       </div>
       <Footer/>
     </div>
  )
}
export default Dashboard