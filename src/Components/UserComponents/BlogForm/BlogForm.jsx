import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CodeIcon from '@mui/icons-material/Code';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FormFields from '../FormFields/FormFields';
import TitleIcon from '@mui/icons-material/Title';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Header from '../Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../../firebase";
import { useNavigate } from 'react-router-dom';

function BlogForm() {

  const [user, loading, error] = useAuthState(auth);
  const [fieldType, setFieldType] = useState([]);
  const navigate = useNavigate()
   
  const handleButtonClick = (fieldName) => {

    setFieldType(prevFieldType => [...prevFieldType, fieldName]);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/user-login");
  }, [user, loading]);

  const actions = [
    { icon: <AddPhotoAlternateIcon />, name: 'photo' },
    { icon: <CodeIcon />, name: 'embed' },
    { icon: <DataObjectIcon />, name: 'code' },
    { icon: <TitleIcon />, name: 'title' },
    { icon: <EditNoteIcon />, name: 'text' },
  ]

  return (
    <>
    <Header/>
    <FormFields fieldType={fieldType} setFieldType={setFieldType}/>
      <Box sx={{ height: 320, transform: 'translate(0px)', flexGrow: 1, width: 1000, margin: "auto" }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', top: 30, left: 30 }}
          icon={<SpeedDialIcon />}
          direction='right'
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              name={action.name}
              onClick={(e) => handleButtonClick(action.name)}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  )
}

export default BlogForm