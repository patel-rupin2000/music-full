import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
 const navigate = useNavigate();
 const location = useLocation();
 

 const { emailPasswordSignup } = useContext(UserContext);
 const [form, setForm] = useState({
   email: "",
   firstName: "",
   lastName: "",
   password: ""
 });
 
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 const [phoneNo, setPhoneNo] = useState('');
 
 
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 

 const onSubmit = async () => {
   try {
     const user = await emailPasswordSignup(form.email, form.password, form.firstName, form.lastName, phoneNo);
     if (user) {
       redirectNow();
     }
   } catch (error) {
     alert(error);
   }
 };
 
 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
   <h1>Signup</h1>
   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
    <TextField
     label="First Name"
     type="text"
     variant="outlined"
     name="firstName"
     value={form.firstName}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
    <TextField
     label="Last Name"
     type="text"
     variant="outlined"
     name="lastName"
     value={form.lastName}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
    <PhoneInput
      label="Phone Number"
      type="text"
      variant="outlined"
      placeholder="Enter phone number"
      country={'in'}
      value={phoneNo}
      onChange={setPhoneNo}
      style={{ marginBottom: "1rem" }}
    />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={form.password}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Signup
   </Button>
   <p>Have an account already? <Link to="/login">Login</Link></p>
 </form>
}
 
export default Signup;