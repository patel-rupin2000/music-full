import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/constants";


const app = new App(APP_ID);
 

export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 const emailPasswordLogin = async (email, password) => {
   const credentials = Credentials.emailPassword(email, password);
   const authenticatedUser = await app.logIn(credentials);
   setUser(authenticatedUser);
   console.log(authenticatedUser.id);
   return authenticatedUser;
 };
 

 const emailPasswordSignup = async (_email, password, _firstName, _lastName, _phoneNo) => {
   try {
    await app.emailPasswordAuth.registerUser(_email, password);
    const credentials = Credentials.emailPassword(_email, password);
    const authenticatedUser = await app.logIn(credentials);
    setUser(authenticatedUser);
    const userData = {
      _id: authenticatedUser.id, 
      email: _email,
      firstName: _firstName,
      lastName: _lastName,
      phoneNo: _phoneNo
    };
    console.log(userData);

    fetch('/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.text)
    .then(data => console.log(data))
    .catch(error => console.error(error));

    return authenticatedUser;
   } catch (error) {
     throw error;
   }
 };
 

 const fetchUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.refreshCustomData();
     setUser(app.currentUser);
     return app.currentUser;
   } catch (error) {
     throw error;
   }
 }
 
 const logOutUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.logOut();
     setUser(null);
     return true;
   } catch (error) {
     throw error
   }
 }
 
 return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser }}>
   {children}
 </UserContext.Provider>;
}