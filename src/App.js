import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
 return (
   <BrowserRouter>
     <UserProvider>
       <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Home />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;