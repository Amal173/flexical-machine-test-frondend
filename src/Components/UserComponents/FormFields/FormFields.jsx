import React, { useState } from 'react'
import { useFormik } from 'formik';
import CardMedia from '@mui/material/CardMedia';
import './FormFields.css'
import { useDispatch } from 'react-redux';
import { CreateBlog } from '../../../Redux/Slice/blogSlice';

function FormFields({ fieldType, setFieldType }) {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            list: []
        },
        onSubmit: values => {
            console.log(values)
            dispatch(CreateBlog(values))
        },
    })


    const handleRemove = (index) => {
        let listArr = [...fieldType];
        listArr.splice(index, 1)
        setFieldType(listArr)
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="form-container">
                {fieldType?.map((list, index) => {
                    return (
                        <div key={index}>
                            {list === "photo" && (
                                <>
                                    <input
                                        name={`list[${index}].image`}
                                        type="text"
                                        placeholder='enter url here'
                                        onChange={(event) => {
                                            formik.handleChange(event)
                                        }}
                                        value={formik.values?.list?.[index]?.image}
                                    />
                                    <img src={formik.values?.list?.[index]?.image} alt="" />
                                    <button type='button' onClick={() => handleRemove(index)}>-</button>
                                </>
                            )}
                            {list === "embed" && (
                                <>
                                    <input
                                        name={`list[${index}].embed`}
                                        type="video"
                                        placeholder='enter url here'
                                        onChange={formik.handleChange}
                                        value={formik.values?.list?.[index]?.embed}
                                    />
                                    <br />
                                    <CardMedia component="iframe" src={formik.values?.list?.[index]?.embed} sx={{
                                        aspectRatio: "16/9", width: 800
                                    }} />
                                    <button type='button' onClick={() => handleRemove(index)}>-</button>
                                </>
                            )
                            }
                            {list === "title" && (
                                <>
                                    <input
                                        name={`list[${index}].title`}
                                        type="text"
                                        placeholder='enter title here'
                                        onChange={formik.handleChange}
                                        value={formik.values?.list?.[index]?.title}
                                        className='input-title'
                                    />
                                    <br />
                                    <button type='button' onClick={() => handleRemove(index)}>-</button>
                                </>
                            )
                            }
                            {list === "text" && (
                                <>
                                    <input
                                        name={`list[${index}].text`}
                                        type="textarea"
                                        placeholder='enter text here'
                                        onChange={formik.handleChange}
                                        value={formik.values?.list?.[index]?.text}
                                        className='input-text'
                                    />
                                    <br />
                                    <button type='button' onClick={() => handleRemove(index)}>-</button>
                                </>
                            )
                            }
                            {list === "code" && (
                                <>
                                    <input
                                        name={`list[${index}].code`}
                                        type="text"
                                        placeholder='enter code here'
                                        onChange={formik.handleChange}
                                        value={formik.values?.list?.[index]?.code}
                                        className='input-code'
                                    />
                                    <br />
                                    <button type='button' onClick={() => handleRemove(index)}>-</button>
                                </>
                            )
                            }
                        </div>
                    );
                })}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FormFields