import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
 
export default function Home() {
 const { logOutUser } = useContext(UserContext);
 

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
     <Button variant="contained" onClick={logOut}>Logout</Button>
   </>
 )
}