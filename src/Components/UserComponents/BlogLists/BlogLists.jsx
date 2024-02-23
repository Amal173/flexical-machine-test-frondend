import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../../../Redux/Slice/blogSlice';
import { useNavigate } from 'react-router-dom';

function BlogLists() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { blogs } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(getBlog());
    }, [dispatch]);

    return (
        <div className="wraper">
            <div className="mainImage">
                {blogs?.blog?.map((blog) => (
                    <div key={blog._id}>
                        <h1>{blog?.title}</h1>
                        <img src={blog.image || 'https://media.istockphoto.com/id/108348088/photo/red-eyed-tree-frog.webp?b=1&s=170667a&w=0&k=20&c=3svnHF-VXcmUgMJEAayrPEd_TynVSqNadqTNEDjdHKY='} alt="" />
                           <br />
                           <button type='button' onClick={()=>navigate('/blog-Details' ,{state:{id:blog._id}})}>view blog</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogLists;