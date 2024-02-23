import React, { useEffect } from 'react'
import './BlogDetails.css'
import { Card } from 'antd'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from 'react-redux'
import { getOneBlog } from '../../../Redux/Slice/blogSlice'

function BlogDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, loading, error] = useAuthState(auth);
    const {singleBlog}=useSelector((state)=>state.blog)
    const loaction = useLocation()
    console.log(singleBlog?.blog?.list);

    const id = loaction.state.id
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/user-login")
    }, [user, loading])

    useEffect(() => {
        dispatch(getOneBlog(id))
    }, [dispatch, id])

    return (
        <div>
            <Header />
            <Card title="Card title">
                <div className='row'>
                    {singleBlog?.blog?.list?.map((data,index)=>(
                        <div key={index}>
                            <p>{data.title}njevjbhsvdjhsdvjas vlnad v</p>
                        </div>
                    ))}
                    <div>
                        <h1>title</h1>
                        <p>sbdvlhbvdlijb ljskvdbljdvbk;ajebvjlaewbvdcjlbdvlveab vlhgwe</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1617635277889-df22350f81a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww" alt="" />
                </div>
            </Card>
            <Footer />
        </div>
    )
}

export default BlogDetails