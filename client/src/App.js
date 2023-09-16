import './App.css';


import {Home} from "./pages/Home"


import { Navigate, Route, Routes } from "react-router-dom";
import { MakeTrans } from './pages/MakeTrans';
import { AllTrans } from './pages/AllTrans';
import { AllUsers } from './pages/AllUsers';
import { User } from './pages/User';



function App() {
  return (
    
    <div className="App">
      
      
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="MakeTrans" element={<MakeTrans />} />
        <Route path="AllTrans" element={<AllTrans />}/>
        <Route path="AllUsers" element={<AllUsers />}/>
        <Route path="OneUser" element={<User />}/>
       
      </Routes>
    
     
    </div>
  );
}

export default App;