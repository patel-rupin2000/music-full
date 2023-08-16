import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import FileUpload from '../components/uploadMusic';
import './HomePage.css'
import MusicCard from '../components/MusicCard';

export default function Home() {
 const { logOutUser } = useContext(UserContext);
 const { user } = useContext(UserContext);
 const [disabled, setDisabled] = useState(false);
 let uuid = user.id;
 console.log(user.profile)
 useEffect(() => {
  const handleCheck = async () => {
    if (!uuid) return;
    const response = await fetch(`/api/check/${uuid}`);
    setDisabled(response.ok);
    console.log(response.ok);
  };
  handleCheck();
}, [uuid]);


 const logOut = async () => {
   try {
     const loggedOut = await logOutUser();

     if (loggedOut) {
       window.location.reload(true);
     }
   } catch (error) {
     alert(error)
   }
 }

 
 return (
   <>
     <h1>Welcome to Musicix </h1>
     <fieldset disabled={disabled} className={disabled ? 'blur' : ''}>
     <FileUpload />
     </fieldset>
     {disabled && <p className="message">You have already Consume Space of one file in Database in order to use app You to download and delete that recent file</p>}
     
     <fieldset disabled={!disabled} className={!disabled ? 'blur' : ''}>
     {!disabled && <p className="message">You have no File in database upload music files to overlay them</p>}
     <MusicCard />
     </fieldset>

     <Button variant="contained" onClick={logOut}>Logout</Button>
   </>
 )
}